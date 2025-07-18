import React, { useState } from 'react';

import { useT } from '@transifex/react';

import { INDIGENOUS_LANDS_FEATURE_ID } from 'utils/dashboard-utils';

import TileLayer from '@arcgis/core/layers/TileLayer';
import Switch from '@mui/material/Switch';
import cx from 'classnames';

import SidebarLegend from 'containers/sidebars/sidebar-legend';

import EsriFeatureService from 'services/esri-feature-service';

import { BIODIVERSITY_SLUG } from 'constants/analyze-areas-constants';
import { LAYER_OPTIONS } from 'constants/dashboard-constants.js';
import {
  BIRDS_RICHNESS_1KM,
  BIRDS_RARITY_1KM,
  AMPHIB_RARITY_1KM,
  AMPHIB_RICHNESS_1KM,
  HUMMINGBIRDS_RARITY,
  HUMMINGBIRDS_RICHNESS,
  MAMMALS_RICHNESS_1KM,
  MAMMALS_RARITY_1KM,
  ANTS_RICHNESS_1KM,
  ANTS_RARITY_1KM,
  REPTILES_RARITY_1KM,
  REPTILES_RICHNESS_1KM,
} from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';

import ArrowIcon from 'icons/arrow_right.svg?react';

import styles from './layer-legend-styles.module.scss';

