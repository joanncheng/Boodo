import React, { useState } from 'react';
import * as S from './BoardCard.styled';
import TrashCanIcon from '../../../public/images/icons/trashCan.svg';
import Modal from '../Modal';

const BoardCard = ({
  boardName,
  boardId,
  deleteBoard,
  lastModifiedAt,
  modifiedBy,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalActions = (
    <>
      <button onClick={() => setModalOpen(false)}>Cancel</button>
      <button className="redBtn" onClick={() => deleteBoard(boardId)}>
        Confirm
      </button>
    </>
  );

  return (
    <>
      {modalOpen ? (
        <Modal
          title="Delete board"
          content={
            <>
              Delete board &nbsp;
              <b>{boardName}</b>
              &nbsp; permanently?
              <br /> This cannot be undone!
            </>
          }
          modalActions={modalActions}
          onDismiss={() => setModalOpen(false)}
        />
      ) : null}
      <S.Card to={`/board/${boardId}`}>
        <S.DeleteBtn
          title="Delete board"
          onClick={e => {
            e.preventDefault();
            setModalOpen(true);
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
    </>
  );
};

export default BoardCard;
