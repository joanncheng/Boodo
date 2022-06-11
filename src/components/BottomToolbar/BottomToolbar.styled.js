import styled from 'styled-components';

export const BottomLeftStack = styled.div`
  position: fixed;
  bottom: 8px;
  left: 0;
  padding: 0 15px;

  @media screen and (max-width: 550px) {
    padding: 0 10px;
  }
`;

export const BottomRightStack = styled.div`
  position: fixed;
  bottom: 8px;
  right: 10px;
  padding: 0 15px;

  @media screen and (max-width: 550px) {
    padding: 0;
  }
`;

export const ToolContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const ToolTipWrapper = styled.div`
  display: flex;
  width: 55px;

  button {
    width: fit-content;
    height: 2.5rem;
    background-color: #fff;
    font-size: 1rem;
    padding: 0 5px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.bgGrey};
    }

    span {
      white-space: nowrap;
    }
  }
`;

export const ZoomTool = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  @media screen and (max-width: 550px) {
    display: none;
  }
`;
