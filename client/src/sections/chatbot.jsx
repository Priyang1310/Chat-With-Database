import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { curr_context } from '../contexts/Central';
import { lightTheme, darkTheme } from './themes';
import { AppContainer } from './styles';
import Sidebar from './Sidebar';
import ChatContainer from './ChatContainer';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { user } = useContext(curr_context);
  const { logout } = useAuth0();

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <AppContainer>
        <Sidebar isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        <ChatContainer user={user} logout={logout} />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
