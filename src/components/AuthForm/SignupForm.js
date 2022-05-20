import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useUser } from 'reactfire';
import { auth } from '../../firebase';
import * as S from './AuthForm.styled';

const SignupForm = () => {
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

  const handleSignup = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push('/board/public');
      })
      .catch(err => {
        console.log('sign up error:' + err.message);
      });
  };

  return (
    <S.Container>
      <S.FormWrap>
        <S.Logo to="/">
          <S.LogoIcon />
        </S.Logo>
        <S.FormContent>
          <S.FormH1>Sign up</S.FormH1>
          <S.FormLabel htmlFor="for">Email</S.FormLabel>
          <S.FormInput type="email" required onChange={handleEmailChange} />
          <S.FormLabel htmlFor="for">Password</S.FormLabel>
          <S.FormInput
            type="password"
            required
            onChange={handlePasswordChange}
          />
          <S.FormBtn onClick={handleSignup}>Sign up</S.FormBtn>
          <S.Text>
            Already have an account? &nbsp;
            <S.TextLink to="signin">Just sign in</S.TextLink>
          </S.Text>
        </S.FormContent>
      </S.FormWrap>
    </S.Container>
  );
};

export default SignupForm;
