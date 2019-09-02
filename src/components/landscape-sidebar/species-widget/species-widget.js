import { connect } from 'react-redux';
import setSpeciesActions from 'redux_modules/species';
import Component from './species-widget-component';
import mapStateToProps from './species-widget-selectors';

const actions = { ...setSpeciesActions };

export default connect(mapStateToProps, actions)(Component); 
