import React, { useState } from 'react';
import * as S from './BottomToolbar.styled';
import TrashCanIcon from '../../../public/images/icons/trashCan.svg';
import Modal from '../Modal';

const ResetCanvasBtn = ({ resetElements }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const resetCanvas = () => {
    resetElements();
    setModalOpen(false);
  };

  const modalActions = (
    <>
      <button onClick={() => setModalOpen(false)}>Cancel</button>
      <button className="redBtn" onClick={resetCanvas}>
        Confirm
      </button>
    </>
  );

  return (
    <>
      {modalOpen ? (
        <Modal
          title="Clear Canvas"
          content={
            <>
              This will clear the whole canvas.
              <br /> Are you sure?
            </>
          }
          modalActions={modalActions}
          onDismiss={() => setModalOpen(false)}
        />
      ) : null}
      <S.ToolTypeButton
        title="Reset the canvas"
        onClick={() => setModalOpen(true)}
      >
        <S.ToolIcon>
          <TrashCanIcon />
        </S.ToolIcon>
      </S.ToolTypeButton>
    </>
  );
};

export default ResetCanvasBtn;
