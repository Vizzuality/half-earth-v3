import Component from './species-modal-component';
import { connect } from 'react-redux';
import { getCountryData } from './species-modal-selectors';

const mapStateToProps = (state) => ({
  countryData: getCountryData(state)
});

export default connect(mapStateToProps, null)(Component);