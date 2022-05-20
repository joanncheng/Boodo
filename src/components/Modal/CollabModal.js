import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import * as S from './Modal.styled';
import CrossIcon from '../../../public/images/icons/cross.svg';
import { useDispatch, useSelector } from 'react-redux';
import { displayName } from '../../redux/username';

const CollabModalActions = ({ onDismiss }) => {
  const username = useSelector(state => state.username);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const copyToClipboard = e => {
    inputRef.current.select();
    navigator.clipboard.writeText(inputRef.current.value);
  };

  return ReactDOM.createPortal(
    <S.ModalDimmer onClick={onDismiss}>
      <S.ModalContainer onClick={e => e.stopPropagation()}>
        <S.CloseIcon onClick={onDismiss}>
          <CrossIcon />
        </S.CloseIcon>
        <S.ModalHeader>Live collaboration</S.ModalHeader>
        <S.Content>
          Share this link with anyone you want to collaborate with:
        </S.Content>
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
      </S.ModalContainer>
    </S.ModalDimmer>,
    document.querySelector('#modal')
  );
};

export default CollabModalActions;
