import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import LogoImg from '../../../public/images/icons/logo_white.svg';

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(
    108deg,
    ${({ theme }) => theme.colors.primaryDark} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
`;

export const FormWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.bgDark};
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-rows: 80px 1fr;
  place-items: center;
  align-items: stretch;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
`;

export const Logo = styled(LinkR)`
  max-width: 250px;
  justify-self: center;
  align-self: center;
  cursor: pointer;
`;

export const LogoIcon = styled(LogoImg)`
  width: 100%;
  height: fit-content;
`;

export const FormContent = styled.div`
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  padding: 32px;
  border-radius: 4px;

  @media screen and (max-width: 400px) {
    padding: 32px;
  }
`;

export const FormH1 = styled.h1`
  font-family: 'Gochi Hand';
  margin-bottom: 32px;
  color: #fff;
  font-size: 2rem;
  justify-self: center;
  text-transform: capitalize;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  padding: 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

export const FormBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  text-transform: capitalize;
  cursor: pointer;
  outline: none;
`;

export const Text = styled.p`
  text-align: center;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.primaryLightest};
  font-size: 14px;
`;

export const TextLink = styled(LinkR)`
  text-decoration: none;
  text-decoration: underline;
  color: #f0effe;
`;
