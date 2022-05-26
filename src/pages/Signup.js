import React from 'react';
import AuthForm from '../components/AuthForm';
import ScrollToTop from '../components/ScrollToTop';

const SignupPage = () => {
  return (
    <>
      <ScrollToTop />
      <AuthForm signup />
    </>
  );
};

export default SignupPage;
