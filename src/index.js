import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import store from './store';
import 'styles/base';

function Root() {
  return (
    <Provider store={store()}>
      <App />
    </Provider>
  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.register();
