import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import useHistory from '../hooks/useHistory';
import { selectTool } from '../redux/activeTool';
import SvgBoard from '../components/SvgBoard';
import TopToolbar from '../components/TopToolbar';
import BottomLeftToolbar from '../components/BottomToolbar/BottomLeftToolbar';
import BottomRightToolbar from '../components/BottomToolbar/BottomRightToolbar';
import Modal from '../components/Modal';
import {
  getElementAtPosition,
  createSVGElement,
  setCursorForPosition,
  adjustElementCoordinates,
  resizeCoordinates,
  convertToSVGCoords,
} from '../utils';
import {
  IMAGE_MIN_WIDTH,
  IMAGE_DEFAULT_WIDTH,
  ERASER_CURSOR,
  ADD_IMAGE_CURSOR,
} from '../config';

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

  // Upload Image to firebase storage
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadedImageData, setUploadedImageData] = useState(null);

  // Resize canvas
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [viewBoxSizeRatio, setViewBoxSizeRatio] = useState(1);
  const [centerPoint, setCenterPoint] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [spacePressing, setSpacePressing] = useState(false);
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
        setImageUpload(null);
        dispatch(selectTool('selection'));
      }

      if (e.key === ' ') {
        setSpacePressing(true);
      }
    };

    const handleKeyup = e => {
      if (e.key === ' ' || e.code === 'Space') {
        setSpacePressing(false);
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
      case 'image':
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
    setViewBoxSizeRatio(1);
    setModalOpen(false);
  };

  // Upload Image to firebase storage
  const uploadImage = (file, elementId) => {
    const imageRef = ref(storage, `images/${elementId}_${file.name}`);
    uploadBytes(imageRef, file).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
          setUploadedImageData({ url, elementId });
        };
      });
    });
  };

  const handleMouseDown = e => {
    if (action === 'writing') return;

    if (spacePressing) {
      setAction('movingCanvas');
      return;
    }

    const SVGPoint = convertToSVGCoords(
      { x: e.clientX, y: e.clientY },
      svgRef.current
    );

    if (tool === 'eraser') {
      const element = getElementAtPosition(SVGPoint.x, SVGPoint.y, elements);
      if (element) {
        setSelectedElement(element);
        setElements(prevState => prevState);
        setAction('deleting');
      }
      return;
    }

    if (tool === 'selection') {
      const element = getElementAtPosition(SVGPoint.x, SVGPoint.y, elements);
      if (element) {
        if (element.type === 'pencil') {
          const xOffsets = element.points.map(point => SVGPoint.x - point.x);
          const yOffsets = element.points.map(point => SVGPoint.y - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = SVGPoint.x - element.x1;
          const offsetY = SVGPoint.y - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements(prevState => prevState);

        element.position === 'inside'
          ? setAction('moving')
          : setAction('resizing');
      } else {
        setSelectedElement(null);
        setAction('movingCanvas');
      }
    } else {
      const id = uuid();
      const element =
        tool === 'image'
          ? createSVGElement(
              id,
              SVGPoint.x,
              SVGPoint.y,
              SVGPoint.x + IMAGE_DEFAULT_WIDTH,
              SVGPoint.y +
                (imageUpload.height / imageUpload.width) * IMAGE_DEFAULT_WIDTH,
              tool,
              {
                url: imageUpload.originalImageURL,
                selectorDisplay: true,
              }
            )
          : createSVGElement(
              id,
              SVGPoint.x,
              SVGPoint.y,
              SVGPoint.x,
              SVGPoint.y,
              tool,
              { brushColor, brushSize, selectorDisplay: false }
            );
      setElements(prevState => [...prevState, element]);
      setSelectedElement(element);

      if (tool === 'image') {
        uploadImage(imageUpload.file, id);
        setImageUpload(null);
        return;
      }

      tool === 'text' ? setAction('writing') : setAction('drawing');
    }
  };

  const handleMouseMove = e => {
    const SVGPoint = convertToSVGCoords(
      { x: e.clientX, y: e.clientY },
      svgRef.current
    );

    // Changing cursor style
    if (tool === 'selection' || tool === 'eraser') {
      const element = getElementAtPosition(SVGPoint.x, SVGPoint.y, elements);
      if (element) {
        e.target.style.cursor =
          tool === 'selection'
            ? setCursorForPosition(element.position)
            : ERASER_CURSOR;
      } else {
        e.target.style.cursor = 'default';
      }
    } else if (tool === 'image' && imageUpload) {
      e.target.style.cursor = `url('${imageUpload.resizedImageURL}'), ${ADD_IMAGE_CURSOR}`;
    } else {
      e.target.style.cursor = 'crosshair';
    }

    if (action === 'drawing') {
      const { id, x1, y1, options } = selectedElement;
      updateElement(id, x1, y1, SVGPoint.x, SVGPoint.y, tool, options);
    } else if (action === 'moving') {
      if (selectedElement.type === 'pencil') {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: SVGPoint.x - selectedElement.xOffsets[index],
          y: SVGPoint.y - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        const index = elements.findIndex(el => el.id === selectedElement.id);
        elementsCopy[index] = {
          ...elementsCopy[index],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, y1, x2, y2, type, offsetX, offsetY, options } =
          selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = SVGPoint.x - offsetX;
        const newY1 = SVGPoint.y - offsetY;
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          options
        );
      }
    } else if (action === 'resizing') {
      const { id, type, options, position, ...coordinates } = selectedElement;

      const { x1, y1, x2, y2 } = resizeCoordinates(
        SVGPoint.x,
        SVGPoint.y,
        position,
        coordinates
      );
      if (
        type === 'image' &&
        (x2 - x1 < IMAGE_MIN_WIDTH || y2 - y1 < IMAGE_MIN_WIDTH)
      )
        return;
      updateElement(id, x1, y1, x2, y2, type, options);
    } else if (action === 'movingCanvas') {
      e.target.style.cursor = 'grabbing';

      const newSVGPoint = convertToSVGCoords(
        {
          x: e.clientX + e.movementX,
          y: e.clientY + e.movementY,
        },
        svgRef.current
      );

      const delta = {
        dx: SVGPoint.x - newSVGPoint.x,
        dy: SVGPoint.y - newSVGPoint.y,
      };

      setViewBox({
        ...viewBox,
        x: viewBox.x + delta.dx,
        y: viewBox.y + delta.dy,
      });
    }
  };

  const handleMouseUp = e => {
    if (action === 'movingCanvas') {
      setAction('none');
      return;
    }

    const SVGPoint = convertToSVGCoords(
      { x: e.clientX, y: e.clientY },
      svgRef.current
    );

    if (selectedElement) {
      selectedElement.options = {
        ...selectedElement.options,
        selectorDisplay: true,
      };
      if (
        selectedElement.type === 'text' &&
        SVGPoint.x - selectedElement.offsetX === selectedElement.x1 &&
        SVGPoint.y - selectedElement.offsetY === selectedElement.y1
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

      const { id, type, options } = selectedElement;
      if (
        (action === 'drawing' || action === 'resizing') &&
        isAdjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type, options);
      }
    }

    if (uploadedImageData) {
      const { id, x1, y1, x2, y2, type, options } = elements.find(
        el => el.id === uploadedImageData.elementId
      );

      updateElement(id, x1, y1, x2, y2, type, {
        ...options,
        url: uploadedImageData.url,
      });
      setUploadedImageData(null);
    }

    if (action === 'writing' || action === 'loading') return;
    setAction('none');
    if (tool !== 'pencil') dispatch(selectTool('selection'));
  };

  // Resize Canvas
  const resizeCanvas = deltaRatio => {
    if (viewBoxSizeRatio < 0.2) {
      deltaRatio > 0 && setViewBoxSizeRatio(viewBoxSizeRatio + deltaRatio);
    } else if (viewBoxSizeRatio > 2) {
      deltaRatio < 0 && setViewBoxSizeRatio(viewBoxSizeRatio + deltaRatio);
    } else {
      setViewBoxSizeRatio(viewBoxSizeRatio + deltaRatio);
    }
    const newCenterPoint = convertToSVGCoords(
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      svgRef.current
    );
    setCenterPoint(newCenterPoint);
  };

  // Move canvas back to center after resizeCanvas
  useLayoutEffect(() => {
    const newCenterPoint = convertToSVGCoords(
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      svgRef.current
    );
    const delta = {
      dx: centerPoint.x - newCenterPoint.x,
      dy: centerPoint.y - newCenterPoint.y,
    };
    setViewBox({
      ...viewBox,
      x: viewBox.x + delta.dx,
      y: viewBox.y + delta.dy,
    });
  }, [viewBoxSizeRatio]);

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
    viewBoxSizeRatio,
    resizeCanvas,
    viewBox,
    setViewBox,
  };

  const modalActions = (
    <>
      <button onClick={() => setModalOpen(false)}>Cancel</button>
      <button className="redBtn" onClick={resetElements}>
        Confirm
      </button>
    </>
  );

  // // Loading files from storage
  // const imageUrlsRef = ref(storage, 'images/');
  // useEffect(() => {
  //   listAll(imageUrlsRef).then(res => {
  //     res.items.forEach(item => {
  //       getDownloadURL(item).then(url => {
  //         setImageUrls(prev => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <>
      <TopToolbar
        brushColor={brushColor}
        brushSize={brushSize}
        tool={tool}
        setImageUpload={setImageUpload}
      />
      <SvgBoard ref={svgRef} {...svgBoardProps}></SvgBoard>
      <BottomLeftToolbar
        undo={undo}
        redo={redo}
        tool={tool}
        resizeCanvas={resizeCanvas}
        viewBoxSizeRatio={viewBoxSizeRatio}
        setViewBoxSizeRatio={setViewBoxSizeRatio}
      />
      <BottomRightToolbar setModalOpen={setModalOpen} />
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
