import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import store from './store';
import * as serviceWorker from './serviceWorker';
import 'styles/base';

function Root() {
  return (
    <Provider store={store()}>
      <App />
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.register();


