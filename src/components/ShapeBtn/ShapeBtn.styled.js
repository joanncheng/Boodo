import styled from 'styled-components';

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

export const ToolInput = styled.input`
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
`;
