import React from "react";
import styled from "styled-components";
import LeftMenu from "./left-menu";
import Popup from "./popup";

const MainStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 21px;
  padding: 0 16px 50px 16px;
  max-width: 100%;
  width: 1300px;
  margin: 50px auto 0px auto;

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

  @media screen and (max-width: 650px) {
    .title-desc {
      flex-direction: column;
      flex-basis: 100%;

      &.more-space {
        gap: 12px;
      }
    }

    margin-top: 10px;
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
