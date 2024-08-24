import styled from "styled-components";
import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

// أنماط نافذة المودال
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

// أنماط التعتيم الخلفي
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

// إنشاء سياق للمودال
const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const open = (name) => setOpenName(name);
  const close = () => setOpenName("");
  
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

// مكون لفتح المودال
const Open = ({ children, name }) => {
  const { open } = useContext(ModalContext);
  return React.cloneElement(children, {
    onClick: () => open(name),
  });
};

// مكون لعرض نافذة المودال
const Window = ({ children, name }) => {
  const { close, openName } = useContext(ModalContext);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  if (name !== openName) return null;

  return createPortal(
    <Overlay onClick={handleClickOutside}>
      <StyledModal>
        {children}
      </StyledModal>
    </Overlay>,
    document.body
  );
};

// تصدير المكونات
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
