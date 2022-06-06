import { useState } from 'react';

const useDrawingHistory = initialState => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);
  const setState = (action, mode = '') => {
    const newState =
      typeof action === 'function' ? action(history[index]) : action;
    if (mode === 'overwrite') {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else if (mode === 'reset') {
      setHistory([newState]);
      setIndex(0);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex(prevState => prevState + 1);
    }
  };
  const undo = () => {
    if (index > 0) {
      setIndex(prevState => prevState - 1);
      return history[index - 1];
    }
  };
  const redo = () => {
    if (index < history.length - 1) {
      setIndex(prevState => prevState + 1);
      return history[index + 1];
    }
  };

  return [history[index], setState, undo, redo];
};

export default useDrawingHistory;
