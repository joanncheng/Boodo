import React from 'react';
import { Link as LinkR } from 'react-router-dom';
import { Container as GSContainer, Button as GSButton } from '../GlobalStyles';
import * as S from './InfoSection.styled';
import heroImg from '../../../public/images/collaboration.svg?url';

const InfoSection = ({
  lightBg,
  imgStart,
  lightTopLine,
  lightText,
  topLine,
  headLine,
  lightTextDesc,
  description,
  buttonLabel,
  alt,
  start,
}) => {
  return (
    <S.InfoSec lightBg={lightBg}>
      <GSContainer>
        <S.InfoRow imgStart={imgStart}>
          <S.InfoColumn>
            <S.TextWrapper>
              <S.TopLine lightTopLine={lightTopLine}>{topLine}</S.TopLine>
              <S.Heading lightText={lightText}>{headLine}</S.Heading>
              <S.Subtitle lightTextDesc={lightTextDesc}>
                {description}
              </S.Subtitle>
              <LinkR to={`/signup`}>
                <GSButton big fontBig>
                  {buttonLabel}
                </GSButton>
              </LinkR>
            </S.TextWrapper>
          </S.InfoColumn>
          <S.InfoColumn>
            <S.ImgWrapper start={start}>
              <S.HeroImg src={heroImg} alt={alt} />
            </S.ImgWrapper>
          </S.InfoColumn>
        </S.InfoRow>
      </GSContainer>
    </S.InfoSec>
  );
};

export default InfoSection;
