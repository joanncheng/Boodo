import React, { forwardRef, useRef, useEffect, useState } from 'react';
import * as S from './SvgBoard.styled';
import { drawElement, convertToCanvasCoords } from '../../utils';
import SelectedBox from '../SelectedBox';
import { TEXTAREA_Y_OFFSET_RATIO } from '../../config';

const SvgBoard = forwardRef((props, svgRef) => {
  const {
    action,
    selectedElement,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    elements,
    updateElement,
    viewBoxSizeRatio,
    viewBox,
    setViewBox,
  } = props;

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
    textarea.style.width = textarea.scrollWidth + 'px';
  }, [currentTextareaValue]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && action === 'writing') {
      textarea.focus();
      const {
        x1,
        x2,
        options: { fontSize, text },
      } = selectedElement;
      textarea.value = text;
      textarea.style.width = x2 - x1 + 'px';
      textarea.style.height =
        textarea.value.split('\n').length * fontSize * 1.3 + 'px';
    }
  }, [action, selectedElement]);

  const handleTextareaBlur = e => {
    if (!e.target.value && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTextareaChange = e => {
    setCurrentTextareaValue(e.target.value);
    const { id, x1, y1, type, options } = selectedElement;
    updateElement(id, x1, y1, null, null, type, {
      ...options,
      text: e.target.value,
    });
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
          top: clientPoint.y - 5,
          left: clientPoint.x,
          color: selectedElement.options.brushColor,
          fontSize: size,
          opacity: selectedElement.options.opacity,
        }}
        onChange={handleTextareaChange}
      />
    );
  };

  return (
    <>
      {action === 'writing' && renderTextarea()}
      <S.SVGCanvas
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={window.innerWidth}
        height={window.innerHeight}
        viewBox={`${viewBox.x} ${viewBox.y} ${
          viewBox.width / viewBoxSizeRatio
        } ${viewBox.height / viewBoxSizeRatio}`}
        preserveAspectRatio="xMidYMid meet"
        ref={svgRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <defs>
          <style type="text/css">
            {`@font-face {font-family: Gochi Hand;src: url('https://fonts.gstatic.com/s/gochihand/v16/hES06XlsOjtJsgCkx1Pkfon_-18kTWE.woff2');}`}
          </style>
        </defs>
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
