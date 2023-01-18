import { createStructuredSelector } from 'reselect';

import { selectSceneView } from 'selectors/scene-selectors';

export default createStructuredSelector({
  view: selectSceneView,
});
