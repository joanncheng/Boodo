import styled from 'styled-components';

export const CtaContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgGrey};
  display: grid;
  place-items: center;
  padding: 0 30px;
`;

export const CtaWrapper = styled.div`
  padding: 160px 0;
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
