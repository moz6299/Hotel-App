import React from "react";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import AccountIcon from "./AccountIcon";
import UserAvatar from "../features/authentication/UserAvatar";
import { useUser } from "../features/authentication/useUser";
import Toggle from "./Toggle";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--color-grey-0);
  box-shadow: 0 4px 6px var(--shadow-md);
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;

  /* Dark Mode styles */
  &.dark-mode {
    background-color: var(--color-grey-50);
    border-color: var(--color-grey-200);
    box-shadow: 0 4px 6px var(--shadow-lg);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Header = () => {
  const { fullName, avatar } = useUser();

  return (
    <StyledHeader className={document.documentElement.classList.contains('dark-mode') ? 'dark-mode' : ''}>
      <UserSection>
        <Logout />
        <AccountIcon />
        <Toggle />
        <UserAvatar
          src={avatar || "default-user.jpg"}
          alt={`Avatar of ${fullName}`}
          name={fullName}
        />
      </UserSection>
    </StyledHeader>
  );
};

export default Header;
