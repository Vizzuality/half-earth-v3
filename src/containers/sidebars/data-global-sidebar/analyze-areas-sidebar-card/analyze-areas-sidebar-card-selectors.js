import { createStructuredSelector } from 'reselect';

import {
  getSelectedAnalysisLayer,
  getSelectedAnalysisTab,
} from 'pages/data-globe/data-globe-selectors.js';

export const mapStateToProps = createStructuredSelector({
  selectedAnalysisLayer: getSelectedAnalysisLayer,
  selectedAnalysisTab: getSelectedAnalysisTab,
});
