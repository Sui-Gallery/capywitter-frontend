import styled, { css } from "styled-components";

type ButtonProps = {
  $mode?:
    | "feed-button"
    | "claim-capytoken"
    | "capytoken-select"
    | "select-all"
    | "cancel";
};

const Button = styled.button<ButtonProps>`
  background: #332923;
  border-radius: 5px;
  border: none;
  color: #fddb8b;
  font-size: 12px;
  padding: 10px 17px;
  font-weight: 500;

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
    props?.$mode === "cancel" &&
    css`
      background: #f3f3f3;
      color: #1c1f25;
      font-weight: 500;

      &:active {
        background: #ddd;
        color: #1c1f25;
      }
    `}

  ${(props) =>
    (props?.$mode === "claim-capytoken" || props?.$mode === "select-all") &&
    css`
      width: ${props?.$mode === "select-all" ? "135px" : "100%"};
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

  ${(props) =>
    props?.$mode === "capytoken-select" &&
    css`
      width: 100%;
      font-weight: 500;
      font-size: 12px;
      box-shadow: 0px 2px 44px -20px rgba(178, 181, 255, 0.5);
      height: 33px;

      background: #ffffff;
      color: #000;

      &:hover {
        background: #332923;
        color: #fddb8b;
      }

      &:hover:after {
        content: "Send";
      }

      &:after {
        content: "Select";
      }
    `}
`;
export default Button;
