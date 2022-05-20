import React, { useEffect, useState } from 'react';
import { onDisconnect, ref, set, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useSelector } from 'react-redux';

const colors = [
  '#e91e63',
  '#9c27b0',
  '#3f51b5',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
];

const EditorCursors = ({ user, currentBoard, viewBox }) => {
  const username = useSelector(state => state.username);
  const [cursorState, setCursorState] = useState([]);

  useEffect(() => {
    if (!user) return;
    const ownCursorRef = ref(db, `userCursors/${user.uid}`);
    const trackCursor = e => {
      set(ownCursorRef, {
        userId: user.uid,
        name: username,
        board: currentBoard,
        mouseX: e.clientX + viewBox.x,
        mouseY: e.clientY + viewBox.y,
      });
    };
    onDisconnect(ownCursorRef).remove();
    addEventListener('mousemove', trackCursor);
    return () => removeEventListener('mousemove', trackCursor);
  });

  useEffect(() => {
    onValue(ref(db, `userCursors/`), snapshot => {
      const cursors = snapshot.val();
      if (!cursors) return;
      const editorCursors = Object.keys(cursors)
        .map(key => cursors[key])
        .filter(cursor => {
          const { board, userId } = cursor;
          return board === currentBoard && userId !== user.uid;
        });
      setCursorState(editorCursors);
    });
  }, []);

  const renderCursors = () => {
    return cursorState.map(({ mouseX, mouseY, userId, name }, index) => (
      <svg
        fill="none"
        width="150"
        height="30"
        viewBox={`0 0 150 30`}
        xmlns="http://www.w3.org/2000/svg"
        key={userId}
        style={{
          position: 'absolute',
          top: mouseY - viewBox.y,
          left: mouseX - viewBox.x,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <g>
          <path
            d="M6.63564 2.28753C5.98325 1.75037 5 2.21445 5 3.05952V17.0583C5 17.9844 6.15025 18.413 6.75622 17.7127L10.2799 13.6402C10.5648 13.3109 10.9788 13.1217 11.4142 13.1217L17.0061 13.1217C17.9444 13.1217 18.3661 11.9461 17.6418 11.3497L6.63564 2.28753Z"
            fill={colors[index % colors.length]}
            style={{
              pointerEvents: 'none',
            }}
          />
          <text
            x="10"
            y="25"
            fill={colors[index % colors.length]}
            style={{ fontSize: '10px' }}
          >
            {name}
          </text>
        </g>
      </svg>
    ));
  };

  return <>{renderCursors()}</>;
};

export default EditorCursors;