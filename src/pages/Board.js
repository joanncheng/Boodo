import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ref as storageRef, uploadBytes, getBlob } from 'firebase/storage';
import {
  set,
  ref,
  onValue,
  onDisconnect,
  update,
  serverTimestamp,
} from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { v4 as uuid } from 'uuid';
import { storage, db, auth } from '../firebase';
import useDrawingHistory from '../hooks/useDrawingHistory';
import SvgBoard from '../components/SvgBoard';
import TopToolbar from '../components/TopToolbar';
import BottomLeftToolbar from '../components/BottomToolbar/BottomLeftToolbar';
import BottomRightToolbar from '../components/BottomToolbar/BottomRightToolbar';
import EditorCursors from '../components/EditorCursors';
import Loader from '../components/Loader';
import BoardNotFound from '../components/BoardNotFound';
import { selectOpacity } from '../redux/toolOptions';
import {
  getElementAtPosition,
  createSVGElement,
  setCursorForPosition,
  adjustElementCoordinates,
  isAdjustmentRequired,
  resizeCoordinates,
  convertToSVGCoords,
  getSVGMovement,
} from '../utils';
import {
  IMAGE_MIN_WIDTH,
  IMAGE_DEFAULT_WIDTH,
  ERASER_CURSOR,
  ADD_IMAGE_CURSOR,
} from '../config';
import useZoomGesture from '../hooks/useZoomGesture';

