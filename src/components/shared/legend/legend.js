
import { connect } from 'react-redux';
import Component from './legend-component';

// TODO: Remove dummy datasets
const datasets = [
  {
    visibility: true,
    layers: [ 
      {
        active: true,
        type: 'layer',
        name: 'My Example Layer',
        legendConfig: {
          type: 'basic',
          items: []
        } 
      } 
    ] 
  }
]
const mapStateToProps = () => ({ datasets });

export default connect(mapStateToProps, null)(Component);