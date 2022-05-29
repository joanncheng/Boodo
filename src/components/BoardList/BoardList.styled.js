import styled from 'styled-components';
import { FaLayerGroup } from 'react-icons/fa';
import { Button } from '../GlobalStyles';

export const BoardsSec = styled.div`
  color: #fff;
  padding: 40px 0;
  background-color: #f1f3f5;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.bgGrey};

  @media screen and (max-width: 578px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BoardsHeader = styled.h1`
  color: ${({ theme }) => theme.colors.textDark};
  white-space: nowrap;
`;

export const HeaderIcon = styled(FaLayerGroup)`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const CreateBtn = styled(Button)`
  @media screen and (max-width: 768px) {
    width: fit-content;
  }
`;

export const BoardCardsContainer = styled.div`
  display: grid;
  justify-content: start;
  height: 100vh;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 201px));
  grid-template-rows: repeat(auto-fit, minmax(150px, 150px));
  margin: 2rem;

  @media screen and (max-width: 768px) {
    height: auto;
    justify-content: center;
  }
`;
