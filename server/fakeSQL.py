import mysql.connector
from faker import Faker

# Initialize Faker
fake = Faker()

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Priyang1310"
)

cursor = db.cursor()

# Create a new database
cursor.execute("CREATE DATABASE IF NOT EXISTS fake_data_db")
cursor.execute("USE fake_data_db")

# Create tables
tables = ["table1", "table2", "table3", "table4", "table5"]
for table in tables:
    cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS {table} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(20)
    )
    """)

# Insert fake data into each table
for table in tables:
    for _ in range(250):
        cursor.execute(f"""
        INSERT INTO {table} (name, address, email, phone) VALUES (
            '{fake.name()}', '{fake.address().replace("'", "''")}', '{fake.email()}', '{fake.phone_number()}'
        )
        """)

db.commit()
cursor.close()
db.close()
