import React from 'react';
import './AppContainer.css';

const AppContainer = ({ children, theme }) => {
  return (
    <div className="app-container" style={{ backgroundColor: theme.background, color: theme.textColor }}>
      {children}
    </div>
  );
};

export default AppContainer;
