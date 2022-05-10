import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles, { theme } from './components/GlobalStyles';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import Board from './pages/Board';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <BrowserRouter>
          <GlobalStyles />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={LoginForm} />
            <Route path="/board" exact component={Board} />
          </Switch>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
};

export default App;
