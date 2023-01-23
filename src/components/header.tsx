import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logo from "./logo";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import { isMobile } from "@/utils/utils";
import {
  getCapiesList,
  getCpwBalance,
  subscribeExchangeEvents,
} from "@/services/capy.service";
import { JsonRpcProvider } from "@mysten/sui.js";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1000px;
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
    margin-right: 32px;
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

  .your-wallet-info {
    z-index: -1;
    position: absolute;
    width: 223px;
    font-size: 16px;
    font-weight: bold;
    right: 10px;
    top: 60px;
  }

  .button-con {
    position: relative;
  }

  .your-wallet-title {
    padding-bottom: 5px;
    border-bottom: 1px solid #979797;
    margin-bottom: 6px;
  }

  .your-wallet-item {
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
  }

  @media screen and (max-width: 1000px) {
    .your-wallet-info {
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
    width: 250px;
  }
`;

const Header = () => {
  const router = useRouter();
  const wallet = useWallet();
  const [capybaras, setCapybaras] = useState(0);
  const [capyTokens, setCapyTokens] = useState(0);
  //const didMount = useRef(false);

  const initWalletInfo = useCallback(async () => {
    if (wallet.connected && wallet.address) {
      setCapybaras((await getCapiesList(wallet.address))?.length || 0);
      setCapyTokens((await getCpwBalance(wallet.address)) || 0);
    }
  }, [wallet]);

  /*
  useEffect(() => {
    if (didMount.current && wallet.connected && wallet.address) {
      return;
    }
    console.log(wallet.address);
    const sui_provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    subscribeExchangeEvents(
      process.env.NEXT_PUBLIC_PACKAGE_ID,
      sui_provider,
      async (e) => {
        if (wallet.connected && wallet.address) {
          setCapybaras((await getCapiesList(wallet.address))?.length || 0);
          setCapyTokens((await getCpwBalance(wallet.address)) || 0);
        } else {
          console.log("wallet is not connected");
        }
      }
    );
  }, [wallet.address, wallet.connected]);
  */

  useEffect(() => {
    initWalletInfo();
  }, [initWalletInfo]);

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
      <div className="button-con">
        {!isMobile() && <ConnectButton />}
        {wallet.connected && (
          <div className="your-wallet-info">
            <div className="your-wallet-title">Your Wallet</div>
            <div className="your-wallet-items">
              <div className="your-wallet-item">
                <div className="your-wallet-item-title">Your Capybaras</div>
                <div className="your-wallet-item-value">{capybaras}</div>
              </div>
              <div className="your-wallet-item">
                <div className="your-wallet-item-title">Your CapyTokens</div>
                <div className="your-wallet-item-value">{capyTokens}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </HeaderStyled>
  );
};

export default Header;
