import { getCapiesList } from "@/services/capy.service";
import Button from "@/styles/button";
import { useWallet } from "@suiet/wallet-kit";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AvailabilityText from "../availability-text";
import CapyItem from "../capy-item";
import Popup from "../popup";
import { JsonRpcProvider, Network } from '@mysten/sui.js';
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
  const wallet = useWallet();
  const didMount = useRef(false);

  const [userCapies, setUserCapies] = useState<any[]>([]);
  const [capySlots, setCapySlots] = useState<Slot[]>([]);

  const provider = useRef<JsonRpcProvider>()

  const exchangeCapy = useCallback(async (capyList: string[]) => {
    console.log(capyList)
    if (wallet.connected) {
      didMount.current = true;
      const result = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: "moveCall",
          data: {
            packageObjectId: process.env.NEXT_PUBLIC_PACKAGE_ID as string,
            module: "cpwtoken",
            function: "exchange_tokens_for_capy",
            typeArguments: [],
            arguments: [capyList, process.env.NEXT_PUBLIC_RESERVE_ID as string],
            gasBudget: 10000,
          },
        },
      });
      // todo result handling
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

  const initWeb3 = useCallback(async () => {
    const sui_provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    provider.current = sui_provider
    const slotObjects = process.env.NEXT_PUBLIC_TWITTER_ID ? await provider.current.getObjectsOwnedByObject(process.env.NEXT_PUBLIC_TWITTER_ID) : [];
    let slots = await Promise.all(slotObjects.map(async(slotObj) => {
      const rawSlot = await provider.current!.getObject(slotObj.objectId)
      // ts claims there is no such data, probably wrong typing by library
      const fields = rawSlot.details.data.fields.value.fields
      return {
        edited_by: fields.edited_by,
        index: fields.index as number,
        minimum_fee: fields.minimum_fee,
        text: fields.text,
      } as Slot
    }))
    slots = slots.sort((a: Slot, b: Slot): number => {
      if (a.index < b.index) return -1
      else return 1
    })
    console.log(slots)
    setCapySlots(slots)
  }, [])

  useEffect(() => {
    initWeb3()
  }, [])

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
