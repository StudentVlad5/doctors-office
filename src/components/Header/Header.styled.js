import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { theme } from 'components/baseStyles/Variables.styled';
import { Container } from 'components/baseStyles/CommonStyle.styled';

const HeaderSection = styled.header`
  width: 100vw;
  background: ${theme.colors.headerBlue};
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Link = styled(NavLink)``;

const Headline = styled.p`
  color: ${theme.colors.white};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: end;

  & > span {
    text-transform: uppercase;
  }

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 30px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 36px;
  }
`;

export { HeaderSection, HeaderContainer, Link, Headline };
