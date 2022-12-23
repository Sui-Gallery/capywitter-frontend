import React from "react";
import styled from "styled-components";
import LeftMenu from "./left-menu";

const MainStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
  gap: 83px;
  padding: 0 16px 50px 16px;

  .right-menu-con {
    width: 500px;
  }

  .title {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
  }
`;

const Main = ({ children }: any) => {
  return (
    <MainStyled>
      <LeftMenu />
      <div className="right-menu-con">{children}</div>
    </MainStyled>
  );
};

export default Main;
