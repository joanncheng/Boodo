import React from 'react';
import { Link as LinkR } from 'react-router-dom';
import { Container as GSContainer, Button as GSButton } from '../GlobalStyles';
import * as S from './InfoSection.styled';

const InfoSection = ({
  id,
  lightBg,
  imgStart,
  lightTopLine,
  lightText,
  topLine,
  headLine,
  lightTextDesc,
  description,
  hasButton,
  buttonLabel,
  alt,
  img,
  imgShadow,
}) => {
  return (
    <S.InfoSec id={id} lightBg={lightBg}>
      <GSContainer>
        <S.InfoRow imgStart={imgStart}>
          <S.InfoColumn>
            <S.TextWrapper hasButton={hasButton}>
              <S.TopLine lightTopLine={lightTopLine}>{topLine}</S.TopLine>
              <S.Heading lightText={lightText}>{headLine}</S.Heading>
              <S.Subtitle lightTextDesc={lightTextDesc}>
                {description}
              </S.Subtitle>
              {hasButton ? (
                <LinkR to={`/signup`}>
                  <GSButton big fontBig>
                    {buttonLabel}
                  </GSButton>
                </LinkR>
              ) : null}
            </S.TextWrapper>
          </S.InfoColumn>
          <S.InfoColumn>
            <S.ImgWrapper imgShadow={imgShadow}>
              <S.Img src={img} alt={alt} />
            </S.ImgWrapper>
          </S.InfoColumn>
        </S.InfoRow>
      </GSContainer>
    </S.InfoSec>
  );
};

export default InfoSection;
