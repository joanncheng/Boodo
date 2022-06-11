import { useState } from 'react';

// Track fingers on the touch screen and the diff between two fingers to detect the zoom gesture
const useZoomGesture = initialState => {
  const [touchEvents, setTouchEvents] = useState(initialState);
  const [prevDiff, setPrevDiff] = useState(-1);
  const [zoom, setZoom] = useState('none');

  const setState = action => {
    const newState =
      typeof action === 'function' ? action(touchEvents) : action;

    if (touchEvents.length === 2) {
      const curDiff = Math.abs(touchEvents[0].clientX - touchEvents[1].clientX);
      if (prevDiff > 0) {
        if (curDiff > prevDiff) setZoom('in');
        if (curDiff < prevDiff) setZoom('out');
      }
      setPrevDiff(curDiff);
    } else if (touchEvents.length < 2) {
      setPrevDiff(-1);
      setZoom('none');
    }
    setTouchEvents(newState);
  };

  return [touchEvents, setState, zoom];
};

export default useZoomGesture;
