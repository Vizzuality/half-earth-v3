import { createStructuredSelector } from 'reselect';

import { getSelectedAnalysisLayer } from 'pages/data-globe/data-globe-selectors.js';

export const mapStateToProps = createStructuredSelector({
  selectedAnalysisLayer: getSelectedAnalysisLayer,
});
