
import { connect } from 'react-redux';
import Component from './legend-component';

// TODO: Remove dummy datasets
const datasets = [
  {
    dataset: '12345678',
    visibility: true,
    layers: [ 
      {
        active: true,
        type: 'layer',
        name: 'My Example Layer', 
        layerConfig: {
          timeline: true,
          timelineLabel: '2015',
          order: 2015,
          type: 'gee',
          assetId: 'JRC/GSW1_0/YearlyHistory/31',
          url: 'https://storage.googleapis.com/wri-public/Hansen17/tiles/hansen_world/v1/tc{thresh}/{z}/{x}/{y}.png',
          body: {
            styleType: 'sld',
            sldValue: '<RasterSymbolizer><ColorMap type="values" extended="false"><ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" /><ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" /><ColorMapEntry color="#98AFC7" quantity="2" label="" /><ColorMapEntry color="#4863A0" quantity="3" label="" /></ColorMap></RasterSymbolizer>'
          }
        },
        legendConfig: {
          type: 'basic',
          items: [
            {
              name: 'Seasonal Water',
              color: '#98AFC7'
            }, 
            {
              name: 'Permanent Water',
              color: '#4863A0'
            }
          ]
        } 
      } 
    ] 
  }
]
const mapStateToProps = () => ({ datasets });

export default connect(mapStateToProps, null)(Component);