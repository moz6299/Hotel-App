import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledAppLayOut = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const StyledMain = styled.main`
  background-color:var(--color-grey-50);
  padding: 4rem 8.4rem 6.4rem;
  overflow:scroll;
`;

const AppLayOut = () => {
  return (
    <StyledAppLayOut>
      <Header />
      <Sidebar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAppLayOut>
  );
};

export default AppLayOut;
