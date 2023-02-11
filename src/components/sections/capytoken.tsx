import { exchangeCapy, getCapiesList } from "@/services/capy.service";
import Button from "@/styles/button";
//import { useWallet } from "@suiet/wallet-kit";
import { useWalletKit } from "@mysten/wallet-kit";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AvailabilityText from "../availability-text";
import CapyItem from "../capy-item";
import Popup from "../popup";
import { JsonRpcProvider, Network } from "@mysten/sui.js";
import { Slot } from "@/types/Slot";
import { GAS_FEE } from "@/utils/constants";

const CapyTokenSectionStyled = styled.div`
  .capy-list {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .select-title {
    margin-top: 50px;
    margin-bottom: 18px;
    font-size: 13px;
    line-height: 15px;
  }

  .price-desc {
    margin-top: 44px;
    font-size: 12px;
    line-height: 16px;

    b {
      font-weight: 500;
    }
  }

  .or-divider {
    margin-top: 28px;
    margin-bottom: 12px;
    font-size: 14px;
  }

  @media screen and (max-width: 650px) {
    .select-title {
      display: none;
    }

    .capy-list {
      display: none;
    }

    .or-divider {
      display: none;
    }

    .button-select-all {
      display: none;
    }

    .price-desc {
      margin-bottom: 20px;
    }
  }
`;

const CapyTokenSection = () => {
  const [popupShow, setPopupShow] = useState(false);
  const wallet = useWalletKit();

  const [userCapies, setUserCapies] = useState<any[]>([]);

  const handleCapySendClick = async (objectId: string) => {
    const result = await exchangeCapy(wallet, [objectId]);
    if (result && result?.effects.status.status === "success") {
      initUserCapies();
    }
  };

  const handleCapySelectAllClick = () => {
    console.log("userCapies", userCapies);
  };

  const initUserCapies = useCallback(async () => {
    if (wallet.isConnected && wallet.currentAccount) {
      console.log("wallet address", wallet.currentAccount);

      const capies = await getCapiesList(wallet.currentAccount);
      setUserCapies(capies);
    }
  }, [wallet.currentAccount, wallet.isConnected]);

  useEffect(() => {
    initUserCapies();
  }, [initUserCapies]);

  return (
    <CapyTokenSectionStyled>
      <div className="title-desc more-space">
        <div className="title">CAPYTOKEN</div>
        <div className="desc">
          HotelCapyfornia pays you 10 Capytoken per capy.
        </div>
      </div>
      <div className="select-title">
        Select Capybaras for send them Hotel Capyfornia!
      </div>

      {userCapies?.length > 0 ? (
        <div className="capy-list">
          {userCapies.map((capy, index) => {
            return (
              <CapyItem
                key={"capy-" + index}
                image_src={capy?.details?.data?.fields?.url}
                select
                onClick={() =>
                  handleCapySendClick(capy?.details?.reference?.objectId)
                }
              />
            );
          })}
        </div>
      ) : (
        <div>You have no capy, go catch them all!</div>
      )}

      {userCapies.length !== 0 && (
        <>
          <div className="or-divider">or</div>
          <Button
            $mode="select-all"
            className="button-select-all"
            onClick={() => setPopupShow(true)}
          >
            Select All
          </Button>
        </>
      )}
      <div className="price-desc">
        <div>1 Capybara = 10 Capytoken</div>
        <div>
          <b>You cannot take back your capybaras.</b>
        </div>
      </div>
      <AvailabilityText />

      <Popup
        content="capytoken"
        setShow={setPopupShow}
        show={popupShow}
        setUserCapies={setUserCapies}
        userCapies={userCapies}
      />
    </CapyTokenSectionStyled>
  );
};

export default CapyTokenSection;
