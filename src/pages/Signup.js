import React from 'react';
import AuthForm from '../components/AuthForm';

const SignupPage = props => {
  const boardId = props.match.params.id;

  return (
    <>
      <AuthForm signup boardId={boardId} />
    </>
  );
};

export default SignupPage;
