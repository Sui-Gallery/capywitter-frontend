import Button from "@/styles/button";
import { isMobile } from "@/utils/utils";
import { useState } from "react";
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

  return (
    <FeedStyled>
      <div className="title">CAPYFEED</div>
      <AvailabilityText />
      <div className="feeds-con">
        {Array.from({ length: 10 }).map((e, index) => (
          <div className="feed-item" key={"feed-item_" + index}>
            <div className="feed-head">
              <div className="left">capyboard: no {index + 1}</div>
              <div className="right">owner: 0x342….ab4gd</div>
            </div>
            <div className="feed-content">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              reprehenderit libero cumque adipisci cum inventore recusandae
              laudantium ?
            </div>
            <div className="feed-footer">
              <div className="feed-info">
                <span className="info-title">current min box price:</span>
                <span>100 CAPYTOKEN</span>
              </div>
              <Button
                $mode="feed-button"
                onClick={() => !isMobile() && setPopupShow(true)}
              >
                Buy This Box!
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Popup content="capyboard" setShow={setPopupShow} show={popupShow} />
    </FeedStyled>
  );
};

export default FeedSection;
