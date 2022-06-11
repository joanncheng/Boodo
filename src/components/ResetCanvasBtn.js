import React, { useState } from 'react';
import TrashCanIcon from '../../public/images/icons/trashCan.svg';
import Modal from './Modal';
import BottomToolbarBtn from './BottomToolbarBtn';

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
      <BottomToolbarBtn
        title="Reset the canvas"
        handler={() => setModalOpen(true)}
      >
        <TrashCanIcon />
      </BottomToolbarBtn>
    </>
  );
};

export default ResetCanvasBtn;
