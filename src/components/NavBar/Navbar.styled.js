import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';
import { IoIosBrush } from 'react-icons/io';
import { Container } from '../GlobalStyles';

export const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.bgDark};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 10;

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
  max-width: 1100px;
  padding: 0 24px;
`;

export const NavLogo = styled(LinkR)`
  font-family: 'Itim';
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 3rem;
  display: flex;
  align-items: center;
`;

export const LogoIcon = styled(IoIosBrush)`
  font-size: 1.5rem;
  margin: 0 2px;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    color: #fff;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  border-bottom: 4px solid transparent;

  &:hover {
    border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const NavLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 5px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const NavItemBtn = styled.li`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  outline: none;
  border: none;
  transition: all 0.2s ease-in-out;
`;
