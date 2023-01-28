import {
  exchangeCapy,
  publishText,
  getCpwBalance,
} from "@/services/capy.service";
import Button from "@/styles/button";
import { Slot } from "@/types/Slot";
import { isMobile } from "@/utils/utils";
import { useWallet } from "@suiet/wallet-kit";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// TODO; Seperate popups in this file under popups folder

type PopupProps = {
  show: boolean;
  setShow: any;
  content: "capyboard" | "capytoken";
  setUserCapies?: any;
  userCapies?: any[];
  setSelectedSlot?: any;
  selectedSlot?: Slot | null;
  minOffer?: number;
  initFeed?: any;
};

const CapyTokenContentStyled = styled.div`
  padding: 30px 22px 22px 22px;
  text-align: center;
  color: #1a1d23;

  .head-img {
    img {
      object-fit: contain;
    }
  }

  .capytoken-info {
    display: flex;
    justify-content: space-between;
    width: 274px;
    margin: 0 auto;
    margin-bottom: 7px;
    font-size: 12px;
    line-height: 14px;
    font-weight: 500;
  }
`;

const CapyTokenContent = (props: PopupProps) => {
  const wallet = useWallet();
  const availableCapybaras = props?.userCapies?.length || 0;
  const capytokensWillReceived = props?.userCapies?.length
    ? props?.userCapies?.length * 10
    : 0;

  const handleGiveAllCapiesButton = async () => {
    const allCapyIds =
      props?.userCapies?.map((capy) => capy?.details?.reference?.objectId) ||
      [];

    const result = await exchangeCapy(wallet, allCapyIds);

    if (result && result?.effects.status.status === "success") {
      props.setUserCapies([]);
      props.setShow(false);
      return;
    }
    console.log(3);

    alert("Problem occured while moving CapyTokens!");
    props.setShow(false);
  };

  return (
    <>
      <CapyTokenContentStyled>
        <div className="head-img">
          <Image
            src={"/images/capys/green.png"}
            width={115}
            height={123}
            alt="CapyToken Popup Image"
          />
        </div>
        <div className="popup-title">CapyToken</div>
        <div className="popup-desc">
          Now Your CapyBaras goes to Hotel Capybara. Note that: Capys are really
          like to Hotel Capybara, they won’t come back!
        </div>
        <div className="capytoken-info">
          <div className="info-title">Available CapyBaras</div>
          <div className="info-value">{availableCapybaras}</div>
        </div>
        <div className="capytoken-info">
          <div className="info-title">CapyTokens Will Be Received</div>
          <div className="info-value">{capytokensWillReceived}</div>
        </div>
        <div className="buttons">
          <Button $mode="cancel" onClick={() => props?.setShow(false)}>
            Cancel
          </Button>
          <Button onClick={handleGiveAllCapiesButton}>
            Ok! Let&apos;s give me CapyTokens
          </Button>
        </div>
      </CapyTokenContentStyled>
    </>
  );
};

const CapyBoardContentStyled = styled.div`
  padding: 30px 22px 22px 22px;
  text-align: center;
  color: #1a1d23;

  .popup-desc {
    width: 320px !important;
  }

  .form-con {
    text-align: left;
  }

  label {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    display: block;
    margin-bottom: 7px;
    margin-left: 6px;
  }

  textarea,
  input {
    width: 100%;
    background: #eaeef5;
    box-shadow: 0px 2px 44px -11px rgba(215, 215, 222, 0.5);
    border-radius: 7px;
    border: 0;
    outline: none;
    padding: 9px;
  }

  textarea {
    resize: none;
    height: 96px;
  }

  input {
    padding-left: 20px;
  }

  .popup-title {
    margin-top: 5px !important;
  }

  .price-con {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    margin-top: 25px;
    margin-bottom: 14px;
    margin-left: 6px;
  }

  .price-text {
    margin-left: 5px;
  }

  .oneline-input {
    display: flex;
    align-items: center;
    gap: 15px;

    label {
      min-width: max-content;
      margin-bottom: 0;
    }
  }
`;

