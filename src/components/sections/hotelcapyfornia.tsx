import styled from "styled-components";
import CapyItem from "../capy-item";

const HotelCapyforniaSectionStyled = styled.div`
  .capy-list {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 50px;
    margin-left: 20px;
  }

  @media screen and (max-width: 520px) {
    .capy-list {
      margin-left: 0;
      justify-content: space-around;
    }
  }
`;

const HotelCapyforniaSection = () => {
  return (
    <HotelCapyforniaSectionStyled>
      <div className="title-desc">
        <div className="title">
          <div>HOTEL</div>
          <div>CAPYFORNIA</div>
        </div>
        <div className="desc">
          &quot;We are programmed to receive <br />
          You can check out any time you like <br />
          But you can never leave&quot;
          <br />
          <b>All of the capy’s are happy in our CapyHotel!</b>
        </div>
      </div>
      <div className="capy-list">
        <CapyItem image_src="/images/capys/blue.png" />
        <CapyItem image_src="/images/capys/orange.png" />
        <CapyItem image_src="/images/capys/green.png" />
        <CapyItem image_src="/images/capys/blue.png" />
        <CapyItem image_src="/images/capys/orange.png" />
        <CapyItem image_src="/images/capys/green.png" />
        <CapyItem image_src="/images/capys/blue.png" />
        <CapyItem image_src="/images/capys/orange.png" />
        <CapyItem image_src="/images/capys/green.png" />
        <CapyItem image_src="/images/capys/blue.png" />
        <CapyItem image_src="/images/capys/orange.png" />
        <CapyItem image_src="/images/capys/green.png" />
        <CapyItem image_src="/images/capys/blue.png" />
        <CapyItem image_src="/images/capys/orange.png" />
        <CapyItem image_src="/images/capys/green.png" />
      </div>
    </HotelCapyforniaSectionStyled>
  );
};

export default HotelCapyforniaSection;
