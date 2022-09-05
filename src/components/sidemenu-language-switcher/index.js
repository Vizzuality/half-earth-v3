import { connect } from 'react-redux';

import urlActions from 'actions/url-actions';

import Component from './component';

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
});

export default connect(mapStateToProps, urlActions)(Component);