function LayerLegendComponent(props) {
  const { map, countryISO, setRegionLayers } = props;
  const t = useT();

  // const [leftPosition, setLeftPosition] = useState(0);
  const [collapse, setCollapse] = useState(true);
  const [dataLayers, setDataLayers] = useState([
    {
      id: LAYER_OPTIONS.INDIGENOUS_LANDS,
      label: t('Indigenous Territories'),
      heatMapImage: '',
      details: `Publication date: 2012-12-04 <br/>Responsible party<br/>Organization's name: RAISG - Red Amazónica de Información Socioambiental Georreferenciada<br/>Contact's role: point of contact<br/>Delivery point: <a href="http://raisg.socioambiental.org/contact" target="_blank" rel="noopener noreferrer">http://raisg.socioambiental.org/contact</a>`,
      showDetails: false,
      showLayer: false,
      portalId: INDIGENOUS_LANDS_FEATURE_ID,
    },
    {
      id: BIRDS_RICHNESS_1KM,
      label: t('Birds Richness'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: BIRDS_RICHNESS_1KM,
    },
    {
      id: BIRDS_RARITY_1KM,
      label: t('Birds Rarity'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: BIRDS_RARITY_1KM,
    },
    {
      id: AMPHIB_RARITY_1KM,
      label: t('Amphibians Rarity'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: AMPHIB_RARITY_1KM,
    },
    {
      id: AMPHIB_RICHNESS_1KM,
      label: t('Amphibians Richness'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: AMPHIB_RICHNESS_1KM,
    },
    {
      id: HUMMINGBIRDS_RARITY,
      label: t('Hummingbirds Rarity'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: HUMMINGBIRDS_RARITY,
    },
    {
      id: HUMMINGBIRDS_RICHNESS,
      label: t('Hummingbirds Richness'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: HUMMINGBIRDS_RICHNESS,
    },
    {
      id: MAMMALS_RICHNESS_1KM,
      label: t('Mammals Richness'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: MAMMALS_RICHNESS_1KM,
    },
    {
      id: MAMMALS_RARITY_1KM,
      label: t('Mammals Rarity'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: MAMMALS_RARITY_1KM,
    },
    {
      id: ANTS_RICHNESS_1KM,
      label: t('Ants Richness'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: ANTS_RICHNESS_1KM,
    },
    {
      id: ANTS_RARITY_1KM,
      label: t('Ants Rarity'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: ANTS_RARITY_1KM,
    },
    {
      id: REPTILES_RARITY_1KM,
      label: t('Reptiles Rarity'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: REPTILES_RARITY_1KM,
    },
    {
      id: REPTILES_RICHNESS_1KM,
      label: t('Reptiles Richness'),
      heatMapImage: '',
      details: `Species richness is the count of species predicted to occur in each 1 km x 1 km cell. Predictions were developed species by species, integrating a range of data inputs including local biodiversity occurrence data and bioclimatic and remote-sensing-supported information.`,
      showDetails: false,
      showLayer: false,
      url: REPTILES_RICHNESS_1KM,
    },
  ]);

  const displayLayer = async (layer) => {
    if (!layer.showLayer) {
      if (layer.portalId) {
        const featureLayer = await EsriFeatureService.getFeatureLayer(
          layer.portalId,
          countryISO,
          layer.id
        );
        setRegionLayers((rl) => ({
          ...rl,
          [layer.id]: featureLayer,
        }));
        map.add(featureLayer, map.layers.length - 1);
      } else if (layer.url) {
        const mapLayers = LAYERS_URLS[layer.url];
        let promises;
        if (Array.isArray(mapLayers)) {
          promises = mapLayers.map(
            async (mapLayer) =>
              new TileLayer({
                url: mapLayer,
                id: layer.id,
                outFields: ['*'],
              })
          );
        } else {
          promises = [
            new TileLayer({
              url: mapLayers,
              id: layer.id,
              outFields: ['*'],
            }),
          ];
        }

        const newLayers = await Promise.all(promises);

        newLayers.forEach((newLayer) => {
          setRegionLayers((rl) => ({
            ...rl,
            [layer.id]: newLayer,
          }));
          map.add(newLayer, map.layers.length - 1);
        });
      }
    } else {
      const layerToRemove = map.layers.items.filter(
        (mapLayer) => mapLayer.id === layer.id
      );

      setRegionLayers((rl) => {
        const { [layer.id]: name, ...rest } = rl;
        return rest;
      });

      layerToRemove.forEach((remove) => {
        map.remove(remove);
      });
    }

    setDataLayers((prevLayers) =>
      prevLayers.map((l) =>
        l.id === layer.id ? { ...l, showLayer: !layer.showLayer } : l
      )
    );
  };

  const showDetails = (layer) => {
    setDataLayers((prevLayers) =>
      prevLayers.map((l) =>
        l.id === layer.id ? { ...l, showDetails: !l.showDetails } : l
      )
    );
  };

  return (
    <div
      className={cx(styles.container, {
        [styles.collapse]: collapse,
      })}
    >
      <button
        type="button"
        className={styles.titleWrapper}
        aria-label={collapse ? t('Expand legend') : t('Collapse legend')}
        onClick={() => setCollapse(!collapse)}
      >
        <span className={styles.title}>{t('Data Layers')}</span>
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: collapse,
          })}
        />
      </button>
      <ul className={styles.layers}>
        {dataLayers &&
          Object.values(dataLayers).map((layer) => (
            <li key={`${layer.id}-${layer.label}`}>
              <div className={styles.dataLayer}>
                <div className={styles.layer}>
                  <div className={styles.title}>
                    <span className={styles.label}>{layer.label}</span>
                    <ArrowIcon className={styles.arrowIcon} />
                  </div>
                  <Switch onChange={() => displayLayer(layer)} />
                </div>
                {layer.id !== LAYER_OPTIONS.INDIGENOUS_LANDS && (
                  <SidebarLegend
                    legendItem={BIODIVERSITY_SLUG}
                    className={styles.legendContainer}
                  />
                )}
                {layer.details && (
                  <div className={styles.details}>
                    <button
                      className={styles.view}
                      type="button"
                      onClick={() => showDetails(layer)}
                      aria-label="Collapse details"
                    >
                      <span>{t('View details')}</span>
                      <ArrowIcon
                        className={cx(styles.arrowIcon, {
                          [styles.isOpened]: !layer.showDetails,
                        })}
                      />
                    </button>
                    {layer.showDetails && (
                      <p dangerouslySetInnerHTML={{ __html: layer.details }} />
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LayerLegendComponent;
