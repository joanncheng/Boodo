import React, { useEffect, useState } from 'react';
import { onValue, ref, push, update } from 'firebase/database';
import { useUser } from 'reactfire';
import { useHistory } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import ScrollToTop from '../components/ScrollToTop';
import BoardList from '../components/BoardList';
import BoardsNav from '../components/BoardsNav';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

const MyBoards = () => {
  const { data: user } = useUser();
  const history = useHistory();
  const [boards, setBoards] = useState(undefined);
  const [boardToBeDeleted, setBoardToBeDeleted] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        try {
          onValue(ref(db, `users/${user.uid}/boards`), snapshot => {
            const data = snapshot.val();
            setBoards(data);
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        history.push(`/signin`);
      }
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      history.push('/');
    } catch (err) {
      console.log('sign out error: ' + err.message);
    }
  };

  const handleCreateBoard = () => {
    const newBoardKey = push(ref(db, `boards`)).key;
    const newBoard = {
      owner: user.uid,
      boardName: 'Untitled board',
    };
    const updates = {};
    updates[`users/${user.uid}/boards/${newBoardKey}`] = newBoard;
    updates[`boards/${newBoardKey}`] = newBoard;
    update(ref(db), updates);
  };

  const deleteBoard = boardId => {
    const removes = {};
    removes[`users/${user.uid}/boards/${boardId}`] = null;
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
