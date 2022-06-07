import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import Logo from '../../../public/images/icons/logo.svg';

export const TopStack = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fafafa;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  padding: 0.3rem 0.5rem;
  min-width: 775px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
    min-width: 370px;
  }

  @media screen and (max-width: 400px) {
    min-width: 320px;
  }
`;

export const ToolContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-self: ${({ main }) => (main ? 'space-evenly' : 'space-between')};
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    gap: 5px;
  }
`;

export const ShapeActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const OtherActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 2.5rem;

  @media screen and (max-width: 768px) {
    margin: 0 5px;
  }
`;

export const ToolLabel = styled.label`
  display: grid;
  place-items: center;
  position: relative;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;
`;

export const ToolIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: #000;

  svg {
    position: relative;
    height: 1em;
    fill: ${({ color }) => (color ? color : 'black')};
    stroke: black;
  }

  span {
    position: absolute;
    bottom: 3px;
    right: 3px;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.textLight};
  }

  &:hover {
    svg {
      color: ${({ theme }) => theme.colors.primary};
      fill: ${({ theme }) => theme.colors.primary};
      stroke: ${({ theme }) => theme.colors.primary};
    }
    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  &:active {
    background-color: #e2e1fc;

    svg {
      fill: black;
    }

    span {
      color: #000;
    }
  }

  @media screen and (max-width: 768px) {
    width: 2rem;
    height: 2rem;

    span {
      display: none;
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

    span {
      color: #fff;
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
    background-color: ${({ active, theme }) =>
      active ? theme.colors.primary : ''};
    svg {
      fill: ${({ active }) => (active ? '#fff' : 'black')};
    }

    &:hover svg {
      fill: ${({ active, theme }) => (active ? '#fff' : theme.colors.primary)};
    }
  }

  &:focus-visible + ${ToolLabel} {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
  }
`;

export const OpacitySelector = styled.div`
  display: grid;
  place-items: center;
  width: 130px;
  height: 30px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  z-index: 10;
  padding: 0.5rem;
`;

export const ToolTypeRange = styled.input`
  outline: none;
  width: 100%;
`;

export const BoardName = styled.div`
  display: flex;
`;

export const BoardNameInput = styled.input`
  max-width: 110px;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  outline: none;
  text-align: center;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
  }

  @media screen and (max-width: 400px) {
    max-width: 80px;
  }
`;

export const LogoLink = styled(LinkR)`
  width: 2rem;
  height: 2rem;
  outline: none;

  &:hover {
    transform: scale(1.1);
  }
`;

export const LogoIcon = styled(Logo)`
  width: 100%;
  height: 100%;
`;
