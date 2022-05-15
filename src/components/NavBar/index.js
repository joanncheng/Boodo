import React from 'react';
import { FaBars } from 'react-icons/fa';
import * as S from './Navbar.styled';
import { Button as GSButton } from '../GlobalStyles';

const NavBar = ({ toggle }) => {
  return (
    <S.Nav>
      <S.NavbarContainer>
        <S.NavLogo to="/">
          <S.LogoIcon />
        </S.NavLogo>
        <S.MobileIcon onClick={toggle}>
          <FaBars />
        </S.MobileIcon>
        <S.NavMenu onClick={toggle}>
          <S.NavItem>
            <S.NavLinks to="about">About</S.NavLinks>
          </S.NavItem>
          <S.NavItem>
            <S.NavLinks to="discover">Discover</S.NavLinks>
          </S.NavItem>
          <S.NavItem>
            <S.NavLinks to="services">Services</S.NavLinks>
          </S.NavItem>
          <S.NavItemBtn>
            <S.NavBtnLink to="/signin">
              <GSButton>Sign In</GSButton>
            </S.NavBtnLink>
          </S.NavItemBtn>
        </S.NavMenu>
      </S.NavbarContainer>
    </S.Nav>
  );
};

export default NavBar;
