import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Logo from "./logo";
import { ConnectButton } from "@suiet/wallet-kit";
import { isMobile } from "@/utils/utils";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1300px;
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
    margin-right: 48px;
  }

  a {
    font-weight: 700;
    transition: opacity 0.3s ease;
    text-decoration: none;

    &:hover {
      opacity: 0.7;
    }

    &.active {
      text-decoration: underline;
    }

    &.onlymobile {
      display: none;
    }
  }

  @media screen and (max-width: 650px) {
    flex-direction: column;
    height: auto;
    gap: 20px;
    margin-top: 60px;

    .nav {
      margin-right: 0;
      text-align: center;
      justify-content: center;
      gap: 10px 7px;
      flex-wrap: wrap;
    }

    a {
      color: #b2b7c2;
      text-decoration: underline;
      font-size: 14px;
      transition: color 0.3s ease;

      &.active {
        color: #323d60;
      }

      &.onlymobile {
        display: inline-block;
      }
    }

    .sui-button {
      display: none;
    }
  }

  .wkit-button,
  .wkit-connected-container {
    width: 240px;
  }
`;

const Header = () => {
  const router = useRouter();

  return (
    <HeaderStyled>
      <Logo $mode="header" />
      <div className="nav">
        <Link
          href={"/whatis"}
          className={
            "onlymobile" + (router?.pathname === "/whatis" ? " active" : "")
          }
        >
          What is?
        </Link>
        <Link
          href={"/capytoken"}
          className={router?.pathname === "/capytoken" ? "active" : ""}
        >
          CapyToken
        </Link>
        <Link href={"/"} className={router?.pathname === "/" ? "active" : ""}>
          CapyFeed
        </Link>
        <Link
          href={"/hotelcapyfornia"}
          className={router?.pathname === "/hotelcapyfornia" ? "active" : ""}
        >
          Hotel Capyfornia
        </Link>
      </div>
      {!isMobile() && <ConnectButton />}
    </HeaderStyled>
  );
};

export default Header;
