import React from 'react';
import * as S from './BottomToolbar.styled';
import ResetCanvasBtn from '../ResetCanvasBtn';
import CollabBtn from '../CollabBtn';
import SaveAsImageBtn from '../SaveAsImageBtn';

const BottomToolbar = ({
  svgRef,
  setSelectedElement,
  currentBoard,
  resetElements,
}) => {
  return (
    <S.BottomRightStack>
      <S.ToolContainer>
        <SaveAsImageBtn
          svgRef={svgRef}
          setSelectedElement={setSelectedElement}
        />
        <CollabBtn currentBoard={currentBoard} />
        <ResetCanvasBtn resetElements={resetElements} />
      </S.ToolContainer>
    </S.BottomRightStack>
  );
};

export default BottomToolbar;
