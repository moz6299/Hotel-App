import React from "react";
import { FaUser } from "react-icons/fa"; // Importing a user icon from react-icons
import { useNavigate } from "react-router-dom";

const AccountIcon = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    navigate("/account"); // Navigate to the /account route
  };

  return (
    <button 
      onClick={handleClick} 
      style={{
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '0',
      }}
    >
      <FaUser size={25} /> {/* Adjust the size as needed */}
    </button>
  );
};

export default AccountIcon;
