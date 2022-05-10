import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './SvgBoard.styled';
import { selectTool } from '../../redux/activeTool';
import { drawElement } from '../../utils';
import { TEXTAREA_LINE_HEIGHT } from '../../config';

const SvgBoard = forwardRef((props, svgRef) => {
  const {
    brushColor,
    action,
    setAction,
    selectedElement,
    setSelectedElement,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    updateElement,
    elements,
    SVGSizeRatio,
    resizeCanvas,
    viewBoxCoords,
  } = props;
  const dispatch = useDispatch();

  const [currentTextareaValue, setCurrentTextareaValue] = useState('');
  const [SVGSize, setSVGSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setSVGSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [SVGSize]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (action === 'writing') {
      textarea.focus();
      textarea.value = selectedElement.text;
      textarea.style.height =
        textarea.value.split('\n').length * TEXTAREA_LINE_HEIGHT + 'px';
    }
  }, [action, selectedElement]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = textarea.scrollHeight + 'px';
  }, [currentTextareaValue]);

  const handleBlur = e => {
    if (!e.target.value && textareaRef.current) {
      textareaRef.current.focus();
      return;
    }

    const { id, x1, y1, type, options } = selectedElement;
    setAction('none');
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, type, {
      ...options,
      text: e.target.value,
    });
    dispatch(selectTool('selection'));
  };

  return (
    <>
      {action === 'writing' ? (
        <S.TextArea
          ref={textareaRef}
          onBlur={handleBlur}
          style={{
            position: 'fixed',
            top: selectedElement.y1 - 5,
            left: selectedElement.x1,
            color: brushColor,
          }}
          onChange={e => setCurrentTextareaValue(e.target.value)}
        />
      ) : null}
      <S.SVGCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        viewBox={`${viewBoxCoords.x} ${viewBoxCoords.y} ${
          SVGSize.width / SVGSizeRatio
        } ${SVGSize.height / SVGSizeRatio}`}
        preserveAspectRatio="xMidYMid meet"
        ref={svgRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={e => {
          if (e.ctrlKey) {
            if (e.deltaY > 0) {
              resizeCanvas(-0.01);
            } else if (e.deltaY < 0) {
              resizeCanvas(0.01);
            }
          }
        }}
      >
        {elements &&
          elements.map(element => {
            if (action === 'writing' && selectedElement.id === element.id)
              return;
            return drawElement(element);
          })}
      </S.SVGCanvas>
    </>
  );
});

export default SvgBoard;
