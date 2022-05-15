import styled from 'styled-components';

export const ModalDimmer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  transition: box-shadow 0.5s ease-in-out;
`;

export const ModalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  position: relative;
  justify-content: center;
  padding: 0 1rem 1rem 1rem;
  width: 60%;
  max-width: 500px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textDark};
  background-color: #fff;
  opacity: 0;
  animation: fadeIn 0.2s ease-out forwards;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.12) 1px 1px 5px 0px;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateY(-10px);
    }
  }
`;

export const ModalHeader = styled.h2`
  padding-top: 8px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: capitalize;
`;

export const Content = styled.p`
  text-align: center;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  background-color: #e9ecef;
  cursor: pointer;

  svg {
    position: relative;
    height: 1.2em;
    fill: black;
    stroke: black;
  }

  &:hover {
    background-color: #ced4da;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-self: center;

  button {
    background-color: '#e9ecef';
    border-radius: 8px;
    border: none;
    padding: 8px;
    height: 2.5rem;
    min-width: 2.5rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #ced4da;
    }
  }

  .buttons {
    display: flex;
    gap: 1.5rem;
  }

  .primaryBtn {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  .redBtn {
    background-color: ${({ theme }) => theme.colors.red};
    color: #fff;

    &:hover {
      background-color: ${({ theme }) => theme.colors.redDark};
    }
  }

  .squareBtn {
    height: 5rem;
    width: 5rem;
    font-size: 1.6rem;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.28),
      0 6px 10px 0 rgba(0, 0, 0, 0.14);
  }
`;
