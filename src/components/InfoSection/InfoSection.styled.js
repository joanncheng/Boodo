import styled from 'styled-components';

export const InfoSec = styled.div`
  color: #fff;
  padding: 160px 0;
  background-color: ${({ lightBg, theme }) =>
    lightBg ? theme.colors.bgGrey : theme.colors.bgDark};
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ imgStart }) => (imgStart ? 'row-reverse' : 'row')};
`;

export const InfoColumn = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  flex: 1;
  max-width: 48%;
  flex-basis: 48%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-basis: 100%;
    justify-content: center;
    max-width: 100%;
  }
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;

  @media screen and (max-width: 768px) {
    padding-bottom: ${({ hasButton }) => (hasButton ? '65px' : '0')};
  }
`;

export const TopLine = styled.div`
  color: ${({ lightTopLine }) =>
    lightTopLine
      ? ({ theme }) => theme.colors.primaryLightest
      : ({ theme }) => theme.colors.primary};
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

export const Heading = styled.h1`
  font-family: 'Gochi Hand';
  margin-bottom: 24px;
  font-size: 60px;
  line-height: 1.1;
  color: ${({ lightText }) =>
    lightText ? '#fff' : ({ theme }) => theme.colors.textDarkest};

  @media screen and (max-width: 768px) {
    font-size: 48px;
  }
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }) =>
    lightTextDesc
      ? ({ theme }) => theme.colors.textLightest
      : ({ theme }) => theme.colors.textDarkest};
`;

export const ImgWrapper = styled.div`
  background-color: ${({ imgShadow }) => (imgShadow ? '#fff' : '')};
  box-shadow: ${({ imgShadow }) =>
    imgShadow ? '0 2px 8px 4px rgba(0, 0, 0, 0.04)' : ''};
  border-radius: 5px;
  display: flex;
`;

export const Img = styled.img`
  display: inline-block;
  padding-right: 0;
  max-width: 100%;
  vertical-align: middle;
  max-height: 500px;
  border: 0;
`;
