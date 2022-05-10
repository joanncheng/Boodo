import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import useHistory from '../hooks/useHistory';
import { selectTool } from '../redux/activeTool';
import SvgBoard from '../components/SvgBoard';
import TopToolbar from '../components/TopToolbar';
import BottomToolbar from '../components/BottomToolbar';
import Modal from '../components/Modal';
import {
  getElementAtPosition,
  createSVGElement,
  setCursorForPosition,
  adjustElementCoordinates,
  resizeCoordinates,
  convertToSVGCoords,
} from '../utils';

const isAdjustmentRequired = type =>
  ['line', 'rectangle', 'ellipse'].includes(type);

const Board = () => {
  const dispatch = useDispatch();
  const tool = useSelector(state => state.activeTool);
  const brushColor = useSelector(state => state.brushOptions.color);
  const brushSize = useSelector(state => state.brushOptions.size);

  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState('none');
  const [selectedElement, setSelectedElement] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const svgRef = useRef(null);

  // Keydown event
  useEffect(() => {
    const handleKeydown = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }

      if (e.key === 'Delete' || (e.key === 'Backspace' && action === 'none')) {
        if (selectedElement) {
          deleteElement(selectedElement.id);
          setSelectedElement(null);
        }
      }

      if (e.key === 'Escape') {
        setAction('none');
        dispatch(selectTool('selection'));
      }

      if (e.key === ' ') {
        setAction('movingCanvas');
      }
    };

    const handleKeyup = e => {
      if (e.key === ' ' || e.code === 'Space') {
        console.log(e);
        setAction('none');
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  });

  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];
    const index = elements.findIndex(el => el.id === id);

    switch (type) {
      case 'line':
      case 'rectangle':
      case 'ellipse':
        elementsCopy[index] = createSVGElement(
          id,
          x1,
          y1,
          x2,
          y2,
          type,
          options
        );
        break;
      case 'pencil':
        elementsCopy[index].points = [
          ...elementsCopy[index].points,
          { x: x2, y: y2 },
        ];
        break;
      case 'text':
        if (!options.text || options.text === ' ') return;

        elementsCopy[index] = {
          ...createSVGElement(id, x1, y1, x2, y2, type, options),
          text: options.text,
        };
        break;
      default:
        throw new Error(`Type not recognized: ${type}`);
    }
    setElements(elementsCopy, true);
  };

  const deleteElement = id => {
    const elementsCopy = elements.filter(element => element.id !== id);
    setElements(elementsCopy);
  };

  const resetElements = () => {
    setElements([]);
    setModalOpen(false);
  };

  const handleMouseDown = e => {
    if (action === 'writing' || action === 'movingCanvas') return;

    const { clientX, clientY } = e;
    if (tool === 'eraser') {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        setSelectedElement(element);
        setElements(prevState => prevState);
        setAction('deleting');
      }
      return;
    }

    if (tool === 'selection') {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        if (element.type === 'pencil') {
          const xOffsets = element.points.map(point => clientX - point.x);
          const yOffsets = element.points.map(point => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements(prevState => prevState);

        element.position === 'inside'
          ? setAction('moving')
          : setAction('resizing');
      } else {
        setSelectedElement(null);
      }
    } else {
      const id = uuid();
      const element = createSVGElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool,
        { brushColor, brushSize }
      );
      setElements(prevState => [...prevState, element]);
      setSelectedElement(element);

      setAction(tool === 'text' ? 'writing' : 'drawing');
    }
  };

  const [viewBoxCoords, setViewBoxCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = e => {
    const { clientX, clientY } = e;

    // Changing cursor style
    if (tool === 'selection') {
      const element = getElementAtPosition(clientX, clientY, elements);
      e.target.style.cursor = element
        ? setCursorForPosition(element.position)
        : 'default';
    } else if (tool === 'eraser') {
      const element = getElementAtPosition(clientX, clientY, elements);
      e.target.style.cursor = element
        ? `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAANxJREFUOE9jZKAyYKSyeQzDw8BwBgYGDWjQ3GBgYFiJL5jweTmCm5t7qoqKCquxsTEvyJCzZ89+vnPnzu+vX79mMzAwrMBmMC4DI9TV1bvKyspkk5KSUPTNmzePoaur6/HNmzfLsBmK1UBubu63kyZNEkI3DGYyyNC8vLx3X79+FUZ3JTYDw/X19WdfuHAB7E1cwMDA4PPFixdT0cMUm4H1SUlJDXPnzsWbRJOTkxnmzZvXwMDA0IiskC4GUt3LDNSOFFCQUDfZQAOZqgkbOeKolvXIKtmGR/FFktcB1O1uFZ6gYH4AAAAASUVORK5CYII='),
      crosshair`
        : 'default';
    } else {
      e.target.style.cursor = 'crosshair';
    }

    if (action === 'drawing') {
      const { id, x1, y1 } = selectedElement;
      updateElement(id, x1, y1, clientX, clientY, tool, {
        brushColor,
        brushSize,
      });
    } else if (action === 'moving') {
      if (selectedElement.type === 'pencil') {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        const index = elements.findIndex(el => el.id === selectedElement.id);
        elementsCopy[index] = {
          ...elementsCopy[index],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else if (selectedElement.type === 'text') {
        const { id, x1, y1, x2, y2, type, offsetX, offsetY, color, text } =
          selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type, {
          brushColor,
          brushSize,
          text,
        });
      } else {
        const { id, x1, y1, x2, y2, type, offsetX, offsetY, roughElement } =
          selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type, {
          brushColor: roughElement.options.stroke,
          brushSize: roughElement.options.strokeWidth,
        });
      }
    } else if (action === 'resizing') {
      const { id, type, roughElement, position, ...coordinates } =
        selectedElement;
      const { x1, y1, x2, y2 } = resizeCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type, {
        brushColor: roughElement.options.stroke,
        brushSize: roughElement.options.strokeWidth,
      });
    } else if (action === 'movingCanvas') {
      e.target.style.cursor = 'grab';
      const clientSVGCoords = convertToSVGCoords(
        {
          x: e.clientX,
          y: e.clientY,
        },
        svgRef.current
      );

      const newSVGCoords = convertToSVGCoords(
        {
          x: e.clientX + e.movementX,
          y: e.clientY + e.movementY,
        },
        svgRef.current
      );

      const svgMovement = {
        dx: newSVGCoords.x - clientSVGCoords.x,
        dy: newSVGCoords.y - clientSVGCoords.y,
      };

      setViewBoxCoords({
        x: viewBoxCoords.x - svgMovement.dx,
        y: viewBoxCoords.y - svgMovement.dy,
      });
    }
  };

  const handleMouseUp = e => {
    if (action === 'movingCanvas') {
      setAction('none');
      return;
    }

    const { clientX, clientY } = e;

    if (selectedElement) {
      if (
        selectedElement.type === 'text' &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction('writing');
        return;
      }

      if (action === 'deleting') {
        deleteElement(selectedElement.id);
        setSelectedElement(null);
        setAction('none');
        return;
      }

      const index = elements.findIndex(el => el.id === selectedElement.id);

      const { id, type, roughElement } = selectedElement;
      if (
        (action === 'drawing' || action === 'resizing') &&
        isAdjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type, {
          brushColor: roughElement.options.stroke,
          brushSize: roughElement.options.strokeWidth,
        });
      }
    }
    if (action === 'writing') return;

    setAction('none');
    if (tool !== 'pencil') dispatch(selectTool('selection'));
  };

  // Resize Canvas
  const [SVGSizeRatio, setSVGSizeRatio] = useState(1);

  const resizeCanvas = deltaRatio => {
    if (SVGSizeRatio < 0.2) {
      deltaRatio > 0 && setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    } else if (SVGSizeRatio > 2) {
      deltaRatio < 0 && setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    } else {
      setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    }
  };

  const svgBoardProps = {
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
  };

  const modalActions = (
    <>
      <button onClick={() => setModalOpen(false)}>Cancel</button>
      <button className="redBtn" onClick={resetElements}>
        Confirm
      </button>
    </>
  );

  return (
    <>
      <TopToolbar brushColor={brushColor} brushSize={brushSize} tool={tool} />
      <SvgBoard ref={svgRef} {...svgBoardProps}></SvgBoard>
      <BottomToolbar
        undo={undo}
        redo={redo}
        tool={tool}
        setModalOpen={setModalOpen}
        SVGSizeRatio={SVGSizeRatio}
        resizeCanvas={resizeCanvas}
        setSVGSizeRatio={setSVGSizeRatio}
      />
      {modalOpen ? (
        <Modal
          title="Clear Canvas"
          content="This will clear the whole canvas. Are you sure?"
          modalActions={modalActions}
          onDismiss={() => setModalOpen(false)}
        />
      ) : null}
    </>
  );
};

export default Board;
