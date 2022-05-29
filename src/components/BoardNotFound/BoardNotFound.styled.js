import styled from 'styled-components';
import LogoImg from '../../../public/images/logo-boodo-b.svg';
import { Button } from '../GlobalStyles';

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  background-color: #f1f3f5;
`;

export const Header = styled.div`
  padding: 20px;
  margin-bottom: 2rem;
  height: 140px;
`;

export const Logo = styled(LogoImg)`
  height: 100%;
`;

export const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.05);
`;

export const ContentTop = styled.h1`
  font-family: 'Gochi Hand';
  font-size: 6rem;
  margin-bottom: 1rem;
`;
export const ContentBottom = styled.div`
  display: grid;
  gap: 2rem;
`;

export const ActionBtn = styled(Button)``;
