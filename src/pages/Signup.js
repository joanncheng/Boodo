import React from 'react';
import AuthForm from '../components/AuthForm';
import ScrollToTop from '../components/ScrollToTop';

const SignupPage = props => {
  const boardId = props.match.params.id;

  return (
    <>
      <ScrollToTop />
      <AuthForm signup boardId={boardId} />
    </>
  );
};

export default SignupPage;
