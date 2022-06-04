import React from 'react';
import * as S from './FeaturesSection.styled';
import Icon1 from '../../../public/images/feature1.svg?url';
import Icon2 from '../../../public/images/feature2.svg?url';
import Icon3 from '../../../public/images/feature3.svg?url';

const FeaturesSection = () => {
  return (
    <>
      <S.FeaturesContainer id="features">
        <S.FeaturesH1>Features</S.FeaturesH1>
        <S.FeaturesWrapper>
          <S.FeaturesCard>
            <S.FeaturesIcon src={Icon1} />
            <S.FeaturesH2>Draw sketches</S.FeaturesH2>
            <S.FeaturesP>
              Simple interface and drawing tools let you sketch with a
              hand-drawn feel.
            </S.FeaturesP>
          </S.FeaturesCard>
          <S.FeaturesCard>
            <S.FeaturesIcon src={Icon2} />
            <S.FeaturesH2>Real-time collaborate</S.FeaturesH2>
            <S.FeaturesP>
              Invite collaborators by link then you can draw together with other
              users, concurrently.
            </S.FeaturesP>
          </S.FeaturesCard>
          <S.FeaturesCard>
            <S.FeaturesIcon src={Icon3} />
            <S.FeaturesH2>List of drawings</S.FeaturesH2>
            <S.FeaturesP>
              Unlimited number of boards you can create and save.
            </S.FeaturesP>
          </S.FeaturesCard>
        </S.FeaturesWrapper>
      </S.FeaturesContainer>
    </>
  );
};

export default FeaturesSection;
