import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { set, ref, onValue, onDisconnect } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { useUser, useDatabaseListData } from 'reactfire';
import { v4 as uuid } from 'uuid';
import { storage, db, auth } from '../firebase';
import useDrawingHistory from '../hooks/useDrawingHistory';
import SvgBoard from '../components/SvgBoard';
import TopToolbar from '../components/TopToolbar';
import BottomLeftToolbar from '../components/BottomToolbar/BottomLeftToolbar';
import BottomRightToolbar from '../components/BottomToolbar/BottomRightToolbar';
import EditorCursors from '../components/EditorCursors';
import Modal from '../components/Modal';
import CollabModal from '../components/Modal/CollabModal';
import Loader from '../components/Loader';
import { selectTool } from '../redux/activeTool';
import { selectOpacity } from '../redux/toolOptions';
import {
  getElementAtPosition,
  createSVGElement,
  setCursorForPosition,
  adjustElementCoordinates,
  isAdjustmentRequired,
  resizeCoordinates,
  convertToSVGCoords,
  imageSaver,
} from '../utils';
import {
  IMAGE_MIN_WIDTH,
  IMAGE_DEFAULT_WIDTH,
  ERASER_CURSOR,
  ADD_IMAGE_CURSOR,
} from '../config';

const Board = props => {
  const currentBoard = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const tool = useSelector(state => state.activeTool);
  const brushColor = useSelector(state => state.toolOptions.brushColor);
  const brushSize = useSelector(state => state.toolOptions.brushSize);
  const fontSize = useSelector(state => state.toolOptions.fontSize);
  const opacity = useSelector(state => state.toolOptions.opacity);
  const { data: user } = useUser();

  const [elements, setElements, undo, redo] = useDrawingHistory([]);
  const [action, setAction] = useState('none');
  const [selectedElement, setSelectedElement] = useState(null);
  const [drawData, setDrawData] = useState(null);

  // Control modal
  const [clearCanvasModalOpen, setClearCanvasModalOpen] = useState(false);
  const [saveImageModalOpen, setSaveImageModalOpen] = useState(false);
  const [collabModalOpen, setCollabModalOpen] = useState(false);

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

  // Listen data changes from db
  const { status } = useDatabaseListData(ref(db, `boards/${currentBoard}`));
  useEffect(() => {
    onValue(ref(db, `boards/${currentBoard}`), snapshot => {
      const data = snapshot.val();
      setDrawData(data);
    });
  }, []);

  // If user logged in,  track the connection,
  // else redirect to signin page
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const ownStatusRef = ref(db, `status/${user.uid}`);
        set(ownStatusRef, {
          email: user.email,
          board: currentBoard,
        });
        onDisconnect(ownStatusRef).remove();
      } else {
        history.push(`/signin/${currentBoard}`);
      }
    });
  }, []);

  useEffect(() => {
    if (!drawData) {
      setElements([], true);
    } else {
      setElements(drawData, true);
    }
  }, [drawData]);

  // Update image's url after image is uploaded to storage
  useEffect(() => {
    if (uploadedImageData) {
      const element = elements.find(
        el => el.id === uploadedImageData.elementId
      );

      if (!element) return;
      const { id, x1, y1, x2, y2, type, options } = element;
      updateElement(id, x1, y1, x2, y2, type, {
        ...options,
        url: uploadedImageData.url,
      });
      setUploadedImageData(null);
    }
  }, [uploadedImageData]);

  // Keydown event
  useEffect(() => {
    if (status === 'loading') return;

    const handleKeydown = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }

      if (e.key === 'Delete' || (e.key === 'Backspace' && action === 'none')) {
        if (action === 'writing') return;
        if (selectedElement) {
          deleteElement(selectedElement.id);
          setSelectedElement(null);
        }
      }

      if (e.key === 'Escape') {
        setAction('none');
        setImageUpload(null);
        dispatch(selectTool('selection'));
        dispatch(selectOpacity(1));
      }

      if (e.key === ' ') {
        setSpacePressing(true);
      }
    };

    const handleKeyup = e => {
      if (e.key === ' ' || e.code === 'Space') {
        setSpacePressing(false);
      }

      // Write data to database
      set(ref(db, `boards/${currentBoard}`), elements);
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  });

  // Change selectedElement opacity
  useEffect(() => {
    if (!selectedElement) return;

    if (selectedElement.options.opacity !== opacity) {
      if (selectedElement.type === 'pencil') {
        const elementsCopy = [...elements];
        const index = elements.findIndex(el => el.id === selectedElement.id);
        elementsCopy[index] = {
          ...elementsCopy[index],
          options: { ...elementsCopy[index].options, opacity },
        };
        setElements(elementsCopy, true);
      } else {
        const element = elements.find(el => el.id === selectedElement.id);
        const { id, x1, y1, x2, y2, type, options } = element;
        updateElement(id, x1, y1, x2, y2, type, { ...options, opacity });
      }
    }
  }, [opacity]);

  // Reset opacity bar value
  useEffect(() => {
    if (selectedElement) {
      dispatch(selectOpacity(selectedElement.options.opacity));
    } else {
      dispatch(selectOpacity(1));
    }
  }, [selectedElement]);

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

  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];
    const index = elements.findIndex(el => el.id === id);

    switch (type) {
      case 'line':
      case 'rectangle':
      case 'ellipse':
      case 'diamond':
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
    setViewBox({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setClearCanvasModalOpen(false);
  };

  // Upload Image to firebase storage
  const uploadImage = (file, elementId) => {
    const imageRef = storageRef(storage, `images/${elementId}_${file.name}`);
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

  const handleMouseDown = e => {
    if (action === 'writing' || status === 'loading') return;

    if (spacePressing) {
      setAction('movingCanvas');
      return;
    }

    const x = e.type === 'touchstart' ? e.changedTouches[0].clientX : e.clientX;
    const y = e.type === 'touchstart' ? e.changedTouches[0].clientY : e.clientY;
    const SVGPoint = convertToSVGCoords({ x, y }, svgRef.current);

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
      let element;
      if (tool === 'image') {
        element = createSVGElement(
          id,
          SVGPoint.x,
          SVGPoint.y,
          SVGPoint.x + IMAGE_DEFAULT_WIDTH,
          SVGPoint.y +
            (imageUpload.height / imageUpload.width) * IMAGE_DEFAULT_WIDTH,
          tool,
          {
            url: imageUpload.originalImageURL,
            opacity,
          }
        );
      } else if (tool === 'text') {
        element = createSVGElement(
          id,
          SVGPoint.x,
          SVGPoint.y,
          SVGPoint.x,
          SVGPoint.y,
          tool,
          { brushColor, fontSize, opacity }
        );
      } else {
        element = createSVGElement(
          id,
          SVGPoint.x,
          SVGPoint.y,
          SVGPoint.x,
          SVGPoint.y,
          tool,
          { brushColor, brushSize, opacity }
        );
      }

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
    if (status === 'loading') return;

    const x = e.type === 'touchmove' ? e.changedTouches[0].clientX : e.clientX;
    const y = e.type === 'touchmove' ? e.changedTouches[0].clientY : e.clientY;
    const SVGPoint = convertToSVGCoords({ x, y }, svgRef.current);

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
      if (e.type === 'touchmove') return; // FIXME

      e.target.style.cursor = 'grabbing';

      const newSVGPoint = convertToSVGCoords(
        {
          x: x + e.movementX,
          y: y + e.movementY,
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

    // Write data to database
    set(ref(db, `boards/${currentBoard}`), elements);
  };

  const handleMouseUp = e => {
    if (status === 'loading') return;

    if (e.cancelable) e.preventDefault();

    // Write data to database
    set(ref(db, `boards/${currentBoard}`), elements);

    if (action === 'movingCanvas') {
      setAction('none');
      return;
    }

    const x = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const y = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
    const SVGPoint = convertToSVGCoords({ x, y }, svgRef.current);

    if (selectedElement) {
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
    if (action === 'writing') return;
    setAction('none');
    if (tool !== 'pencil') dispatch(selectTool('selection'));
  };

  // Props of Modal component
  const clearCanvasModalActions = (
    <>
      <button onClick={() => setClearCanvasModalOpen(false)}>Cancel</button>
      <button className="redBtn" onClick={resetElements}>
        Confirm
      </button>
    </>
  );

  const saveImageModalActions = (
    <div
      className="buttons"
      onClick={e => {
        const { format } = e.target.dataset;
        format && imageSaver.save(format, svgRef.current);
        setSaveImageModalOpen(false);
      }}
    >
      <button
        className="primaryBtn squareBtn"
        title="Export to PNG"
        data-format="png"
      >
        PNG
      </button>
      <button
        className="redBtn squareBtn"
        title="Export to SVG"
        data-format="svg"
      >
        SVG
      </button>
    </div>
  );

  const svgBoardProps = {
    brushColor,
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
    user,
    currentBoard,
  };

  return (
    <>
      <TopToolbar
        brushColor={brushColor}
        brushSize={brushSize}
        opacity={opacity}
        tool={tool}
        action={action}
        setImageUpload={setImageUpload}
        user={user}
      />
      {status === 'loading' && <Loader />}
      <SvgBoard ref={svgRef} {...svgBoardProps}></SvgBoard>
      {user && (
        <EditorCursors
          user={user}
          currentBoard={currentBoard}
          svgRef={svgRef}
        />
      )}
      <BottomLeftToolbar
        undo={undo}
        redo={redo}
        tool={tool}
        resizeCanvas={resizeCanvas}
        viewBoxSizeRatio={viewBoxSizeRatio}
        setViewBoxSizeRatio={setViewBoxSizeRatio}
      />
      <BottomRightToolbar
        setClearCanvasModalOpen={setClearCanvasModalOpen}
        setSaveImageModalOpen={setSaveImageModalOpen}
        setCollabModalOpen={setCollabModalOpen}
        currentBoard={currentBoard}
      />
      {saveImageModalOpen ? (
        <Modal
          title="Save as image"
          modalActions={saveImageModalActions}
          onDismiss={() => setSaveImageModalOpen(false)}
        />
      ) : null}
      {collabModalOpen ? (
        <CollabModal onDismiss={() => setCollabModalOpen(false)} />
      ) : null}
      {clearCanvasModalOpen ? (
        <Modal
          title="Clear Canvas"
          content="This will clear the whole canvas. Are you sure?"
          modalActions={clearCanvasModalActions}
          onDismiss={() => setClearCanvasModalOpen(false)}
        />
      ) : null}
    </>
  );
};

export default Board;
