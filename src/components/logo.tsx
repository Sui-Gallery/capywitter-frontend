import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";

type LogoProps = {
  $mode: "left-menu" | "header";
};

const LogoStyled = styled(Link)<LogoProps>`
  display: inline-block;
  text-align: center;
  width: 100%;

  img {
    object-fit: contain;
  }

  ${(props) =>
    props?.$mode === "header" &&
    css`
      display: none;

      img {
        width: 110px;
        height: 110px;
      }

      @media screen and (max-width: 650px) {
        display: inline-block;
      }
    `}

  ${(props) =>
    props?.$mode === "left-menu" &&
    css`
      @media screen and (max-width: 650px) {
        display: none;
      }
    `}
`;

const Logo = ({ $mode }: LogoProps) => {
  return (
    <LogoStyled href={"/"} $mode={$mode}>
      <Image
        src={"/images/capywitter-logo.png"}
        width={209}
        height={188}
        alt="CapyWitter Logo"
      />
    </LogoStyled>
  );
};

export default Logo;
