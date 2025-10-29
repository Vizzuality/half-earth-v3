import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';
import store from './store/store';
import './styles/base.scss';

function Root() {
  return (
    <Provider store={store()}>
      <App />
    </Provider>
  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Root />, document.getElementById('root'));

// Proactively unregister any existing service workers in production
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  }).catch(() => {});
}
