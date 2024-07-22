import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { curr_context } from '../../contexts/Central';
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const SidebarButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const ModalBackground = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ChoiceButton = styled.button`
  padding: 12px 24px;
  margin: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const ButtonWithModal = ({ theme,handleSend }) => {
  const [showModal, setShowModal] = useState(false);
  const [dbType, setDbType] = useState('');
  const { setTables, setMySQL, setSqlObj, setMongodbObj } = useContext(curr_context);
  const [formData, setFormData] = useState({
    mongodbUrl: '',
    mongodbDatabaseName: '',
    mysqlHost: '',
    mysqlUser: '',
    mysqlPassword: '',
    mysqlDatabase: '',
  });

  const [mongourl, setMongoUrl] = useState('');
  const [mongoDB, setDbName] = useState('');
  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [sqlDB, setsqlDB] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDbType('');
    setFormData({
      mongodbUrl: '',
      mongodbDatabaseName: '',
      mysqlHost: '',
      mysqlUser: '',
      mysqlPassword: '',
      mysqlDatabase: '',
    });
  };

  const handleChoice = (type) => {
    setDbType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dbType === 'MongoDB') {
      handleMongoSubmit(formData);
    } else {
      handleMySQLSubmit(formData);
    }
    handleCloseModal();
    handleSend('Connection successful. Please select the collections from the sidebar to have ask queries.',false)
    console.log(`Connection string details for ${dbType}:`, formData);
    // Add logic to use the connection details as needed
  };

  const handleMongoSubmit = async (formData) => {
    setMongoUrl(formData.mongodbUrl);
    setDbName(formData.mongodbDatabaseName);
    setMongodbObj({
      url: formData.mongodbUrl,
      database: formData.mongodbDatabaseName,
    });
    try {
      const response = await fetch('http://127.0.0.1:5000/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mongo_url: formData.mongodbUrl,
          db_name: formData.mongodbDatabaseName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTables(data.collections || []);
        // setCollections(data.collections || []); // Ensure collections is always an array
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMySQLSubmit = async (formData) => {
    // const mysqlConfig = { host, user, password };
    // setMysqlConfig(mysqlConfig);
    // setOpen(false);
    setSqlObj({
      host:formData.mysqlHost,
      user:formData.mysqlUser,
      password:formData.mysqlPassword,
      database:formData.mysqlDatabase,
    })
    try {
      const response = await fetch('http://127.0.0.1:5000/mysql/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          host:formData.mysqlHost,
          user:formData.mysqlUser,
          password:formData.mysqlPassword,
          database:formData.mysqlDatabase,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTables(data.tables || []);
        // setCollections(data.tables || []); // Ensure tables is always an array
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <CenteredContainer style={{ backgroundColor: theme.sidebarBackground, height: '7rem' }}>
      <SidebarButton
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}
        onClick={handleOpenModal}
      >
        <FaPlus /> Add Connection URL
      </SidebarButton>
      <ModalBackground show={showModal} onClick={handleCloseModal}>
        <ModalContent
          style={{ backgroundColor: theme.sidebarBackground }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <h2>Select Database Type</h2>
          <ChoiceButton
            onClick={() => {
              handleChoice('MongoDB');
              setMySQL(false);
            }}
          >
            MongoDB
          </ChoiceButton>
          <ChoiceButton
            onClick={() => {
              handleChoice('MySQL');
              setMySQL(true);
            }}
          >
            MySQL
          </ChoiceButton>
          {dbType && (
            <>
              <h3>Enter {dbType} Connection Details</h3>
              <form onSubmit={handleSubmit}>
                {dbType === 'MongoDB' ? (
                  <>
                    <Input
                      type="text"
                      style={{ color: 'black' }}
                      name="mongodbUrl"
                      value={formData.mongodbUrl}
                      onChange={handleInputChange}
                      placeholder="MongoDB URL"
                      required
                    />
                    <Input
                      type="text"
                      style={{ color: 'black' }}
                      name="mongodbDatabaseName"
                      value={formData.mongodbDatabaseName}
                      onChange={handleInputChange}
                      placeholder="MongoDB Database Name"
                      required
                    />
                  </>
                ) : (
                  <>
                    <Input
                      type="text"
                      name="mysqlHost"
                      style={{ color: 'black' }}
                      value={formData.mysqlHost}
                      onChange={handleInputChange}
                      placeholder="MySQL Host"
                      required
                    />
                    <Input
                      type="text"
                      name="mysqlUser"
                      style={{ color: 'black' }}
                      value={formData.mysqlUser}
                      onChange={handleInputChange}
                      placeholder="MySQL User"
                      required
                    />
                    <Input
                      type="password"
                      name="mysqlPassword"
                      style={{ color: 'black' }}
                      value={formData.mysqlPassword}
                      onChange={handleInputChange}
                      placeholder="MySQL Password"
                      required
                    />
                    <Input
                      type="text"
                      name="mysqlDatabase"
                      style={{ color: 'black' }}
                      value={formData.mysqlDatabase}
                      onChange={handleInputChange}
                      placeholder="MySQL Database"
                      required
                    />
                  </>
                )}
                <SubmitButton type="submit">Submit</SubmitButton>
              </form>
            </>
          )}
        </ModalContent>
      </ModalBackground>
    </CenteredContainer>
  );
};

export default ButtonWithModal;
