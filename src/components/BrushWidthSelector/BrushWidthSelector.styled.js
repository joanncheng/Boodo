import styled from 'styled-components';
import { ToolInput } from '../ShapeBtn/ShapeBtn.styled';

export const ActionsWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
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

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ActionIcon = styled.div`
  display: grid;
  place-items: center;
  border-radius: 5px;
  cursor: pointer;
`;

export const ShapeTypeRadio = styled(ToolInput)`
  &:checked + ${ActionIcon} {
    background-color: ${({ theme }) => theme.colors.bgGrey};
  }
`;
