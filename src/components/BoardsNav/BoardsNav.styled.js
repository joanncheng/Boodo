import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Logo from '../../../public/images/icons/logo.svg';
import { Container } from '../GlobalStyles';

export const Nav = styled.nav`
  box-shadow: 0 0 3px 1px ${({ theme }) => theme.colors.bgGrey};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  height: 80px;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
`;

export const NavLogo = styled(LinkR)`
  justify-self: flex-start;
  width: 70px;
  cursor: pointer;
`;

export const LogoIcon = styled(Logo)`
  width: 100%;
  height: 100%;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 80px;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 1rem;

  @media screen and (max-width: 578px) {
    gap: 5px;
  }
`;

export const UserIcon = styled.div`
  display: grid;
  place-items: center;

  svg {
    height: 1.2em;
    fill: black;
  }
`;

export const LogoutBtn = styled(FaSignOutAlt)`
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;

  &:hover {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;
