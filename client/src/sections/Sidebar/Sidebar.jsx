import React, { useContext, useState } from 'react';
import { FaHome, FaCommentDots, FaCog } from 'react-icons/fa';
import ToggleButton from '../ToggleButton/ToggleButton';
import './Sidebar.css';
import ButtonWithModal from './StyledButton';
import { curr_context } from '../../contexts/Central';

const Sidebar = ({ theme, setIsDarkTheme, isDarkTheme }) => {
  const { tables, setSelectedCollection, isMySQL, sqlObj, mongodbObj } =
    useContext(curr_context);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleDropdownItemClick = async (table) => {
    // setSelectedCollection(table);
    setIsDropdownVisible(false);
    setSelectedCollection(table);
    // setColl(table);
    // print(table)

    const url = isMySQL ? 'http://127.0.0.1:5000/mysql/connect' : 'http://127.0.0.1:5000/connect';

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
        console.log('Connection successful and data fetched', data);
      } else {
        const errorData = await response.json();
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
        <div className="sidebar-item">
          <FaCog className="sidebar-icon" />
          Settings
        </div>
      </div>
      <ButtonWithModal theme={theme} isDarkTheme={isDarkTheme} />
    </div>
  );
};

export default Sidebar;
