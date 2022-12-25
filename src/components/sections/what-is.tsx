import Link from "next/link";
import React from "react";
import styled from "styled-components";

const WhatIsStyled = styled.div`
  max-width: 500px;
  margin: 0 auto;

  .section-group-con {
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 17px;

    /*& > div:first-child {
      margin-bottom: 40px;
    }*/
  }

  .s-space {
    height: 13px;
  }

  .section-group {
  }

  .section-title {
    font-size: 16px;
    padding-bottom: 7px;
    padding-left: 5px;
    border-bottom: 1px solid #979797;
    font-weight: 600;
  }

  .section-desc {
    font-size: 13px;
    line-height: 19px;
    margin-top: 6.5px;
    padding: 0 1px;
  }

  .holiday-text {
    display: none;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
  }

  @media screen and (max-width: 650px) {
    .holiday-text {
      margin-top: 50px;
      display: block;
      text-align: center;
    }
    padding: 0 20px;
  }
`;

const WhatIs = ({ className }: { className?: string }) => {
  return (
    <WhatIsStyled className={className || ""}>
      <div className="section-group-con">
        <div className="section-group">
          <div className="section-title">What is CapyWitter?</div>
          <div className="section-desc">
            CapyWitter is a public bullettin board for rich kids of{" "}
            <Link href="">Capybaras</Link>! Capybara holders can exchange their
            Capy’s to 10 Capytoken and buy a slot (capyboard)!
            <div className="s-space"></div>
            There is only 10 public bulletin board for waiting for best offers!
          </div>
        </div>
        <div className="section-group">
          <div className="section-title">How It Works</div>
          <div className="section-desc">
            These slots are on auction, always.
            <div className="s-space"></div>
            You have to pay more capybara token for own the capyboard. If
            someone pays more than you, you also lost the ownership.
          </div>
        </div>
        <div className="section-group">
          <div className="section-title">How Can I Find CapyToken</div>
          <div className="section-desc">
            CapyTokens are free! (Since Capybara’s are free).
            <br /> You can swap your Capy for 10 CapyToken!
            <br /> New projects with CapyTokens are waiting!
          </div>
        </div>
      </div>
      <div className="holiday-text">
        Capy Holidays! <br /> This is an experimental project by <br />
        <b>Sui Gallery Team</b>
      </div>
    </WhatIsStyled>
  );
};

export default WhatIs;
