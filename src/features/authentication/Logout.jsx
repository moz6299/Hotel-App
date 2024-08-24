import React from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";
import { FiLogOut } from "react-icons/fi";


const Logout = () => {
  const { logoutUser, isLoggingOut } = useLogout();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={isLoggingOut}
      style={{
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '0',
      }}
    >
      {isLoggingOut ? (
        <SpinnerMini />
      ) : (
        <FiLogOut size={25} /> // حجم الأيقونة يمكن تعديله حسب الحاجة
      )}
    </button>
  );
};

export default Logout;
