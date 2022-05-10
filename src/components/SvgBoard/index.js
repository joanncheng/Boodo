import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './SvgBoard.styled';
import { selectTool } from '../../redux/activeTool';
import { drawElement } from '../../utils';
import { TEXTAREA_LINE_HEIGHT } from '../../config';

const convertToSVGCoord = ({ x, y }, svg) => {
  const clientPoint = svg.createSVGPoint();
  clientPoint.x = x;
  clientPoint.y = y;
  const CTM = svg.current.getScreenCTM();
  const SVGPoint = clientPoint.matrixTransform(CTM.inverse());
  return { x: SVGPoint.x, y: SVGPoint.y };
};

const SvgBoard = forwardRef((props, ref) => {
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
  } = props;
  const dispatch = useDispatch();

  const [currentValue, setCurrentValue] = useState('');
  const [SVGSize, setSVGSize] = useState({
    width: 960,
    height: 540,
  });
  const [viewBoxOrigin, setViewBoxOrigin] = useState({ x: 0, y: 0 });

  const textareaRef = useRef(null);

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
  }, [currentValue]);

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
          onChange={e => setCurrentValue(e.target.value)}
        />
      ) : null}
      <S.SVGCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        viewBox={`${viewBoxOrigin.x} ${viewBoxOrigin.y} ${
          (1 / SVGSizeRatio) * SVGSize.width
        } ${(1 / SVGSizeRatio) * SVGSize.height}`}
        preserveAspectRatio="xMidYMid meet"
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
