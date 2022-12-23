import styled, { css } from "styled-components";

type ButtonProps = {
  $mode: "feed-button" | "claim-capytoken";
};

const Button = styled.button<ButtonProps>`
  background: #332923;
  border-radius: 5px;
  border: none;
  color: #fddb8b;

  transition: background 0.6s ease, color 0.6s ease;
  cursor: pointer;

  &:hover {
    background: #fddb8b;
    color: #332923;
  }

  &:active {
    background: #272624;
    color: #fff;
  }

  ${(props) =>
    props?.$mode === "claim-capytoken" &&
    css`
      width: 100%;
      font-weight: 500;
      padding: 10px 17px;
    `}

  ${(props) =>
    props?.$mode === "feed-button" &&
    css`
      width: auto;
      color: #fff;
      padding: 7px 17px;
    `}
`;
export default Button;
