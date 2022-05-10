import styled from 'styled-components';
import { FaSignOutAlt } from 'react-icons/fa';

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
  cursor: pointer;
`;

export const ToolIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;

  svg {
    position: relative;
    height: 1em;
    fill: black;
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
    box-shadow: 0 0 0 2px #a5d8ff;
  }
`;

export const ToolTypeColor = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  color: ${({ color }) => color};

  & + .palette-icon {
    width: 2.5rem;
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 2.5rem;
  margin-right: 2rem;
`;

export const UserIcon = styled.div`
  display: grid;
  place-items: center;

  svg {
    height: 1.2em;
    fill: black;
  }
`;

export const LogoutBtn = styled(FaSignOutAlt)`
  cursor: pointer;
  width: 2rem;
  height: 1.2rem;

  &:hover {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;
