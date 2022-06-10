import React, { useEffect, useState } from 'react';
import {
  onValue,
  ref,
  push,
  update,
  equalTo,
  query,
  orderByChild,
} from 'firebase/database';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { logOut } from '../redux/auth';
import ScrollToTop from '../components/ScrollToTop';
import BoardList from '../components/BoardList';
import BoardsNav from '../components/BoardsNav';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

const MyBoards = () => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const [boards, setBoards] = useState(undefined);
  const [boardToBeDeleted, setBoardToBeDeleted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      try {
        onValue(
          query(ref(db, `boards`), orderByChild('owner'), equalTo(user.uid)),
          snapshot => {
            const data = snapshot.val();
            setBoards(data);
          }
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      history.push(`/signin`);
    }
  }, []);

  const handleSignOut = () => {
    try {
      signOut(auth);
      dispatch(logOut());
      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCreateBoard = () => {
    const newBoardKey = push(ref(db, `boards`)).key;
    const newBoard = {
      owner: user.uid,
      boardName: 'Untitled board',
    };
    const updates = {};
    updates[`boards/${newBoardKey}`] = newBoard;
    update(ref(db), updates);
  };

  const deleteBoard = boardId => {
    const removes = {};
    removes[`boards/${boardId}`] = null;
    update(ref(db), removes);
    setBoardToBeDeleted(null);
  };

  const deleteBoardModalActions = (
    <>
      <button onClick={() => setBoardToBeDeleted(null)}>Cancel</button>
      <button className="redBtn" onClick={() => deleteBoard(boardToBeDeleted)}>
        Confirm
      </button>
    </>
  );

  return (
    <>
      {boards === [] ? (
        <Loader />
      ) : (
        <>
          <ScrollToTop />
          <BoardsNav user={user} handleSignOut={handleSignOut} />
          <BoardList
            user={user}
            boards={boards}
            handleCreateBoard={handleCreateBoard}
            setBoardToBeDeleted={setBoardToBeDeleted}
          />
          {boardToBeDeleted ? (
            <Modal
              title="Delete board"
              content={
                <>
                  Delete board &nbsp;
                  <b>{boards[boardToBeDeleted].boardName}</b>
                  &nbsp; permanently?
                  <br /> This cannot be undone!
                </>
              }
              modalActions={deleteBoardModalActions}
              onDismiss={() => setBoardToBeDeleted(null)}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default MyBoards;
