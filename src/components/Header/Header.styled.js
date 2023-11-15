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
`;

const Link = styled(NavLink)``;

const Headline = styled.p`
  color: ${theme.colors.white};
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  & > span {
    text-transform: uppercase;
  }
`;

export { HeaderSection, HeaderContainer, Link, Headline };
