import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import * as S from './BottomToolbar.styled';
import CollabModal from '../Modal/CollabModal';

import CollaborationIcon from '../../../public/images/icons/collaboration.svg';

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
      <S.ToolTypeButton
        title="Live collaboration"
        onClick={() => setModalOpen(true)}
        collab={collaborators.length > 1 ? true : false}
      >
        <S.ToolIcon>
          <CollaborationIcon />
        </S.ToolIcon>
        {collaborators.length > 1 && (
          <S.Number>{collaborators.length}</S.Number>
        )}
      </S.ToolTypeButton>
    </>
  );
};

export default CollabBtn;
