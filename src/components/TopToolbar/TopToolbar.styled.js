import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import Logo from '../../../public/images/icons/logo.svg';

export const TopStack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fafafa;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 5px 5px;
`;

export const ToolContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ToolLabel = styled.label`
  display: grid;
  place-items: center;
  position: relative;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0.8rem;
  border-radius: 0.5rem;
`;

export const ToolIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  cursor: pointer;

  svg {
    position: relative;
    height: 1em;
    fill: ${({ color }) => (color ? color : 'black')};
    stroke: black;
  }

  &:hover svg {
    fill: ${({ theme }) => theme.colors.primary};
    stroke: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    background-color: #e2e1fc;

    svg {
      fill: black;
    }
  }
`;

export const ToolTypeRadio = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  outline: none;

  &:checked + ${ToolIcon} {
    background-color: ${({ theme }) => theme.colors.primary};
    svg {
      stroke: #fff;
      fill: #fff;
    }

    &:active {
      opacity: 0.9;
    }
  }

  &:focus-visible + ${ToolLabel} {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
  }
`;

export const ToolTypeFile = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  outline: none;

  & + ${ToolIcon} {
    background-color: ${({ active }) =>
      active ? ({ theme }) => theme.colors.primary : ''};
    svg {
      stroke: ${({ active }) => (active ? '#fff' : 'black')};
      fill: ${({ active }) => (active ? '#fff' : 'black')};
    }
  }

  &:focus-visible + ${ToolLabel} {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
  }
`;

export const ToolTypeColor = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const ToolTypeRange = styled.input`
  outline: none;
`;

export const ComboBox = styled.div`
  display: flex;
  color: #000;
  cursor: default;
  pointer-events: ${({ notAllowed }) => (notAllowed ? 'none' : '')};
  opacity: ${({ notAllowed }) => (notAllowed ? 0.2 : 1)};

  ${ToolIcon} {
    cursor: default;
    background-color: transparent;
  }
`;

export const BoardName = styled.div`
  display: flex;
`;

export const BoardNameInput = styled.input`
  width: 120px;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
  }
`;

export const LogoLink = styled(LinkR)`
  margin: 0 1rem;
  max-width: 2.2rem;
  max-height: 2.2rem;

  &:hover {
    transform: scale(1.1);
  }
`;

export const LogoIcon = styled(Logo)`
  width: 100%;
  height: 100%;
`;
