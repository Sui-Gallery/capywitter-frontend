import styled from "styled-components";
import { DesktopIcon } from "./icons";

const AvailabilityTextStyled = styled.div`
  font-size: 11px;
  line-height: 12px;

  color: #0a0a0a;
  display: none;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media screen and (max-width: 650px) {
    display: flex;
  }
`;

const AvailabilityText = () => {
  return (
    <AvailabilityTextStyled>
      <DesktopIcon />
      Capywitter, currently available on only desktop devices.
    </AvailabilityTextStyled>
  );
};

export default AvailabilityText;
