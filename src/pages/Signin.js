import React from 'react';
import SigninForm from '../components/AuthForm/SigninForm';
import ScrollToTop from '../components/ScrollToTop';

const SigninPage = props => {
  const boardId = props.match.params.id;

  return (
    <>
      <ScrollToTop />
      <SigninForm boardId={boardId} />
    </>
  );
};

export default SigninPage;
