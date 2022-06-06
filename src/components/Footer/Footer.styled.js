import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgGrey};
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 0;
`;

export const GithubLink = styled.a`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export const GithubIcon = styled(AiFillGithub)`
  width: 2rem;
  height: 2rem;
  color: #000;
`;
