export default {
  globe: {
    camera: null,
    zoom: 0,
    padding: {
      left: 250,
      top: 3000,
    },
    isGlobeUpdating: false,
    viewingMode: 'global',
    ui: {
      components: [],
    },
    basemap: {
      surfaceColor: '#070710',
      layersArray: [],
    },
  },
  ui: {
    isSidebarOpen: false,
    isFullscreenActive: false,
    activeCategory: '',
    sceneMode: 'data',
  },
};
