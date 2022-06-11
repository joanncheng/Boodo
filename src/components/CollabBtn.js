import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import CollabModal from './Modal/CollabModal';
import CollaborationIcon from '../../public/images/icons/collaboration.svg';
import BottomToolbarBtn from './BottomToolbarBtn';

const CollabBtn = ({ currentBoard }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    onValue(ref(db, `status/`), snapshot => {
      const allStatus = snapshot.val();
      if (!allStatus) return;
      const editors = Object.keys(allStatus)
        .map(key => allStatus[key])
        .filter(({ board }) => board === currentBoard);
      setCollaborators(editors);
    });
  }, []);

  return (
    <>
      {modalOpen ? <CollabModal onDismiss={() => setModalOpen(false)} /> : null}
      <BottomToolbarBtn
        title="Live collaboration"
        handler={() => setModalOpen(true)}
        collab={collaborators.length > 1 ? collaborators.length : false}
      >
        <CollaborationIcon />
      </BottomToolbarBtn>
    </>
  );
};

export default CollabBtn;
