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
import BoardList from '../components/BoardList';
import BoardsNav from '../components/BoardsNav';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const MyBoards = () => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [boards, setBoards] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);

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
        setBoards('error');
      }
    } else {
      history.push(`/signin`);
    }
  }, []);

  const handleSignOut = () => {
    signOut(auth);
    dispatch(logOut());
    history.push('/signin');
  };

  const createBoard = () => {
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
  };

  if (boards === 'error') {
    return (
      <ErrorMessage message={'Something went wrong, please try again later.'} />
    );
  }

  return (
    <>
      {boards === [] ? (
        <Loader />
      ) : (
        <>
          <BoardsNav handleSignOut={handleSignOut} />
          <BoardList
            boards={boards}
            createBoard={createBoard}
            deleteBoard={deleteBoard}
          />
        </>
      )}
    </>
  );
};

export default MyBoards;
