export default {
  //this allows to clip the globe
  alphaCompositingEnabled: true,
  environment: {
    atmosphereEnabled: false,
    background: {
      type: "color",
      color: [15, 43, 59, 0]
    },
    starsEnabled: false,
  },
  constraints: {
    altitude: {
      max: 12500000,
      min: 12500000
    },
    tilt: {
      max: 0
    }
  },
   // Disable mouse-wheel and single-touch map navigation.
   navigation: {
    mouseWheelZoomEnabled: false,
    browserTouchPanEnabled: false
  },
  zoom: 0,
  ui: {
    components: []
  }
}