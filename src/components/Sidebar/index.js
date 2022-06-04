import React from 'react';
import { Link as LinkR } from 'react-router-dom';
import * as S from './Sidebar.styled';
import { Button as GSButton } from '../GlobalStyles';

const Sidebar = ({ isOpen, toggle, user }) => {
  return (
    <S.SidebarContainer isOpen={isOpen} onClick={toggle}>
      <S.Icon onClick={toggle}>
        <S.CloseIcon />
      </S.Icon>
      <S.SidebarWrapper>
        <S.SidebarMenu>
          <S.SidebarLink
            to="about"
            smooth={true}
            duration={500}
            onClick={toggle}
          >
            About
          </S.SidebarLink>
          <S.SidebarLink
            to="features"
            smooth={true}
            duration={500}
            onClick={toggle}
          >
            Features
          </S.SidebarLink>
          <S.SideBtnWrap>
            {user ? (
              <LinkR to="/myBoards">
                <GSButton big fontBig>
                  Go to boards
                </GSButton>
              </LinkR>
            ) : (
              <LinkR to="/signin">
                <GSButton big fontBig>
                  Sign In
                </GSButton>
              </LinkR>
            )}
          </S.SideBtnWrap>
        </S.SidebarMenu>
      </S.SidebarWrapper>
    </S.SidebarContainer>
  );
};

export default Sidebar;
