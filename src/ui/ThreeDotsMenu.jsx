import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';


/* eslint-disable */

const MenuButton = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: var(--color-grey-50);
    border-color: var(--color-grey-300);
  }

  &:active {
    background-color: var(--color-grey-100);
  }
`;

const MenuList = styled.div`
  position: absolute;
  top: 100%; /* Ensures the menu appears directly below the button */
  right: 0;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  box-shadow: var(--shadow-md);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  min-width: 150px;
  max-height: 300px;
  overflow-y: auto;
  padding: 5px 0;
  
  /* Dark Mode styles */
  &.dark-mode {
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-300);
    box-shadow: var(--shadow-lg);
  }
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & > svg {
    margin-right: 10px;
    color: var(--color-grey-700);
  }

  /* Dark Mode styles */
  &.dark-mode {
    &:hover {
      background-color: var(--color-grey-200);
    }

    & > svg {
      color: var(--color-grey-300);
    }
  }
`;

function ThreeDotsMenu({ id, openMenuId, onToggleMenu, children }) {
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onToggleMenu(null);
      }
    }

    if (openMenuId === id) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId, id, onToggleMenu]);

  return (
    <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { id, openMenuId, onToggleMenu, isDarkMode })
      )}
    </div>
  );
}

ThreeDotsMenu.Button = ({ id, onToggleMenu }) => (
  <MenuButton onClick={() => onToggleMenu(id)}>
    &#x22EE;
  </MenuButton>
);

ThreeDotsMenu.List = ({ id, openMenuId, children, isDarkMode }) =>
  openMenuId === id ? (
    <MenuList className={isDarkMode ? 'dark-mode' : ''}>
      {children}
    </MenuList>
  ) : null;

ThreeDotsMenu.Item = ({ icon, children, onClick, onToggleMenu, isDarkMode, id }) => (
  <MenuItem
    className={isDarkMode ? 'dark-mode' : ''}
    onClick={() => {
      onClick();
      onToggleMenu(null);  // Close the menu
    }}
  >
    {icon}
    {children}
  </MenuItem>
);

export default ThreeDotsMenu;
