import styled from 'styled-components';

export const Dropdown = styled.div`
  height: 2.5rem;
  min-width: 2.8rem;
  position: relative;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  min-width: 2.8rem;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  z-index: 10;
  height: 225px;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: center;
`;

export const DropdownBtn = styled.button`
  min-width: 2.8rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: rgba(206, 212, 218, 0.3);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgGrey};
  }
`;

export const DropdownItem = styled.div`
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? ({ theme }) => theme.colors.bgGrey : ''};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgGrey};
  }
`;
