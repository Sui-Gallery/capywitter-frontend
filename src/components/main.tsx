import React from "react";
import styled from "styled-components";
import LeftMenu from "./left-menu";

const MainStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
  gap: 21px;
  padding: 0 16px 50px 16px;

  .right-menu-con {
    width: 460px;
  }

  .title {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
  }

  .desc {
    font-size: 13px;
    line-height: 15.41px;
    font-style: italic;

    b {
      font-style: normal;
      font-weight: 500;
      display: inline-block;
      margin-top: 6px;
    }
  }

  .title-desc {
    display: flex;
    gap: 12px;
    flex-basis: 50%;

    &.more-space {
      gap: 26px;
    }
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
