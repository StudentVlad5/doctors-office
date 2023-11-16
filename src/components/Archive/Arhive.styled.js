import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

const Title = styled.h1`
  color: ${theme.colors.black};
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: end;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 36px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 44px;
  }
`;

const Subtitle = styled.h2`
  color: ${theme.colors.black};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: start;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 20px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 28px;
  }
`;

export { Title, Subtitle };
