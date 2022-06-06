import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../../public/images/icons/logo.svg';

export const Card = styled(Link)`
  position: relative;
  display: grid;
  place-items: center;
  background-color: #fff;
  height: 150px;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  }
`;

export const DeleteBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.2s ease-out;

  &:hover {
    transform: translateY(-2px);
    opacity: 1;
    fill: ${({ theme }) => theme.colors.red};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    height: 1.2em;
    width: 1.2rem;
  }
`;

export const Info = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 10px;
  margin-bottom: 0.5rem;
`;

export const CardImg = styled.div`
  height: 80px;
  width: 80px;
`;

export const LogoIcon = styled(Logo)`
  opacity: 0.1;
  width: 100%;
  height: 100%;
`;

export const BoardName = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  justify-self: center;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textDark};
`;
