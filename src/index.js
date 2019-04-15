import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import store from './store';
import 'styles/base';

import 'vizzuality-components/dist/legend.css';

const Root = () => {
  return (
    <Provider store={store()}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
