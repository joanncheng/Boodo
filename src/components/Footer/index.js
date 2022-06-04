import React from 'react';
import * as S from './Footer.styled';

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterWrapper>
        {' '}
        &copy; 2022 Joann Cheng
        <S.GithubLink href="https://github.com/joanncheng/Boodo">
          <S.GithubIcon />
        </S.GithubLink>
      </S.FooterWrapper>
    </S.FooterContainer>
  );
};

export default Footer;
