import React from 'react';
import * as S from './BoardCard.styled';
import TrashCanIcon from '../../../public/images/icons/trashCan.svg';

const BoardCard = ({
  boardName,
  boardId,
  setBoardToBeDeleted,
  lastModifiedAt,
  modifiedBy,
}) => {
  return (
    <S.Card to={`/board/${boardId}`}>
      <S.DeleteBtn
        title="Delete board"
        onClick={e => {
          e.preventDefault();
          setBoardToBeDeleted(boardId);
        }}
      >
        <TrashCanIcon />
      </S.DeleteBtn>

      <S.CardImg>
        <S.LogoIcon />
      </S.CardImg>
      <S.BoardName title={boardName}>{boardName}</S.BoardName>
      {lastModifiedAt !== 'Invalid Date' && modifiedBy ? (
        <S.Info>
          <p>
            Modified by: {modifiedBy}
            <br />
            {lastModifiedAt}
          </p>
        </S.Info>
      ) : null}
    </S.Card>
  );
};

export default BoardCard;
