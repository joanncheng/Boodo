import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    textLightest: '#f7f8fa',
    textLight: '#a9b3c1',
    text: '#58585D',
    textDark: '#343a40',
    textDarkest: '#161617',
    primaryLightest: '#d1cefc',
    primary: '#665df5',
    primaryDark: '#544af4',
    primaryDarkest: '#3b34ab',
    secondary: '#57e1a3',
    bgDark: '#010606',
    bgGrey: '#ced4da',
    red: '#fa5252',
    redDark: '#e03131',
  },
};

export default createGlobalStyle`

  @font-face {
    font-family: 'virgil';
    src: url('/fonts/Virgil.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: "Gochi Hand";
    src: url("../fonts/GochiHand.ttf") format("truetype");
    src: url("../fonts/GochiHand.woff2") format("woff2");
    src: url("../fonts/GochiHand.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans TC', Arial, sans-serif;
  }
  
  img {
    max-width: 100%;
  }
  
  tspan {
    font-family: 'Gochi Hand','Virgil', 'Noto Sans TC', Arial, sans-serif;
    letter-spacing: 1.5px;
    stroke-width: 0;
    font-size: 24px;
  }
  
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 50px;

  @media screen and (max-width: 960px) {
    padding: 0 30px;
  }
`;

export const Button = styled.button`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
