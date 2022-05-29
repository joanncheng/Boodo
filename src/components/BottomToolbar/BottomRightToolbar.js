import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import * as S from './BottomToolbar.styled';
import SaveFileIcon from '../../../public/images/icons/saveFile.svg';
import CollaborationIcon from '../../../public/images/icons/collaboration.svg';
import TrashCanIcon from '../../../public/images/icons/trashCan.svg';

const BottomToolbar = ({
  setClearCanvasModalOpen,
  setSaveImageModalOpen,
  setCollabModalOpen,
  currentBoard,
}) => {
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
    <S.BottomRightStack>
      <S.ToolContainer>
        <S.ToolTypeButton
          title="Save as image"
          onClick={() => setSaveImageModalOpen(true)}
        >
          <S.ToolIcon>
            <SaveFileIcon />
          </S.ToolIcon>
        </S.ToolTypeButton>
        <S.ToolTypeButton
          title="Live collaboration"
          onClick={() => setCollabModalOpen(true)}
          collab={collaborators.length > 1 ? true : false}
        >
          <S.ToolIcon>
            <CollaborationIcon />
          </S.ToolIcon>
          {collaborators.length > 1 && (
            <S.Number>{collaborators.length}</S.Number>
          )}
        </S.ToolTypeButton>
        <S.ToolTypeButton
          title="Reset the canvas"
          onClick={() => setClearCanvasModalOpen(true)}
        >
          <S.ToolIcon>
            <TrashCanIcon />
          </S.ToolIcon>
        </S.ToolTypeButton>
      </S.ToolContainer>
    </S.BottomRightStack>
  );
};

export default BottomToolbar;
