import Button from "@/styles/button";
import styled from "styled-components";
import CapyItem from "../capy-item";

const CapyTokenSectionStyled = styled.div`
  .capy-list {
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
`;

const CapyTokenSection = () => {
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
      <br />
      or
      <br />
      <br />
      <Button $mode="select-all">Select All</Button>
    </CapyTokenSectionStyled>
  );
};

export default CapyTokenSection;
