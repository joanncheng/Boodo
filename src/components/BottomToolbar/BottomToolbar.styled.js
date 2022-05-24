import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const BottomLeftStack = styled.div`
  position: fixed;
  bottom: 8px;
  left: 0;
  padding: 0 15px;
`;

export const BottomRightStack = styled.div`
  position: fixed;
  bottom: 8px;
  right: 0;
  padding: 0 15px;
`;

export const ToolContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const ToolIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;

  svg {
    position: relative;
    height: 1.2em;
    fill: black;
    stroke: black;
  }
`;

export const ToolTypeButton = styled.button`
  position: relative;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  background-color: ${({ active }) =>
    active ? ({ theme }) => theme.colors.primary : '#e9ecef'};
  background-color: ${({ collab }) =>
    collab ? 'rgba(43, 138, 62, 0.1)' : '#e9ecef'};

  & svg {
    fill: ${({ active }) => (active ? '#fff' : '')};
    fill: ${({ collab }) => (collab ? '#2b8a3e' : '')};
  }

  &:hover {
    background-color: ${({ active }) =>
      active
        ? ({ theme }) => theme.colors.primaryDark
        : ({ theme }) => theme.colors.bgGrey};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px #a5d8ff;
  }
`;

export const Number = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -8px;
  right: -8px;
  background-color: #40c057;
  color: #fff;
  border-radius: 50%;
`;

export const ToolTipWrapper = styled.div`
  display: flex;

  button {
    width: fit-content;
    height: 2.5rem;
    background-color: #fff;
    font-size: 1rem;
    padding: 0 5px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.bgGrey};
    }
  }
`;

export const LogoLink = styled(LinkR)`
  text-decoration: none;
  font-family: 'Gochi Hand';
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDarkest};
  margin: 0 1.2rem;

  &:hover {
    transform: scale(1.2);
  }
`;
