import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';


const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  width: 50px;
  height: 25px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#4f46e5" : "#ccc")};
  border-radius: 25px;
  position: relative;
  transition: background-color 0.3s;
`;

const ToggleCircle = styled.div`
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ isDarkMode }) => (isDarkMode ? "26px" : "2px")};
  transition: left 0.3s;
`;

const ToggleLabel = styled.span`
  margin-left: 10px;
  font-size: 1.6rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#374151")};
`;

const Toggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ToggleContainer onClick={toggleDarkMode}>
      <ToggleSwitch isDarkMode={isDarkMode}>
        <ToggleCircle isDarkMode={isDarkMode} />
      </ToggleSwitch>
      <ToggleLabel isDarkMode={isDarkMode}>
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </ToggleLabel>
    </ToggleContainer>
  );
};

export default Toggle;
