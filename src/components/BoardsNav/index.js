import React from 'react';
import { useSelector } from 'react-redux';
import AvatarIcon from '../../../public/images/icons/avatar.svg';
import * as S from './BoardsNav.styled';

const BoardsNav = ({ handleSignOut }) => {
  const user = useSelector(state => state.user);

  return (
    <S.Nav>
      <S.NavbarContainer>
        <S.NavLogo to="/">
          <S.LogoIcon />
        </S.NavLogo>
        <S.UserInfoWrapper>
          <S.UserIcon>
            <AvatarIcon />
          </S.UserIcon>
          <p>{user && user.email}</p>
          <S.LogoutBtn title="Sign out" onClick={handleSignOut} />
        </S.UserInfoWrapper>
      </S.NavbarContainer>
    </S.Nav>
  );
};

export default BoardsNav;
