import Component from './tutorial-tooltip-component';
import { connect } from 'react-redux';
import tutorialActions from 'redux_modules/tutorial';

const actions = { ...tutorialActions };


export default connect(null, actions)(Component);
