import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const BottomStack = styled.div`
  position: fixed;
  bottom: 8px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  background-color: ${({ active }) =>
    active ? ({ theme }) => theme.colors.primary : ''};

  & svg {
    fill: ${({ active }) => (active ? '#fff' : '')};
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
  margin: 0 1.5rem;

  &:hover {
    transform: scale(1.2);
  }
`;