import styled from 'styled-components';

export const InfoSec = styled.div`
  color: #fff;
  padding: 160px 0;
  background-color: ${({ lightBg }) =>
    lightBg ? '#fff' : ({ theme }) => theme.colors.bgDark};
`;

export const InfoRow = styled.div`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ imgStart }) => (imgStart ? 'row-reverse' : 'row')};
`;

export const InfoColumn = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

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
  padding-bottom: 60px;

  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
  }
`;

export const TopLine = styled.div`
  color: ${({ lightTopLine }) =>
    lightTopLine
      ? ({ theme }) => theme.colors.textLight
      : ({ theme }) => theme.colors.primary};
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

export const Heading = styled.h1`
  font-family: 'Virgil';
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  color: ${({ lightText }) =>
    lightText
      ? ({ theme }) => theme.colors.textLightest
      : ({ theme }) => theme.colors.textDarkest};
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }) =>
    lightTextDesc
      ? ({ theme }) => theme.colors.textLight
      : ({ theme }) => theme.colors.textDarkest};
`;

export const ImgWrapper = styled.div`
  max-width: 555px;
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
`;

export const HeroImg = styled.img`
  display: inline-block;
  padding-right: 0;
  max-width: 100%;
  vertical-align: middle;
  max-height: 500px;
  border: 0;
`;
