import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';
import store from './store/store';
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
