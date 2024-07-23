import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
import pandas as pd
import mysql.connector
from dotenv import load_dotenv
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from langchain_google_genai import GoogleGenerativeAI

load_dotenv()

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Initialize the LLMs
llm = GoogleGenerativeAI(
    model="gemini-pro",
    google_api_key="AIzaSyCzKUiWSgDZe0Z7tSlrz0GglA-kJ6lLY4Y",
    max_tokens=-1,
)
llm2 = GoogleGenerativeAI(
    model="gemini-pro",
    google_api_key="AIzaSyAsHIdK_eM20vP64imVQZ8ivTZ_1EnuDXA",
    max_tokens=-1,
)

# Global variable for DataFrames and Agents
# dataframes = None
agents = None
my_agent = {}


@app.route("/connect", methods=["POST"])
def connect_and_fetch():
    global dataframes, agents
    try:
        mongo_url = request.json.get("mongo_url")
        db_name = request.json.get("db_name")
        collection_name = request.json.get("collection_name")

        if not mongo_url or not db_name or not collection_name:
            return (
                jsonify(
                    {
                        "error": "Mongo URL, database name, and collection name are required"
                    }
                ),
                400,
            )

        # Establish MongoDB connection
        client = pymongo.MongoClient(mongo_url)
        db = client[db_name]

        # Fetch specified collection and convert to DataFrame
        collection = db[collection_name]
        data = list(collection.find())
        df = pd.DataFrame(data)
        # dataframes[collection_name] = df

        # Initialize an agent for the specific DataFrame
        agents = create_pandas_dataframe_agent(
            llm,
            df,
            allow_dangerous_code=True,
            verbose=True,
            # handle_parsing_errors=True
        )

        return jsonify({"message": "Connection successful and data fetched"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/collections", methods=["POST"])
def get_collections():
    try:
        mongo_url = request.json.get("mongo_url")
        db_name = request.json.get("db_name")

        if not mongo_url or not db_name:
            return jsonify({"error": "Mongo URL and database name are required"}), 400

        # Establish MongoDB connection
        client = pymongo.MongoClient(mongo_url)
        db = client[db_name]

        # Fetch collection names
        collections = db.list_collection_names()

        return jsonify({"collections": collections}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/ask", methods=["POST"])
def ask_endpoint():
    global agents
    try:
        query = request.json.get("query")

        if not query:
            return jsonify({"error": "Query is required"}), 400

        # Process the query with the agent
        ans = agents.invoke(
            query + " return all the data without truncation or summarization"
        )["output"]

        print(ans)

        # Use llm2 to generate a grammatically correct and concise answer
        expanded_ans = llm2.invoke(
            f"Based on the query '{query}', here is the answer: '{ans}'. Please rephrase this answer in a complete, grammatically correct sentence without adding extra information."
        )

        return jsonify({"response": expanded_ans})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/mysql/tables", methods=["POST"])
def mysql_tables():
    data = request.json
    host = data.get("host")
    user = data.get("user")
    password = data.get("password")
    database = data.get("database")

    try:
        connection = mysql.connector.connect(
            host=host, user=user, password=password, database=database
        )
        cursor = connection.cursor()
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        cursor.close()
        connection.close()

        return jsonify({"tables": [table[0] for table in tables]})
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


@app.route("/mysql/connect", methods=["POST"])
def connect_mysql():
    global mysql_connections
    try:
        host = request.json.get("host")
        user = request.json.get("user")
        password = request.json.get("password")
        database = request.json.get("database")
        table = request.json.get("collection_name")

        if not host or not user or not database or not table:
            return (
                jsonify(
                    {
                        "error": "Host, user, password, database name, and table name are required"
                    }
                ),
                400,
            )

        connection = mysql.connector.connect(
            host=host, user=user, password=password, database=database
        )
        query = f"SELECT * FROM {table}"
        df = pd.read_sql(query, connection)

        my_agent[table] = create_pandas_dataframe_agent(
            llm, df, allow_dangerous_code=True, verbose=True
        )

        # print(agents)
        if my_agent[table] is None:
            return jsonify({"error": "Failed to create the agent for the table."}), 500

        # Print agent for debugging
        print("Agent created:", my_agent[table])

        return jsonify({"message": "Connected to MySQL table successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/aski", methods=["POST"])
def mysql_ask():
    global agents
    try:
        query = request.json.get("query")
        table = request.json.get("table")  # Ensure table name is sent in the request

        if not query or not table:
            return jsonify({"error": "Query and table name are required"}), 400

        # Ensure that the table exists in agents
        if table not in my_agent:
            return (
                jsonify(
                    {
                        "error": f"Agent for table {table} is not initialized. Please connect first."
                    }
                ),
                400,
            )
        agent = my_agent[table]
        if agent is None:
            return jsonify({"error": "Agent is not initialized properly"}), 500

        # Process the query with the agent
        try:
            response = agent.invoke(query)
            ans = response.get("output", "")
            # print('*')
            # print(ans)
            # print('*')
        except Exception as e:
            return jsonify({"error": f"Error invoking agent: {str(e)}"}), 500

        try:
            expanded_ans = llm2.invoke(
                f"Based on the query '{query}', here is the answer: '{ans}'. Please rephrase this answer in a complete, grammatically correct sentence without adding extra information."
            )
        except Exception as e:
            return jsonify({"error": f"Error invoking llm2: {str(e)}"}), 500

        return jsonify({"response": expanded_ans})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)