import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import * as S from './Modal/Modal.styled';
import { db } from '../firebase';
import Modal from './Modal';
import CollaborationIcon from '../../public/images/icons/collaboration.svg';
import BottomToolbarBtn from './BottomToolbarBtn';
import { displayName } from '../redux/displayName';

const CollabBtn = ({ currentBoard }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const username = useSelector(state => state.cursorDisplayName);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const copyToClipboard = () => {
    inputRef.current.focus();
    inputRef.current.select();
    navigator.clipboard.writeText(inputRef.current.value);
  };

  useEffect(() => {
    onValue(ref(db, `status/`), snapshot => {
      const allStatus = snapshot.val();
      if (!allStatus) return;
      const editors = Object.keys(allStatus)
        .map(key => allStatus[key])
        .filter(({ board }) => board === currentBoard);
      setCollaborators(editors);
    });
  }, []);

  const modalActions = (
    <S.ActionContainer>
      <S.CopyButton title="Copy" onClick={copyToClipboard}>
        <S.CopyIcon />
      </S.CopyButton>
      <S.TextInput
        ref={inputRef}
        type="text"
        readOnly
        value={window.location.href}
        onClick={copyToClipboard}
      />
      <label htmlFor="username">Your name</label>
      <S.TextInput
        type="text"
        id="username"
        value={username}
        onChange={e => dispatch(displayName(e.target.value))}
      />
    </S.ActionContainer>
  );

  return (
    <>
      {modalOpen ? (
        <Modal
          title="Live collaboration"
          content="Share this link with anyone you want to collaborate with:"
          onDismiss={() => setModalOpen(false)}
          modalActions={modalActions}
        />
      ) : null}
      <BottomToolbarBtn
        title="Live collaboration"
        handler={() => setModalOpen(true)}
        collab={collaborators.length > 1 ? collaborators.length : false}
      >
        <CollaborationIcon />
      </BottomToolbarBtn>
    </>
  );
};

export default CollabBtn;
