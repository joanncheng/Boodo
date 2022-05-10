import React from 'react';
import ReactDOM from 'react-dom';
import * as S from './Modal.styled';
import CrossIcon from '../../../public/images/icons/cross.svg';

const Modal = ({ onDismiss, title, content, modalActions }) => {
  return ReactDOM.createPortal(
    <S.ModalDimmer onClick={onDismiss}>
      <S.ModalContainer onClick={e => e.stopPropagation()}>
        <S.CloseIcon onClick={onDismiss}>
          <CrossIcon />
        </S.CloseIcon>
        <S.ModalHeader>{title}</S.ModalHeader>
        <p>{content}</p>
        <S.ModalActions>{modalActions}</S.ModalActions>
      </S.ModalContainer>
    </S.ModalDimmer>,
    document.querySelector('#modal')
  );
};

export default Modal;
