import styled from 'styled-components';
import { ToolTypeRadio } from '../TopToolbar/TopToolbar.styled';

export const ActionsWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 0.5rem 0 0.5rem;
  min-width: 70px;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  z-index: 10;
`;

export const Fieldset = styled.fieldset`
  border: none;

  legend {
    display: none;
  }
`;

export const ButtonList = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    cursor: pointer;
    padding: 2px;
    border-radius: 5px;
  }
`;

export const ShapeTypeRadio = styled(ToolTypeRadio)`
  &:checked + svg {
    background-color: ${({ theme }) => theme.colors.bgGrey};
  }
`;
