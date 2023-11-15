import React from 'react';
import { HeaderContainer, Link, Headline } from './Header.styled';
import logo from 'images/logo.png';

export const Header = () => {
  return (
    <Header>
      <HeaderContainer>
        <Link to="/">
          <img
            src={logo}
            width="115px"
            height="49px"
            aria-label="Logo"
            loading="lazy"
          />
        </Link>
        <Headline>
          Алгоритм оказания помощи при <span>инсульте в остром периоде</span>
        </Headline>
      </HeaderContainer>
    </Header>
  );
};
