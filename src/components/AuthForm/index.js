import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { auth, googleAuthProvider, facebookAuthProvider } from '../../firebase';
import * as S from './AuthForm.styled';

const AuthForm = ({ boardId, signin }) => {
  const [signinEmail, setSigninEmail] = useState('test@test.com');
  const [signinPassword, setSigninPassword] = useState('test123');
  const [error, setError] = useState({ type: '', message: '' });
  const [loadingType, setLoadingType] = useState('none');
  const history = useHistory();
  const user = useSelector(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user) return;
    boardId ? history.push(`/board/${boardId}`) : history.push(`/myBoards`);
  }, [user]);

  const handleSigninWithProvider = async provider => {
    const type = 'provider';
    setLoadingType(type);
    const authProvider =
      provider === 'google' ? googleAuthProvider : facebookAuthProvider;
    try {
      await signInWithPopup(auth, authProvider);
      setLoadingType('none');
    } catch (err) {
      setLoadingType('none');
      if (err.code === 'auth/account-exists-with-different-credential') {
        setError({
          type,
          message:
            'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
        });
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError({
          type,
          message:
            'The popup has been closed by the user before finalizing the operation.',
        });
      } else {
        setError({
          type,
          message: 'Sorry, something went wrong, please try again later.',
        });
      }
    }
  };

  const onSubmit = async props => {
    const email = props[email] ? props.email : signinEmail;
    const password = props[password] ? props.password : signinPassword;

    if (!email || !password) return;

    const type = 'emailPassword';
    setLoadingType(type);
    try {
      if (signin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setLoadingType('none');
    } catch (err) {
      setLoadingType('none');
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError({
          type,
          message: 'Sorry, wrong email or password.',
        });
      } else if (err.code === 'auth/email-already-in-use') {
        setError({
          type,
          message: 'Sorry, email already in use.',
        });
      } else
        setError({
          type,
          message: 'Sorry, something went wrong, please try again later.',
        });
    }
  };

  const renderInputError = (field, type) => {
    if (type === 'pattern' || type === 'minLength') {
      return field === 'email' ? (
        <span>Email should be in the form name@example.com</span>
      ) : (
        <span>Password should be at least 6 characters</span>
      );
    } else if (type === 'required') {
      return <span>{`${field} is required`}</span>;
    }
  };

  const renderSigninFormField = () => {
    return (
      <>
        <S.FormField>
          <S.FormLabel>Email</S.FormLabel>
          <S.FormInput
            type="email"
            value={signinEmail}
            onChange={e => setSigninEmail(e.target.value)}
            placeholder="test@test.com"
            required
          />
        </S.FormField>
        <S.FormField>
          <S.FormLabel>Password</S.FormLabel>
          <S.FormInput
            type="password"
            value={signinPassword}
            onChange={e => setSigninPassword(e.target.value)}
            placeholder="test123"
            required
          />
        </S.FormField>
      </>
    );
  };

  const renderSignupFormField = () => {
    return (
      <>
        <S.FormField>
          <S.FormLabel>Email</S.FormLabel>
          <S.FormInput
            type="email"
            placeholder="name@example.com"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && renderInputError('email', errors.email.type)}
        </S.FormField>
        <S.FormField>
          <S.FormLabel>Password</S.FormLabel>
          <S.FormInput
            type="password"
            placeholder="at least 6 characters"
            {...register('password', {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password &&
            renderInputError('password', errors.password.type)}
        </S.FormField>
      </>
    );
  };

  const btnContent = signin ? 'Sign in' : 'Sign up';

  return (
    <S.Container>
      <S.FormWrap>
        <S.FormContent>
          <S.FormH1>
            {signin ? 'Sign in using ...' : 'Sign up using ...'}
          </S.FormH1>
          {loadingType === 'provider' ? (
            <S.Loader
              size={40}
              speed={150}
              color="#fff"
              secondaryColor="#010606"
            />
          ) : (
            <>
              <S.FormBtn
                google
                onClick={() => handleSigninWithProvider('google')}
              >
                Google
              </S.FormBtn>
              <S.FormBtn
                facebook
                onClick={() => handleSigninWithProvider('facebook')}
              >
                Facebook
              </S.FormBtn>
            </>
          )}
          {error.type === 'provider' && (
            <S.ErrorMessage>{error.message}</S.ErrorMessage>
          )}
        </S.FormContent>
        <S.SeparationLine>
          <span>or</span>
        </S.SeparationLine>
        <S.FormContent onSubmit={handleSubmit(onSubmit)}>
          <S.Logo to="/">
            <S.LogoIcon />
          </S.Logo>
          {signin ? renderSigninFormField() : renderSignupFormField()}
          <S.FormBtn type="submit">
            {loadingType === 'emailPassword' ? (
              <S.Loader
                size={28}
                speed={150}
                color="#fff"
                secondaryColor="#665df5"
              />
            ) : (
              btnContent
            )}
          </S.FormBtn>
          {error.type === 'emailPassword' && (
            <S.ErrorMessage>{error.message}</S.ErrorMessage>
          )}
          {signin ? (
            <S.Text>
              Don't have an account?&nbsp;
              <S.TextLink to={boardId ? `/signup/${boardId}` : '/signup'}>
                Sign up
              </S.TextLink>
            </S.Text>
          ) : (
            <S.Text>
              Already have an account?&nbsp;
              <S.TextLink to={boardId ? `/signin/${boardId}` : '/signin'}>
                Just sign in
              </S.TextLink>
            </S.Text>
          )}
        </S.FormContent>
      </S.FormWrap>
    </S.Container>
  );
};

export default AuthForm;
