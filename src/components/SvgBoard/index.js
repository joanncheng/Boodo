import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './SvgBoard.styled';
import { selectTool } from '../../redux/activeTool';
import { drawElement, convertToCanvasCoords } from '../../utils';
import { TEXTAREA_LINE_HEIGHT } from '../../config';

const SvgBoard = forwardRef((props, svgRef) => {
  const {
    action,
    setAction,
    selectedElement,
    setSelectedElement,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    updateElement,
    elements,
    viewBoxSizeRatio,
    resizeCanvas,
    viewBox,
    setViewBox,
  } = props;

  const dispatch = useDispatch();

  const [currentTextareaValue, setCurrentTextareaValue] = useState('');

  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setViewBox({
        ...viewBox,
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewBox.width, viewBox.height]);

  // Textarea height auto resize
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = textarea.scrollHeight + 'px';
  }, [currentTextareaValue]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (action === 'writing') {
      textarea.focus();
      textarea.value = selectedElement.text;
      textarea.style.height =
        textarea.value.split('\n').length * TEXTAREA_LINE_HEIGHT + 'px';
    }
  }, [action, selectedElement]);

  const handleTextareaBlur = e => {
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

  const renderTextarea = () => {
    const x = selectedElement.x1;
    const y = selectedElement.y1 - 5;

    const clientPoint = convertToCanvasCoords({ x, y }, svgRef.current);

    return (
      <S.TextArea
        ref={textareaRef}
        onBlur={handleTextareaBlur}
        style={{
          position: 'fixed',
          top: clientPoint.y,
          left: clientPoint.x,
          color: selectedElement.options.bru,
        }}
        onChange={e => setCurrentTextareaValue(e.target.value)}
      />
    );
  };

  return (
    <>
      {action === 'writing' && renderTextarea()}
      <S.SVGCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        viewBox={`${viewBox.x} ${viewBox.y} ${
          viewBox.width / viewBoxSizeRatio
        } ${viewBox.height / viewBoxSizeRatio}`}
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
