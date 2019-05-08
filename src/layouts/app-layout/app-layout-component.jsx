import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import universal from 'react-universal-component';

const universalConfig = {
  loading: <div>Loading</div>
};

const PageComponent = universal(
  ({ page } /* webpackChunkName: "[request]" */) => import(`../../pages/${page}/${page}.js`),
  universalConfig
);

class App extends PureComponent {
  render() {
    const { route } = this.props;
    const { page } = route;
    return page ? <PageComponent page={page} /> : null;
  }
}

App.propTypes = {
  route: Proptypes.object.isRequired
};

export default App;