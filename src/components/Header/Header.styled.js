import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "components/baseStyles/Variables.styled";
import { Container } from "components/baseStyles/CommonStyle.styled";

const HeaderSection = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${theme.colors.headerBlue};
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const Link = styled(NavLink)``;

const Headline = styled.p`
  color: ${theme.colors.white};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  padding: 0 10px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 22px;
    text-align: right;
  }
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 36px;
    padding: 24px 28px 18px;
  }
  & > span {
    text-transform: uppercase;
  }
`;

const HeadLogo = styled.img`
  width: 55px;
  height: 25px;
  margin: 10px;
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: 75px;
    height: 35px;
    margin: 12px;
  }
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 115px;
    height: 49px;
    margin: 14px;
  }
`;

export { HeaderSection, HeaderContainer, Link, Headline, HeadLogo };
