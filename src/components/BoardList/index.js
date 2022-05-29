import React from 'react';
import * as S from './BoardList.styled';
import { Container as GSContainer } from '../GlobalStyles';
import BoardCard from '../BoardCard';
import Loader from '../Loader';

const BoardList = ({
  user,
  boards,
  handleCreateBoard,
  setBoardToBeDeleted,
}) => {
  const renderedBoardCards = () => {
    if (!boards) return null;
    return Object.keys(boards).map(boardId => {
      return (
        <BoardCard
          key={boardId}
          boardId={boardId}
          boardName={boards[boardId].boardName}
          setBoardToBeDeleted={setBoardToBeDeleted}
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
          <S.CreateBtn onClick={handleCreateBoard}>
            &#43;&nbsp; Create New Board
          </S.CreateBtn>
        </S.HeaderContainer>
        <S.BoardCardsContainer>
          {!user ? <Loader fontColor="#343a40" /> : renderedBoardCards()}
        </S.BoardCardsContainer>
      </GSContainer>
    </S.BoardsSec>
  );
};

export default BoardList;
