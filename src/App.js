import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import GlobalStyles, { theme } from './components/GlobalStyles';
import Home from './pages/Home';
import Board from './pages/Board';
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';
import MyBoards from './pages/MyBoards';
import { auth } from './firebase';
import { logIn } from './redux/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) return;
      const { uid, email } = user;
      dispatch(logIn({ uid, email }));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/signup/:id" exact component={SignupPage} />
          <Route path="/signin" exact component={SigninPage} />
          <Route path="/signin/:id" exact component={SigninPage} />
          <Route path="/board/:id" exact component={Board} />
          <Route path="/myBoards" exact component={MyBoards} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
