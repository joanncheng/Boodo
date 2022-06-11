import React from 'react';
import AuthForm from '../components/AuthForm';

const SigninPage = props => {
  const boardId = props.match.params.id;

  return (
    <>
      <AuthForm signin boardId={boardId} />
    </>
  );
};

export default SigninPage;
