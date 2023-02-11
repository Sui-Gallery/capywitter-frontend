import { getCapiesList } from "@/services/capy.service";
//import { useWallet } from "@suiet/wallet-kit";
import { useWalletKit } from "@mysten/wallet-kit";
import { useCallback, useEffect, useState } from "react";
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
  const [capyforniaList, setCapyforniaList] = useState<any[]>([]);
  const wallet = useWalletKit();

  const initCapyfornia = useCallback(async () => {
    if (wallet.isConnected && wallet.currentAccount) {
      console.log("wallet address", wallet.currentAccount);

      const capies = await getCapiesList(process.env.NEXT_PUBLIC_CAPYFORNIA_ID);
      setCapyforniaList(capies);
    }
  }, [wallet.currentAccount, wallet.isConnected]);

  useEffect(() => {
    initCapyfornia();
  }, [initCapyfornia]);

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
        {capyforniaList?.map((capy, index) => (
          <CapyItem
            key={"capyfornia-item_" + index}
            image_src={capy?.details?.data?.fields?.url}
          />
        ))}
      </div>
    </HotelCapyforniaSectionStyled>
  );
};

export default HotelCapyforniaSection;
