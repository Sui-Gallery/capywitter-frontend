import { getCapiesList } from "@/services/capy.service";
import Button from "@/styles/button";
import { useWallet, useSuiProvider } from "@suiet/wallet-kit";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AvailabilityText from "../availability-text";
import CapyItem from "../capy-item";
import Popup from "../popup";

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
  const wallet = useWallet();
  const didMount = useRef(false);

  const [userCapies, setUserCapies] = useState<any[]>([]);

  const exchangeCapy = useCallback(async () => {
    if (wallet.connected && didMount.current !== true) {
      didMount.current = true;
      const result = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: "moveCall",
          data: {
            packageObjectId: "0x38e9a153cde164e1ff1e6aff5b8b93f836b8ba75",
            module: "NFT",
            function: "mint",
            typeArguments: [],
            arguments: [],
            gasBudget: 10000,
          },
        },
      });
    }
  }, [wallet]);

  const handleCapySendClick = (objectId: string) => {
    console.log(objectId);
  };

  const initUserCapies = useCallback(async () => {
    if (wallet.connected && wallet.address && didMount.current !== true) {
      didMount.current = true;
      console.log(2, wallet.address);

      const cp = await getCapiesList(wallet.address);
      console.log(3);
      setUserCapies(cp);
    }
  }, [wallet.address, wallet.connected]);

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

      <div className="capy-list">
        {userCapies.map((capy, index) => {
          console.log("asdasokdjsa", capy);
          return (
            <CapyItem
              key={"capy-" + index}
              image_src={capy?.details?.data?.fields?.url}
              select
              onClick={() => console.log("1321321")}
            />
          );
        })}
      </div>
      <div className="or-divider">or</div>
      <Button
        $mode="select-all"
        className="button-select-all"
        onClick={() => setPopupShow(true)}
      >
        Select All
      </Button>
      <div className="price-desc">
        <div>1 Capybara = 10 Capytoken</div>
        <div>
          <b>You cannot take back your capybaras.</b>
        </div>
      </div>
      <AvailabilityText />

      <Popup content="capytoken" setShow={setPopupShow} show={popupShow} />
    </CapyTokenSectionStyled>
  );
};

export default CapyTokenSection;
