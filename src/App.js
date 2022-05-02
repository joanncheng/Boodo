import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/GlobalStyles';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import Board from './components/Board';

const theme = {
  colors: {
    primary: '#4b59f7',
    secondary: '',
    bgDark: '#010606',
  },
};

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
