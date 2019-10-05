import { loadModules } from 'esri-loader';
import { HUMAN_PRESSURES_COLOR_RAMP } from 'constants/human-pressures';
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

export const mosaicRuleFix = (esriConfig, url, mosaicRule, globe) => {
  esriConfig.request.interceptors = [{
    globe,
    urls: `${url}/exportImage`,
    before: function (params) {
      if(params.requestOptions.query.mosaicRule) {
        params.requestOptions.query.mosaicRule = JSON.stringify(mosaicRule.toJSON());
      }
    }
  }]
}

export const humanPressuresPreloadFixes = (layer, rasters) => {
  const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName])
  const rasterNames = activeRasters.map(value => `human_impact_${value}`)
  const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;
  loadModules(["esri/config", "esri/layers/support/MosaicRule"])
  .then(([esriConfig, MosaicRule]) => {
    const mosaicRule = new MosaicRule({
      method: 'attribute',
      operation: 'sum',
      where: mosaicWhereClause
    });
    layer.mosaicRule = mosaicRule;
    mosaicRuleFix(esriConfig, layer.url, mosaicRule, 'DATA');
  });
}

export const dispatchLandPressuresLayersAnalyticsEvents = (rasters, option, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, mode) => {
  const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName]);
  const analyticsParams = { slug: option.slug, query: { viewMode: mode.LANDSCAPE }};
  const isRasterActive = activeRasters.some(value => value === option.value);
  if (isRasterActive) addLayerAnalyticsEvent(analyticsParams) 
  else removeLayerAnalyticsEvent(analyticsParams);
}
