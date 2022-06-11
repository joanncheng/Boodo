import styled from 'styled-components';

export const ToolIcon = styled.div`
  min-width: 2.5rem;
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
  user-select: none;
  background-color: ${({ active }) =>
    active ? ({ theme }) => theme.colors.primary : '#e9ecef'};
  background-color: ${({ collab }) => (collab ? 'rgba(43, 138, 62, 0.1)' : '')};

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
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
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
