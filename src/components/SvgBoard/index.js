import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './SvgBoard.styled';
import { selectTool } from '../../redux/activeTool';
import { drawElement, convertToCanvasCoords } from '../../utils';
import SelectedBox from '../SelectedBox';
import { TEXTAREA_Y_OFFSET_RATIO } from '../../config';

const SvgBoard = forwardRef((props, svgRef) => {
  const {
    action,
    setAction,
    selectedElement,
    setSelectedElement,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    elements,
    updateElement,
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
    if (textarea && action === 'writing') {
      textarea.focus();
      textarea.value = selectedElement.options.text;
      textarea.style.height =
        textarea.value.split('\n').length * selectedElement.options.fontSize +
        'px';
    }
  }, [action, selectedElement]);

  const handleTextareaBlur = e => {
    if (!e.target.value && textareaRef.current) {
      textareaRef.current.focus();
      return;
    }

    const { id, x1, y1, type, options } = selectedElement;
    setAction('none');
    updateElement(id, x1, y1, null, null, type, {
      ...options,
      text: e.target.value,
    });
    dispatch(selectTool('selection'));
  };

  const renderTextarea = () => {
    if (!selectedElement) return;
    const x = selectedElement.x1;
    const y =
      selectedElement.y1 -
      selectedElement.options.fontSize / TEXTAREA_Y_OFFSET_RATIO;
    const size = selectedElement.options.fontSize;
    const clientPoint = convertToCanvasCoords({ x, y }, svgRef.current);

    return (
      <S.TextArea
        ref={textareaRef}
        onBlur={handleTextareaBlur}
        style={{
          position: 'fixed',
          top: clientPoint.y,
          left: clientPoint.x,
          color: selectedElement.options.brushColor,
          fontSize: size,
          opacity: selectedElement.options.opacity,
        }}
        onChange={e => setCurrentTextareaValue(e.target.value)}
      />
    );
  };

  return (
    <>
      {action === 'writing' && renderTextarea()}
      <S.SVGCanvas
        xmlns="http://www.w3.org/2000/svg"
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
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
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
            if (action === 'writing' && element.id === selectedElement.id)
              return;
            return drawElement(element);
          })}
        {selectedElement &&
          action !== 'drawing' &&
          action !== 'writing' &&
          elements.map(element =>
            element.id === selectedElement.id ? (
              <SelectedBox key={`selector-${element.id}`} element={element} />
            ) : null
          )}
      </S.SVGCanvas>
    </>
  );
});

export default SvgBoard;
