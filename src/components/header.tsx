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
    width: 240px;
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
  .wkit-connected-container,
  .wkit-connected-button {
    width: 260px;
    height: 45px !important;
  }

  .wkit-button {
    line-height: 0px;
    color: #1a1d23;
    font-weight: bold;
    background: #f2f2f2 !important;
    border-radius: 11px !important;
    border: 1px solid #372f2f !important;
    transition: background 0.3s ease;

    &:hover {
      background: #ddd !important;
    }

    &:active {
      background: #cacaca !important;
    }
  }

  .wkit-connected-button {
    background: #4f4848 !important;
    color: #fff !important;
    --wkit-on-bg-rgb: 255, 255, 255;
    border: 1px solid #372f2f !important;
    font-size: 14px !important;
    --wkit-font-size-medium: 14px;
    padding-left: 10px;
  }

  .wkit-disconnect-button {
    height: 40px;
    border: 1px solid #372f2f !important;
  }

  .wkit-address-select__address {
    font-size: 12px !important;
  }

  .wkit-connected-button__balance {
    padding-left: 10px;
    text-align: left;
  }

  .wkit-disconnect-button__container {
    bottom: -48px;
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

  useEffect(() => {
    console.log(wallet.address);
    const sui_provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    subscribeExchangeEvents(
      process.env.NEXT_PUBLIC_PACKAGE_ID,
      sui_provider,
      async (e) => {
        console.log("subscribe exchange event callback", e);
        if (wallet.connected && wallet.address) {
          setCapybaras((await getCapiesList(wallet.address))?.length || 0);
          setCapyTokens((await getCpwBalance(wallet.address)) || 0);
        } else {
          console.log("wallet is not connected");
        }
      }
    );
  }, [wallet.address, wallet.connected]);

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
