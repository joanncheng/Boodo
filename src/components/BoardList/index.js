import React from 'react';
import { useSelector } from 'react-redux';
import * as S from './BoardList.styled';
import { Container as GSContainer } from '../GlobalStyles';
import BoardCard from '../BoardCard';
import Loader from '../Loader';

const BoardList = ({ boards, createBoard, deleteBoard }) => {
  const user = useSelector(state => state.user);

  const renderedBoardCards = () => {
    if (!boards) return null;

    return Object.keys(boards).map(boardId => {
      const lastModifiedAt = new Date(
        boards[boardId].modifiedAt
      ).toLocaleString();

      const modifiedBy =
        boards[boardId].modifiedBy === user.email.split('@')[0]
          ? 'me'
          : boards[boardId].modifiedBy;

      return (
        <BoardCard
          key={boardId}
          boardId={boardId}
          boardName={boards[boardId].boardName}
          deleteBoard={deleteBoard}
          lastModifiedAt={lastModifiedAt}
          modifiedBy={modifiedBy}
        />
      );
    });
  };

  return (
    <S.BoardsSec>
      <GSContainer>
        <S.HeaderContainer>
          <S.HeaderWrapper>
            <S.HeaderIcon />
            <S.BoardsHeader>My Boards</S.BoardsHeader>
          </S.HeaderWrapper>
          <S.CreateBtn onClick={createBoard}>
            &#43;&nbsp; Create New Board
          </S.CreateBtn>
        </S.HeaderContainer>
        <S.BoardCardsContainer>
          {!user || boards === undefined ? (
            <Loader fontColor="#343a40" />
          ) : (
            renderedBoardCards()
          )}
        </S.BoardCardsContainer>
      </GSContainer>
    </S.BoardsSec>
  );
};

export default BoardList;
