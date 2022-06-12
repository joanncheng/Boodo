import styled from 'styled-components';

export const CtaContainer = styled.div`
  background-color: #fff;
  display: grid;
  place-items: center;
  padding: 0 30px;
  margin-bottom: 160px;

  @media screen and (max-width: 768px) {
    margin: 80px 0 120px 0;
  }
`;

export const CtaWrapper = styled.div`
  margin: 0 15px;
  max-width: 600px;
  text-align: center;
`;

export const CtaH2 = styled.h2`
  font-size: 48px;
  font-family: 'Gochi Hand';
  margin-bottom: 48px;
  line-height: 1.1;

  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;
