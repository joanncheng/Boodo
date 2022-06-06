import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import GlobalStyles, { theme } from './components/GlobalStyles';
import Home from './pages/Home';
import Board from './pages/Board';
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';
import MyBoards from './pages/MyBoards';
import { auth } from './firebase';
import AuthContext from './contexts/AuthContext';

const App = () => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, user => setUser(user));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContext.Provider value={user}>
          <GlobalStyles />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/signin" exact component={SigninPage} />
            <Route path="/signin/:id" exact component={SigninPage} />
            <Route path="/board/:id" exact component={Board} />
            <Route path="/myBoards" exact component={MyBoards} />
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
