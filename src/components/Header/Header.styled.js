import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Container } from 'components/baseStyles/CommonStyle.styled';
import { NavLink } from 'react-router-dom';

const Header = styled.header`
  width: 100%;
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

export { Header, HeaderContainer, Link, Headline };
