import Button from "@/styles/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Logo from "./logo";
import WhatIs from "./sections/what-is";

const LeftMenuStyled = styled.div`
  width: 217px;

  @media screen and (max-width: 745px) {
    padding: 0 20px;
    width: 400px;
  }

  @media screen and (max-width: 650px) {
    .whatis-con {
      display: none;
    }

    .button-claimtoken {
      display: none;
    }
  }
`;

const LeftMenu = () => {
  return (
    <LeftMenuStyled>
      <Logo $mode="left-menu" />
      <WhatIs className="whatis-con" />

      <Button $mode="claim-capytoken" className="button-claimtoken">
        Claim Your CapyToken!
      </Button>
    </LeftMenuStyled>
  );
};

export default LeftMenu;
