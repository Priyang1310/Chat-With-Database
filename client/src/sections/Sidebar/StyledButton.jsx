import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const StyledButton = styled.button`
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
  margin: 20px 0;
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

const ButtonWithModal = ({theme,isDarkTheme}) => {
  const [showModal, setShowModal] = useState(false);
  const [connectionString, setConnectionString] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Connection string: ${connectionString}`);
    // Add logic to use the connection string as needed
    handleCloseModal();
  };

  return (
    <CenteredContainer style={{backgroundColor:theme.sidebarBackground,height:"7rem"}}>
      <StyledButton onClick={handleOpenModal} style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"10px"}}><FaPlus />Add Connection URL</StyledButton>
      <ModalBackground  show={showModal} onClick={handleCloseModal}>
        <ModalContent style={{backgroundColor:theme.sidebarBackground}} onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <h2>Enter Database Connection String</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              style={{color:theme.textColor,backgroundColor:theme.sidebarBackground}}
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              placeholder="MongoDB Connection String"
              required
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
        </ModalContent>
      </ModalBackground>
    </CenteredContainer>
  );
};

export default ButtonWithModal;
