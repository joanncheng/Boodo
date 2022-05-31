import styled from 'styled-components';

export const ToolIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;

  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ color }) => (color ? color : 'black')};
    stroke: ${({ color }) => (color ? color : 'black')};
  }

  &:hover svg {
    fill: ${({ theme }) => theme.colors.primary};
    stroke: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    background-color: #e2e1fc;
  }

  @media screen and (max-width: 400px) {
    width: 2rem;
    height: 2rem;
  }
`;

export const DropdownBtn = styled.button`
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: transparent;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-gap: 0.5rem;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    left: 0;
    transform: translateX(0);
  }
`;

export const DropdownItem = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  cursor: pointer;
  border: ${({ active }) => (active ? '0.3px solid #fff' : 'none')};
  box-shadow: ${({ active, color }) =>
    active ? `0 0 4px 1px ${color}` : 'none'};
`;
