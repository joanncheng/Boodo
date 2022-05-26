import React from 'react';
import AuthForm from '../components/AuthForm';
import ScrollToTop from '../components/ScrollToTop';

const SigninPage = props => {
  const boardId = props.match.params.id;

  return (
    <>
      <ScrollToTop />
      <AuthForm signin boardId={boardId} />
    </>
  );
};

export default SigninPage;
