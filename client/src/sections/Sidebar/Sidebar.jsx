import React, { useContext, useState } from 'react';
import { FaHome, FaCommentDots, FaCog } from 'react-icons/fa';
import ToggleButton from '../ToggleButton/ToggleButton';
import './Sidebar.css';
import ButtonWithModal from './StyledButton';
import { curr_context } from '../../contexts/Central';
import UserProfileModal from '../ChatHeader/UserProfile';

const Sidebar = ({ theme, setIsDarkTheme, isDarkTheme,handleSend }) => {
  const { tables, setSelectedCollection, isMySQL, sqlObj, mongodbObj,setBeforeCall } = useContext(curr_context);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const [Toggle, setToggle] = useState(false);

  const closeModal = () => {
    setToggle(false);
  };

  const openModal = () => {
    console.log('hi');
    setToggle(true);
  };

  const handleDropdownItemClick = async (table) => {
    // setSelectedCollection(table);
    setIsDropdownVisible(false);
    setSelectedCollection(table);
    // setColl(table);
    // print(table)

    // const url = isMySQL ? 'http://127.0.0.1:5000/mysql/connect' : 'http://127.0.0.1:5000/connect';
    const url = isMySQL ? 'https://chat-with-database-api.vercel.app/mysql/connect' : 'https://chat-with-database-api.vercel.app/connect';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sqlObj,
          mongo_url: mongodbObj.url,
          db_name: mongodbObj.database,
          collection_name: table,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        handleSend('You can now chat with your database.',false);
        setBeforeCall(true);
        console.log('Connection successful and data fetched', data);
      } else {
        const errorData = await response.json();
        handleSend(errorData.response,false);
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.sidebarBackground,
      }}
    >
      <div className="sidebar">
        <ToggleButton onClick={() => setIsDarkTheme((prev) => !prev)} />
        <div className="sidebar-item" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
          <FaHome className="sidebar-icon" />
          Collections
        </div>
        {isDropdownVisible && (
          <div className="dropdown" style={{ background: theme.userMessageBackground }}>
            {tables.map((table, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleDropdownItemClick(table)}
              >
                {table}
              </div>
            ))}
          </div>
        )}
        <div className="sidebar-item">
          <FaCommentDots className="sidebar-icon" />
          Chat
        </div>
        <div className="sidebar-item" onClick={openModal}>
          <FaCog className="sidebar-icon" />
          Settings
        </div>
      </div>
      <ButtonWithModal theme={theme} isDarkTheme={isDarkTheme} handleSend={handleSend}/>
      {Toggle && <UserProfileModal isOpen={Toggle} onClose={closeModal} />}
    </div>
  );
};

export default Sidebar;
