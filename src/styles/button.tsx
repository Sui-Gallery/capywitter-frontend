import styled, { css } from "styled-components";

type ButtonProps = {
  $mode: "feed-button" | "claim-capytoken" | "capytoken-select" | "select-all";
  $selected?: boolean;
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

      ${props?.$selected
        ? css`
            background: #332923;
            color: #fddb8b;
          `
        : css`
            background: #ffffff;
            color: #000;
          `}
    `}
`;
export default Button;
