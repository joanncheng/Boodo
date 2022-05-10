import React from 'react';
import * as S from './Tooltip.styled';

const Tooltip = ({ position, content, children }) => {
  return (
    <S.Tooltip position={position} content={content}>
      {children}
    </S.Tooltip>
  );
};

export default Tooltip;