const Board = props => {
  const currentBoard = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const brushColor = useSelector(state => state.toolOptions.brushColor);
  const brushSize = useSelector(state => state.toolOptions.brushSize);
  const fontSize = useSelector(state => state.toolOptions.fontSize);
  const opacity = useSelector(state => state.toolOptions.opacity);
  const user = useSelector(state => state.user);

  // Custom Hook
  const [elements, setElements, undo, redo] = useDrawingHistory([]);
  const [touchEvents, setTouchEvents, zoom] = useZoomGesture([]);

  const [tool, setTool] = useState('selection');
  const [action, setAction] = useState('none');
  const [selectedElement, setSelectedElement] = useState(null);
  const [drawData, setDrawData] = useState(null);

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

  const svgRef = useRef(null);

  // Check user logged in or not
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        try {
          // Listen data changes from db
          onValue(ref(db, `boards/${currentBoard}`), snapshot => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data.elements) {
                const elements = Object.keys(data.elements).map(
                  id => data.elements[`${id}`]
                );
                data.elements = elements;
              }
              setDrawData(data);
            } else {
              setDrawData(undefined);
            }
          });

          // track user connection
          const ownStatusRef = ref(db, `status/${user.uid}`);
          set(ownStatusRef, {
            email: user.email,
            board: currentBoard,
          });
          onDisconnect(ownStatusRef).remove();
        } catch (err) {
          console.error(err);
        }
      } else {
        // Redirect to signin page
        history.push(`/signin/${currentBoard}`);
      }
    });
  }, []);

  useEffect(() => {
    if (!drawData) return;
    if (!drawData.elements) {
      setElements([], 'overwrite');
    } else if (drawData.uploader === user.uid) {
      setElements(drawData.elements, 'overwrite');
    } else {
      setElements(drawData.elements, 'reset');
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

  // Keydown & wheel event
  useEffect(() => {
    if (!drawData) return;

    const handleKeydown = e => {
      if ((action === 'writing' && e.key !== 'Escape') || action === 'renaming')
        return;
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.shiftKey ? handleRedoUndo('redo') : handleRedoUndo('undo');
        return;
      }
      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          if (action !== 'none' || !selectedElement) break;
          deleteElement(selectedElement.id);
          setSelectedElement(null);
          break;
        case 'Escape':
          setAction('none');
          setImageUpload(null);
          setTool('selection');
          dispatch(selectOpacity(1));
          break;
        case '1':
          setTool('selection');
          break;
        case '2':
          setTool('rectangle');
          break;
        case '3':
          setTool('ellipse');
          break;
        case '4':
          setTool('diamond');
          break;
        case '5':
          setTool('line');
          break;
        case '6':
          setTool('pencil');
          break;
        case '7':
          setTool('text');
          break;
        case ' ':
          setAction('movingCanvas');
          break;
      }
    };

    const handleKeyup = e => {
      if (e.key === ' ' || e.code === 'Space') {
        setAction('none');
      }
    };

    const handleWheel = e => {
      e.preventDefault();
      if (e.ctrlKey) {
        if (e.deltaY > 0) {
          resizeCanvas(-0.01);
        } else if (e.deltaY < 0) {
          resizeCanvas(0.01);
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
      window.removeEventListener('wheel', handleWheel, { passive: false });
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
        setElements(elementsCopy, 'overwrite');
        writeDataToDatabase(elementsCopy[index]);
      } else {
        const element = elements.find(el => el.id === selectedElement.id);
        const { id, x1, y1, x2, y2, type, options } = element;
        updateElement(id, x1, y1, x2, y2, type, {
          ...options,
          opacity,
        });
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
    if (!svgRef.current) return;
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

  const writeDataToDatabase = (data, mode = 'updateOne') => {
    const updates = {};

    updates[`boards/${currentBoard}/uploader`] = user.uid;
    updates[`boards/${currentBoard}/modifiedAt`] = serverTimestamp();
    updates[`boards/${currentBoard}/modifiedBy`] = user.email.split('@')[0];

    const id = mode === 'deleteOne' ? data : data.id;

    switch (mode) {
      case 'updateOne':
        updates[`boards/${currentBoard}/elements/${id}`] = data;
        break;
      case 'updateAll':
        updates[`boards/${currentBoard}/elements`] = data;
        break;
      case 'deleteOne':
        updates[`boards/${currentBoard}/elements/${id}`] = null;
        break;
      case 'deleteAll':
        updates[`boards/${currentBoard}/elements`] = null;
        break;
    }
    update(ref(db), updates);
  };

  const renameBoard = name => {
    const updates = {};
    updates[`boards/${currentBoard}/boardName`] = name;
    update(ref(db), updates);
  };

  const handleRedoUndo = action => {
    setSelectedElement(null);
    const elements = action === 'redo' ? redo() : undo();
    if (!elements) return;

    const updatedData = {};
    elements.forEach(element => (updatedData[element.id] = element));
    writeDataToDatabase(updatedData, 'updateAll');
  };

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
    setElements(elementsCopy, 'overwrite');
    writeDataToDatabase(elementsCopy[index]);
  };

  const deleteElement = id => {
    const elementsCopy = elements.filter(element => element.id !== id);
    setElements(elementsCopy);
    writeDataToDatabase(id, 'deleteOne');
  };

  const resetElements = () => {
    setElements([]);
    setSelectedElement(null);
    setViewBoxSizeRatio(1);
    setViewBox({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    writeDataToDatabase('', 'deleteAll');
  };

  // Upload Image to firebase storage
  const uploadImage = async (file, elementId) => {
    const imageRef = storageRef(storage, `images/${elementId}_${file.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      const blob = await getBlob(snapshot.ref);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setUploadedImageData({ url: base64data, elementId });
      };
    } catch (err) {
      console.err(err);
    }
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

  const handlePointerDown = e => {
    if (!drawData || action === 'movingCanvas') return;

    if (action === 'writing') {
      setAction('none');
      setTool('selection');
      return;
    }

    if (e.pointerType === 'touch') {
      setTouchEvents(prevState => [...prevState, e]);
    }
    if (e.pointerType === 'touch' && !e.isPrimary) return;

    const x = e.clientX;
    const y = e.clientY;
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
      // Create svg element
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

  const handlePointerMove = e => {
    if (!drawData) return;

    const x = e.clientX;
    const y = e.clientY;
    const SVGPoint = convertToSVGCoords({ x, y }, svgRef.current);

    //// Touch interaction ////
    if (e.pointerType === 'touch' && tool === 'selection') {
      const touchDownEvent = touchEvents.find(ev => ev.isPrimary);
      if (touchDownEvent) {
        e.movementX = x - touchDownEvent.clientX;
        e.movementY = y - touchDownEvent.clientY;
      }
      const updatedTouchEvent = touchEvents.map(ev =>
        ev.pointerId === e.pointerId ? e : ev
      );
      setTouchEvents(updatedTouchEvent);

      // Zooming in/out canvas
      if (touchEvents.length === 2) {
        if (zoom === 'in') resizeCanvas(0.05);
        if (zoom === 'out') resizeCanvas(-0.05);
        return;
      }
    }

    if (e.pointerType === 'touch' && !e.isPrimary) return;

    // Changing cursor style
    if (tool === 'selection' || tool === 'eraser') {
      const element = getElementAtPosition(SVGPoint.x, SVGPoint.y, elements);
      if (element && action !== 'writing') {
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
        setElements(elementsCopy, 'overwrite');
        writeDataToDatabase(elementsCopy[index]);
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
      const svgMovement = getSVGMovement(
        x,
        y,
        e.movementX,
        e.movementY,
        svgRef.current
      );
      setViewBox({
        ...viewBox,
        x: viewBox.x + svgMovement.dx,
        y: viewBox.y + svgMovement.dy,
      });
    }
  };

  const handlePointerUp = e => {
    if (!drawData) return;

    // Remove the pointer from the touchEvents
    if (e.pointerType === 'touch') {
      setTouchEvents(touchEvents.filter(ev => ev.pointerId !== e.pointerId));

      // Reset diff tracker
      // if (touchEvents.length < 2) setPrevDiff(-1);
    }

    if (action === 'movingCanvas') return setAction('none');
    if (e.pointerType === 'touch' && !e.isPrimary) return;

    const x = e.clientX;
    const y = e.clientY;
    const SVGPoint = convertToSVGCoords({ x, y }, svgRef.current);

    if (selectedElement) {
      if (
        selectedElement.type === 'text' &&
        SVGPoint.x - selectedElement.offsetX === selectedElement.x1 &&
        SVGPoint.y - selectedElement.offsetY === selectedElement.y1
      )
        return setAction('writing');

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

      if (action === 'drawing' || tool === 'image')
        writeDataToDatabase(elements[index]);
    }

    if (action === 'writing') return;
    setAction('none');
    if (tool !== 'pencil') setTool('selection');
  };

  const svgBoardProps = {
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
  };

  if (drawData === undefined) {
    return (
      <>
        <BoardNotFound />
      </>
    );
  }

  return (
    <>
      <TopToolbar
        brushColor={brushColor}
        brushSize={brushSize}
        opacity={opacity}
        tool={tool}
        setTool={setTool}
        action={action}
        setAction={setAction}
        setImageUpload={setImageUpload}
        user={user}
        boardName={drawData ? drawData.boardName : ''}
        renameBoard={renameBoard}
      />
      {!drawData && <Loader fontColor="#343a40" />}
      <SvgBoard ref={svgRef} {...svgBoardProps}></SvgBoard>
      {user && (
        <EditorCursors
          user={user}
          currentBoard={currentBoard}
          svgRef={svgRef}
        />
      )}
      <BottomLeftToolbar
        handleRedoUndo={handleRedoUndo}
        tool={tool}
        setTool={setTool}
        resizeCanvas={resizeCanvas}
        viewBoxSizeRatio={viewBoxSizeRatio}
        setViewBoxSizeRatio={setViewBoxSizeRatio}
      />
      <BottomRightToolbar
        setSelectedElement={setSelectedElement}
        currentBoard={currentBoard}
        resetElements={resetElements}
        svgRef={svgRef}
      />
    </>
  );
};

export default Board;
