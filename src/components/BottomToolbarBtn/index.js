import React from 'react';
import * as S from './BottomToolbarBtn.styled';

const BottomToolbarBtn = ({ title, handler, children, active, collab }) => {
  return (
    <S.ToolTypeButton
      title={title}
      onClick={handler}
      active={active}
      collab={collab}
    >
      <S.ToolIcon>
        {children}
        {collab && <S.Number>{collab}</S.Number>}
      </S.ToolIcon>
    </S.ToolTypeButton>
  );
};

export default BottomToolbarBtn;
