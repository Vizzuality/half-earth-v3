export const setRasterFuntion = (RasterFunction, Color, colorRamp) => (
  new RasterFunction({
    functionName: "Colormap",
    functionArguments: {
      "colorramp": {
        "type": "multipart",
        "colorRamps": [
          {
            "type": "algorithmic",
            "algorithm": "esriHSVAlgorithm",
            "fromColor": new Color(colorRamp[0]).toRgba(),
            "toColor": new Color(colorRamp[1]).toRgba()
          },
          {
            "type": "algorithmic",
            "algorithm": "esriHSVAlgorithm",
            "fromColor": new Color(colorRamp[1]).toRgba(),
            "toColor": new Color(colorRamp[2]).toRgba()
          },
          {
            "type": "algorithmic",
            "algorithm": "esriHSVAlgorithm",
            "fromColor": new Color(colorRamp[2]).toRgba(),
            "toColor": new Color(colorRamp[3]).toRgba()
          },
          {
            "type": "algorithmic",
            "algorithm": "esriHSVAlgorithm",
            "fromColor": new Color(colorRamp[3]).toRgba(),
            "toColor": new Color(colorRamp[4]).toRgba()
          },
          {
            "type": "algorithmic",
            "algorithm": "esriHSVAlgorithm",
            "fromColor": new Color(colorRamp[4]).toRgba(),
            "toColor": new Color(colorRamp[5]).toRgba()
          },
          {
            "type": "algorithmic",
            "algorithm": "esriHSVAlgorithm",
            "fromColor": new Color(colorRamp[5]).toRgba(),
            "toColor": new Color(colorRamp[6]).toRgba()
          }
        ]
      },
      raster: new RasterFunction({
        functionName: "Stretch",
        functionArguments: {
          "StretchType": 5,
          "Min": 1,
          "Max": 255
        }
      })
    }
  })
)

export const mosaicRuleFix = (esriConfig, layer) => (
  esriConfig.request.interceptors.push({
    urls: `${layer.url}/exportImage`,
    before: function (params) {
      if(params.requestOptions.query.mosaicRule) {
        params.requestOptions.query.mosaicRule = JSON.stringify(layer.mosaicRule.toJSON());
      }
    }
  })
)