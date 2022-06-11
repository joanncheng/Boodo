import React from 'react';
import * as S from './ShapeBtn.styled';

const ShapeBtn = ({ type, name, handler, checked, children, number }) => {
  return (
    <>
      <S.ToolInput
        type={type}
        name={name}
        onChange={handler}
        checked={checked}
      />
      <S.ToolIcon>
        {children}
        <span>{number}</span>
      </S.ToolIcon>
    </>
  );
};

export default ShapeBtn;
