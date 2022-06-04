import React from 'react';
import { FaBars } from 'react-icons/fa';
import * as S from './Navbar.styled';
import { Button as GSButton } from '../GlobalStyles';

const NavBar = ({ toggle, user }) => {
  return (
    <S.Nav>
      <S.NavbarContainer>
        <S.NavLogo to="hero" smooth={true} duration={500} exact="true">
          <S.LogoIcon />
        </S.NavLogo>
        <S.MobileIcon onClick={toggle}>
          <FaBars />
        </S.MobileIcon>
        <S.NavMenu onClick={toggle}>
          <S.NavItem>
            <S.NavLinks
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              About
            </S.NavLinks>
          </S.NavItem>
          <S.NavItem>
            <S.NavLinks
              to="features"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              Features
            </S.NavLinks>
          </S.NavItem>
          <S.NavItemBtn>
            {user ? (
              <S.NavBtnLink to={`/myBoards`}>
                <GSButton>Go to boards</GSButton>
              </S.NavBtnLink>
            ) : (
              <S.NavBtnLink to="/signin">
                <GSButton>Sign In</GSButton>
              </S.NavBtnLink>
            )}
          </S.NavItemBtn>
        </S.NavMenu>
      </S.NavbarContainer>
    </S.Nav>
  );
};

export default NavBar;
