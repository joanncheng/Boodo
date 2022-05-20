import React from 'react';
import { AuthProvider } from 'reactfire';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles, { theme } from './components/GlobalStyles';
import Home from './pages/Home';
import Board from './pages/Board';
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';
import { auth } from './firebase';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider sdk={auth}>
          <GlobalStyles />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/signin" exact component={SigninPage} />
            <Route path="/board/:id" exact component={Board} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
