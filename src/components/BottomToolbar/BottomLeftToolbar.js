import React from 'react';
import Tooltip from '../Tooltip';
import * as S from './BottomToolbar.styled';
import ZoomOutIcon from '../../../public/images/icons/zoomOut.svg';
import ZoomInIcon from '../../../public/images/icons/zoomIn.svg';
import UndoIcon from '../../../public/images/icons/undo.svg';
import RedoIcon from '../../../public/images/icons/redo.svg';
import EraserIcon from '../../../public/images/icons/eraser.svg';

const BottomToolbar = ({
  handleRedoUndo,
  tool,
  setTool,
  viewBoxSizeRatio,
  setViewBoxSizeRatio,
  resizeCanvas,
}) => {
  const toggleEraser = () => {
    if (tool !== 'eraser') {
      setTool('eraser');
    } else {
      setTool('selection');
    }
  };

  const zoomOutCanvas = () => {
    resizeCanvas(-0.1);
  };

  const zoomInCanvas = () => {
    resizeCanvas(0.1);
  };

  return (
    <S.BottomLeftStack>
      <S.ToolContainer>
        <S.ZoomTool>
          <S.ToolTipWrapper>
            <Tooltip content="Reset zoom" position="top">
              <S.ToolTypeButton
                title="Reset zoom"
                onClick={() => setViewBoxSizeRatio(1)}
              >
                <span>{(viewBoxSizeRatio * 100).toFixed(0)} %</span>
              </S.ToolTypeButton>
            </Tooltip>
          </S.ToolTipWrapper>
          <S.ToolTypeButton title="Zoom out" onClick={zoomOutCanvas}>
            <S.ToolIcon>
              <ZoomOutIcon />
            </S.ToolIcon>
          </S.ToolTypeButton>
          <S.ToolTypeButton title="Zoom in" onClick={zoomInCanvas}>
            <S.ToolIcon>
              <ZoomInIcon />
            </S.ToolIcon>
          </S.ToolTypeButton>
        </S.ZoomTool>
        <S.ToolTypeButton title="Undo" onClick={() => handleRedoUndo('undo')}>
          <S.ToolIcon>
            <UndoIcon />
          </S.ToolIcon>
        </S.ToolTypeButton>
        <S.ToolTypeButton title="Redo" onClick={() => handleRedoUndo('redo')}>
          <S.ToolIcon>
            <RedoIcon />
          </S.ToolIcon>
        </S.ToolTypeButton>
        <S.ToolTypeButton
          title="Eraser"
          onClick={toggleEraser}
          active={tool === 'eraser' ? true : false}
        >
          <S.ToolIcon>
            <EraserIcon />
          </S.ToolIcon>
        </S.ToolTypeButton>
      </S.ToolContainer>
    </S.BottomLeftStack>
  );
};

export default BottomToolbar;
