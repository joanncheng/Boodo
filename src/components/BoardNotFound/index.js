import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './BoardNotFound.styled';

const BoardNotFound = () => {
  return (
    <S.Container>
      <Link to="/">
        <S.Header>
          <S.Logo />
        </S.Header>
      </Link>
      <S.ContentWrapper>
        <S.ContentTop>Sorry</S.ContentTop>
        <S.ContentBottom>
          <h2>Page is not found.</h2>
          <Link to="/myBoards">
            <S.ActionBtn>Back to Boards</S.ActionBtn>
          </Link>
        </S.ContentBottom>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default BoardNotFound;
