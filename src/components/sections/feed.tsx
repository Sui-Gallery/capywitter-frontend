import { subscribePublishEvents } from "@/services/capy.service";
import Button from "@/styles/button";
import { Slot } from "@/types/Slot";
import { isMobile } from "@/utils/utils";
import { JsonRpcProvider } from "@mysten/sui.js";
import { useWallet } from "@suiet/wallet-kit";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import AvailabilityText from "../availability-text";
import Popup from "../popup";

const FeedStyled = styled.div`
  .feeds-con {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
  }

  .feed-item {
    width: 100%;
    background: #fff;
    padding: 3px;
    border-radius: 7px;
  }

  .feed-head {
    width: 100%;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px 16px;
    background: #b9d2af;
    border-radius: 4px;
    padding: 6px 10px;

    .left {
      color: #32446b;
    }

    .right {
      color: #fff;
    }
  }

  .feed-content {
    margin-top: 24px;
    padding-left: 15px;
    padding-right: 21px;
    font-size: 12px;
    line-height: 14px;
    color: #32446b;
    margin-bottom: 18px;
  }

  .feed-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 11px;
    font-size: 12px;
    margin-left: 15px;
    margin-right: 9px;
  }

  .feed-info {
    padding-bottom: 2px;
  }

  .info-title {
    font-weight: 500;
    color: #32446b;
    margin-right: 13px;
  }

  @media screen and (max-width: 650px) {
    .title {
      display: none;
    }
  }
`;

const FeedSection = () => {
  const [popupShow, setPopupShow] = useState(false);
  const [capySlots, setCapySlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const wallet = useWallet();
  const didMount = useRef(false);

  const initFeed = useCallback(async () => {
    const sui_provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const slotObjects = process.env.NEXT_PUBLIC_TWITTER_ID
      ? await sui_provider.getObjectsOwnedByObject(
          process.env.NEXT_PUBLIC_TWITTER_ID
        )
      : [];
    let slots = await Promise.all(
      slotObjects.map(async (slotObj) => {
        const rawSlot: any = await sui_provider!.getObject(slotObj.objectId);
        // ts claims there is no such data, probably wrong typing by library - agreed
        const fields = rawSlot.details?.data?.fields.value.fields;
        return {
          edited_by: fields.edited_by,
          index: fields.index as number,
          minimum_fee: fields.minimum_fee,
          text: fields.text,
        } as Slot;
      })
    );
    slots = slots.sort((a: Slot, b: Slot): number => {
      if (a.index < b.index) return -1;
      else return 1;
    });
    console.log("Slots:", slots);
    setCapySlots(slots);
  }, []);

  useEffect(() => {
    initFeed();
  }, [initFeed]);

  useEffect(() => {
    if (didMount.current && wallet.connected && wallet.address) {
      return;
    }
    const sui_provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    subscribePublishEvents(
      process.env.NEXT_PUBLIC_PACKAGE_ID,
      sui_provider,
      async (e) => {
        console.log("subscribe event callback", e);
        if (wallet.connected && wallet.address) {
          initFeed();
        } else {
          console.log("wallet is not connected");
        }
      }
    );
  }, [wallet.address, wallet.connected]);

  const handleBuyBoxClick = (selectedSlot: Slot) => {
    setSelectedSlot(selectedSlot);
    setPopupShow(true);
  };

  const renderCapySlots = useMemo(() => {
    return capySlots.map((slot, index) => (
      <div className="feed-item" key={"feed-item_" + index}>
        <div className="feed-head">
          <div className="left">capyboard: no {slot.index}</div>
          <div className="right">
            owner: {slot.edited_by.substring(0, 4)}….
            {slot.edited_by.substring(
              slot.edited_by.length - 4,
              slot.edited_by.length
            )}
          </div>
        </div>
        <div className="feed-content">
          {slot.text || "This field is not taken, yet"}
        </div>
        <div className="feed-footer">
          <div className="feed-info">
            <span className="info-title">current min box price:</span>
            <span>{slot.minimum_fee} CAPYTOKEN</span>
          </div>
          {wallet.address === slot.edited_by ? (
            ""
          ) : (
            <Button
              $mode="feed-button"
              onClick={() => !isMobile() && handleBuyBoxClick(slot)}
            >
              Buy This Box!
            </Button>
          )}
        </div>
      </div>
    ));
  }, [capySlots]);

  return (
    <FeedStyled>
      <div className="title">CAPYFEED</div>
      <AvailabilityText />
      <div className="feeds-con">{renderCapySlots}</div>
      <Popup
        content="capyboard"
        setShow={setPopupShow}
        show={popupShow}
        setSelectedSlot={setSelectedSlot}
        selectedSlot={selectedSlot}
        initFeed={initFeed}
      />
    </FeedStyled>
  );
};

export default FeedSection;
