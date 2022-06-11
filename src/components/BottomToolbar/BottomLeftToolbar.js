import React from 'react';
import Tooltip from '../Tooltip';
import * as S from './BottomToolbar.styled';
import BottomToolbarBtn from '../BottomToolbarBtn';
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

  return (
    <S.BottomLeftStack>
      <S.ToolContainer>
        <S.ZoomTool>
          <S.ToolTipWrapper>
            <Tooltip content="Reset zoom" position="top">
              <BottomToolbarBtn
                title="Reset zoom"
                handler={() => setViewBoxSizeRatio(1)}
              >
                <span>{(viewBoxSizeRatio * 100).toFixed(0)} %</span>
              </BottomToolbarBtn>
            </Tooltip>
          </S.ToolTipWrapper>
          <BottomToolbarBtn title="Zoom out" handler={() => resizeCanvas(-0.1)}>
            <ZoomOutIcon />
          </BottomToolbarBtn>
          <BottomToolbarBtn title="Zoom in" handler={() => resizeCanvas(0.1)}>
            <ZoomInIcon />
          </BottomToolbarBtn>
        </S.ZoomTool>
        <BottomToolbarBtn title="Undo" handler={() => handleRedoUndo('undo')}>
          <UndoIcon />
        </BottomToolbarBtn>
        <BottomToolbarBtn title="Redo" handler={() => handleRedoUndo('redo')}>
          <RedoIcon />
        </BottomToolbarBtn>
        <BottomToolbarBtn
          title="Eraser"
          handler={toggleEraser}
          active={tool === 'eraser' ? true : false}
        >
          <EraserIcon />
        </BottomToolbarBtn>
      </S.ToolContainer>
    </S.BottomLeftStack>
  );
};

export default BottomToolbar;
