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
      components: []
    },
  },
  ui: {
    isSidebarOpen: false,
    activeOption: 'add_layer', // mobile
    isFullscreenActive: false,
    activeCategory: '',
    sceneMode: 'data'
  },
  listeners: false
}
