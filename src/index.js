import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebase';

import App from './App';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </Provider>
);
