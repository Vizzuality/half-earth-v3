import { connect } from 'react-redux';

import Component from './switcher-component';

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type]
});

export default connect(mapStateToProps, null)(Component);