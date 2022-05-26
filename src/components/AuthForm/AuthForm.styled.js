import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { SpinnerCircularFixed } from 'spinners-react';
import LogoImg from '../../../public/images/logo-boodo-w.svg';

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
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 20px 1fr;
  place-items: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 1rem 1fr;
    max-width: 400px;
  }
`;

export const Logo = styled(LinkR)`
  max-width: 220px;
  justify-self: center;
  align-self: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LogoIcon = styled(LogoImg)`
  width: 100%;
  height: fit-content;
`;

export const FormContent = styled.form`
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 4px;
`;

export const FormH1 = styled.h1`
  font-family: 'Gochi Hand';
  color: #fff;
  font-size: 2rem;
  justify-self: center;
  text-transform: capitalize;
`;

export const FormField = styled.div`
  display: grid;
  gap: 0.5rem;
  min-width: 250px;

  span {
    color: ${({ theme }) => theme.colors.textRed};
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    min-width: 300px;
  }
`;

export const FormLabel = styled.label`
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  padding: 16px;
  border: none;
  border-radius: 4px;
  min-width: 275px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

export const FormBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-width: 250px;
  background-color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ google }) => (google ? '#db4437' : '')};
  background-color: ${({ facebook }) => (facebook ? '#4267b2' : '')};
  padding: 1rem 0.5rem;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-out;

  &:hover {
    filter: brightness(1.1);
  }

  @media screen and (max-width: 768px) {
    min-width: 300px;
  }
`;

export const SeparationLine = styled.div`
  align-self: center;
  position: relative;
  height: 70%;
  color: ${({ theme }) => theme.colors.primaryLightest};
  border-right: 2px solid ${({ theme }) => theme.colors.primaryLightest};

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.colors.bgDark};
    padding: 1rem 0;
  }

  @media screen and (max-width: 768px) {
    height: 1rem;
    width: 60%;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primaryLightest};

    span {
      padding: 0 1rem;
      top: 0;
      transform: translateX(-50%);
    }
  }
`;

export const Text = styled.p`
  justify-self: center;
  align-self: start;
  color: ${({ theme }) => theme.colors.primaryLightest};
  font-size: 14px;
`;

export const TextLink = styled(LinkR)`
  text-decoration: none;
  text-decoration: underline;
  color: #f0effe;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.textRed};
  justify-self: center;
  text-align: center;
  max-width: 250px;
  margin-top: -10px;
`;

export const Loader = styled(SpinnerCircularFixed)`
  justify-self: center;
`;
