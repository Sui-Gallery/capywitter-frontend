import Button from "@/styles/button";
import { isMobile } from "@/utils/utils";
import { useState } from "react";
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
        <CapyItem image_src="/images/capys/blue.png" select selected />
        <CapyItem image_src="/images/capys/orange.png" select />
        <CapyItem image_src="/images/capys/green.png" select />
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
