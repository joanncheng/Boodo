import React from 'react';
import * as S from './BottomToolbar.styled';
import SaveFileIcon from '../../../public/images/icons/saveFile.svg';
import CollaborationIcon from '../../../public/images/icons/collaboration.svg';
import TrashCanIcon from '../../../public/images/icons/trashCan.svg';

const BottomToolbar = ({ setClearCanvasModalOpen, setSaveImageModalOpen }) => {
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
        <S.ToolTypeButton title="Live collaboration">
          <S.ToolIcon>
            <CollaborationIcon />
          </S.ToolIcon>
        </S.ToolTypeButton>
        <S.ToolTypeButton
          title="Reset the canvas"
          onClick={() => setClearCanvasModalOpen(true)}
        >
          <S.ToolIcon>
            <TrashCanIcon />
          </S.ToolIcon>
        </S.ToolTypeButton>
        <S.LogoLink to="/">LOGO</S.LogoLink>
      </S.ToolContainer>
    </S.BottomRightStack>
  );
};

export default BottomToolbar;
