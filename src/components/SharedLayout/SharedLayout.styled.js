import { styled } from "styled-components";

export const Box = styled.div`
  display: flex;
  width: 100%;

  @media screen and (min-width: 768px) {
    max-width: 768px;
  }

  @media screen and (min-width: 1280px) {
    max-width: 1280px;
  }
`;