const CapyBoardContent = (props: PopupProps) => {
  const [textContent, setTextContent] = useState("");
  const [offerPrice, setOfferPrice] = useState(
    Number(props?.selectedSlot?.minimum_fee)
      ? Number(props?.selectedSlot?.minimum_fee) + 1
      : 0
  );
  const wallet = useWallet();

  useEffect(() => {
    if (!props?.selectedSlot) {
      alert("Problem occured while accessing slot");
      handleCancelClick();
    }
  }, []);

  const handleSubmitClick = async () => {
    if (!wallet.address) return;

    if (textContent.length === 0) {
      alert("You haven't entered any text");
      return;
    }

    const user_balance = await getCpwBalance(wallet.address);

    if (offerPrice > user_balance) {
      alert("You don't have enough CapyTokens");
      return;
    }

    const publishResult = await publishText(
      wallet,
      textContent,
      offerPrice,
      props?.selectedSlot?.index as number
    );

    console.log("publishResult", publishResult);

    if (publishResult?.effects?.status?.status === "success") {
      alert("Successfuly bought the box!");
      props?.initFeed && props?.initFeed();
      handleCancelClick();
    }
  };

  const handleCancelClick = () => {
    props?.setShow(false);
    props?.setSelectedSlot(null);
  };

  return (
    <>
      <CapyBoardContentStyled>
        <div className="popup-title">CapyBoard</div>
        <div className="popup-desc">
          We will working on edit button, always. However, you can only change
          the capyboard once.
        </div>
        <div className="form-con">
          <label>Enter Your Text</label>
          <textarea
            maxLength={180}
            onChange={(event) => setTextContent(event.target.value)}
          ></textarea>
          <div className="price-con">
            Current Price :{" "}
            <span className="price-text">
              {props?.selectedSlot?.minimum_fee} Capy Token
            </span>
          </div>
          <div className="oneline-input">
            <label>Your Offering</label>
            <input
              type="number"
              min={
                Number(props?.selectedSlot?.minimum_fee)
                  ? Number(props?.selectedSlot?.minimum_fee) + 1
                  : 0
              }
              value={offerPrice}
              placeholder="Enter a Price Higher Than Current Price"
              onChange={(event) => setOfferPrice(Number(event.target.value))}
            />
          </div>
        </div>
        <div className="buttons">
          <Button $mode="cancel" onClick={() => handleCancelClick()}>
            Cancel
          </Button>
          <Button onClick={handleSubmitClick}>Shine on the CapyBoard</Button>
        </div>
      </CapyBoardContentStyled>
    </>
  );
};

const PopupStyled = styled.div`
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }

  .wrapper {
    width: 423px;
    background: #ffffff;
    box-shadow: 0px 2px 44px -20px rgba(178, 181, 255, 0.5);
    border-radius: 7px;
    position: absolute;
    z-index: 50;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .popup-title {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;

    margin-top: 20px;
    margin-bottom: 10px;
  }

  .popup-desc {
    width: 274px;
    margin: 0 auto;
    font-size: 12px;
    line-height: 14px;
    font-weight: 500;
    margin-bottom: 22px;
  }

  .buttons {
    display: flex;
    margin-top: 50px;
    gap: 15px;

    button:first-child {
      width: 143px;
    }

    button:last-child {
      width: 218px;
    }
  }
`;

const Popup = (props: PopupProps) => {
  const overlayRef = useRef(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e?.target === overlayRef?.current) {
      props.setShow(false);
      props?.setSelectedSlot && props?.setSelectedSlot(null);
    }
  };

  useEffect(() => {
    if (props.show === true) {
      if (isMobile() === true) {
        props.setShow(false);
        props?.setSelectedSlot && props?.setSelectedSlot(null);
        return;
      }
      document.body.setAttribute("style", "overflow:hidden");
    } else {
      document.body.setAttribute("style", "");
    }
  }, [props.show]);

  return props.show ? (
    <PopupStyled>
      <div className="overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="wrapper">
          {props.content === "capyboard" ? (
            <CapyBoardContent {...props} />
          ) : props.content === "capytoken" ? (
            <CapyTokenContent {...props} />
          ) : (
            ""
          )}
        </div>
      </div>
    </PopupStyled>
  ) : (
    <></>
  );
};

export default Popup;
