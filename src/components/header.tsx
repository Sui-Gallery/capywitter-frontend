import Link from "next/link";
import React from "react";
import styled from "styled-components";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1155px;
  max-width: 100%;
  margin: auto;
  margin-top: 12px;
  height: 50px;
  padding: 0 16px;

  .nav {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 32px;
    margin-right: 133px;
  }

  a {
    font-weight: 700;
    transition: opacity 0.3s ease;
    text-decoration: none;

    &:hover {
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 650px) {
    flex-direction: column;
    height: auto;
    gap: 20px;

    .nav {
      margin-right: 0;
      text-align: center;
      gap: 24px;
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyled>
      <div className="nav">
        <Link href={"/capytoken"}>CapyToken</Link>
        <Link href={"/"}>CapyFeed</Link>
        <Link href={"/hotelcapyfornia"}>Hotel Capyfornia</Link>
      </div>
      <div>SUI BUTTON</div>
    </HeaderStyled>
  );
};

export default Header;
