export const MASK_STYLES = {
  fillColor: [0, 0, 0],
  fillOpacity: 0.5,
  outlineColor: [147, 255, 95],
  outlineOpacity: 0.9,
  outlineWidth: 0,
};

export const BORDERS_OPACITY = 0.3;

export const BORDERS_LAYERS_RENDERER = {
  type: 'simple',
  symbol: {
    type: 'simple-fill',
    color: [0, 0, 0, 0],
    outline: {
      color: [216, 216, 216, BORDERS_OPACITY],
      width: '1px',
    },
  },
};

export const GRID_CELL_STYLES = {
  fillColor: [147, 255, 95],
  fillOpacity: 0,
  outlineColor: [147, 255, 95],
  outlineOpacity: 0.9,
  outlineWidth: 2,
};
