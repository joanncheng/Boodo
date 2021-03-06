import styled from 'styled-components';

export const SVGCanvas = styled.svg`
  display: block;
  overflow: hidden;
  touch-action: none;
`;

export const TextArea = styled.textarea`
  font-family: 'Gochi Hand', 'Noto Sans TC', Arial, sans-serif;
  letter-spacing: 1.5px;
  margin: 0;
  padding: 5px 0;
  resize: none;
  border: 1px dashed rgba(0, 0, 0, 0.3);
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  background: transparent;
  line-height: 1.3;
`;
