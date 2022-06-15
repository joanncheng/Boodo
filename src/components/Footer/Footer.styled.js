import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #fff;
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0;
  color: ${({ theme }) => theme.colors.bgDark};
`;

export const GithubLink = styled.a`
  width: 1.8rem;
  height: 1.8rem;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export const GithubIcon = styled(AiFillGithub)`
  width: 1.8rem;
  height: 1.8rem;
  color: ${({ theme }) => theme.colors.bgDark};
`;
