import { createAction } from 'redux-tools';

export const setGridCellData = createAction(
  'SET_GRID_CELL_DATA'
);

export const setGridCellGeojson = createAction(
  'SET_GRID_CELL_GEOJSON'
);