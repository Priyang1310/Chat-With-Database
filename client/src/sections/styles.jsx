import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textColor};
`;
