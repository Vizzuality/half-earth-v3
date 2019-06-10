import { connect } from 'react-redux';

import Component from './geo-description-widget-component';

const mapStateToProps = ({ gridCellData }) => ({
  geojson: gridCellData.geojson
});

export default connect(mapStateToProps, null)(Component);
