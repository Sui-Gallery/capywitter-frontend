import Button from "@/styles/button";
import Image from "next/image";
import styled from "styled-components";

const CapyItemStyled = styled.div`
  width: 135px;

  .wrapper {
    width: 100%;
    height: 115px;
    text-align: center;
    background: #fff;
    box-shadow: 0px 2px 44px -20px rgba(178, 181, 255, 0.5);
    border-radius: 7px;
  }

  img {
    width: auto;
    object-fit: contain;
    object-position: center;
  }

  button {
    margin-top: 8px;
  }
`;

type CapyItemProps = {
  image_src: string;
  select?: boolean;
  selected?: boolean;
};

const CapyItem = ({ image_src, select, selected }: CapyItemProps) => {
  return (
    <CapyItemStyled>
      <div className="wrapper">
        <Image src={image_src} width={110} height={115} alt="Capy item" />
      </div>
      {select && <Button $mode="capytoken-select"></Button>}
    </CapyItemStyled>
  );
};

export default CapyItem;
