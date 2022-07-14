import { connect } from 'react-redux';
import Component from './component.jsx';
import urlActions from 'actions/url-actions';

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
});

export default connect(mapStateToProps, urlActions)(Component);
