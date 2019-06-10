import { connect } from 'react-redux';

import Component from './geo-description-widget-component';

const mapStateToProps = ({ geoDescription }) => ({
  data: geoDescription.data,
  loading: geoDescription.loading,
  error: geoDescription.error
});

export default connect(mapStateToProps, null)(Component);
