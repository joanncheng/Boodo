import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../GlobalStyles';
import * as S from './CtaSection.styled';

const CtaSection = () => {
  return (
    <S.CtaContainer>
      <S.CtaWrapper>
        <S.CtaH2>Drawing can become your problem-solving process</S.CtaH2>
        <Link to="/signup">
          <Button big fontBig>
            Try it now
          </Button>
        </Link>
      </S.CtaWrapper>
    </S.CtaContainer>
  );
};

export default CtaSection;
