import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Itim&display=swap');
  

  @font-face {
    font-family: 'virgil';
    src: url('../fonts/Virgil.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans TC', Arial, sans-serif;
  }
  
  body{
    overflow: hidden;
  }
  
  img {
    max-width: 100%;
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
`;

export default GlobalStyles;
