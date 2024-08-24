import React, { createContext, useState, useContext, useEffect } from 'react';

// إنشاء Context
const DarkModeContext = createContext();

// إنشاء Provider
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // تحقق من الوضع المحفوظ في Local Storage عند التهيئة فقط
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    // تطبيق الـ Dark Mode على عنصر html
    document.documentElement.classList.toggle('dark-mode', isDarkMode);

    // حفظ الوضع في Local Storage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  // وظيفة التبديل بين الـ Dark Mode و الـ Light Mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// استخدام الـ Context
export const useDarkMode = () => useContext(DarkModeContext);
