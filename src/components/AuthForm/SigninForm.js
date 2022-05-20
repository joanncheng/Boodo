import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from 'reactfire';
import { auth } from '../../firebase';
import * as S from './AuthForm.styled';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { data: user } = useUser();

  useEffect(() => {
    if (user) {
      history.push(`/board/public`);
    }
  }, [user]);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSignin = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push('/board/public');
      })
      .catch(err => {
        console.log('sign in error:' + err.message);
      });
  };

  return (
    <S.Container>
      <S.FormWrap>
        <S.Logo to="/">
          <S.LogoIcon />
        </S.Logo>
        <S.FormContent>
          <S.FormH1>Sign in</S.FormH1>
          <S.FormLabel htmlFor="for">Email</S.FormLabel>
          <S.FormInput
            type="email"
            onChange={handleEmailChange}
            value={email}
            placeholder="test@test.com"
          />
          <S.FormLabel htmlFor="for">Password</S.FormLabel>
          <S.FormInput
            type="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="test123"
          />
          <S.FormBtn onClick={handleSignin}>Sign in</S.FormBtn>
          <S.Text>
            <S.TextLink to="signup">Create an account</S.TextLink>
          </S.Text>
        </S.FormContent>
      </S.FormWrap>
    </S.Container>
  );
};

export default SigninForm;
