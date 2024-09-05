import React, { useContext, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';
import LayerToggle from 'components/layer-toggle';
import SearchLocation from 'components/search-location';

import EsriFeatureService from 'services/esri-feature-service';

import { SEARCH_TYPES } from 'constants/search-location-constants';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import ArrowIcon from 'icons/arrow_right.svg?react';

import styles from './data-layers-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';

function DataLayerComponent(props) {
  const { map, activeLayers, view, selectedOption } = props;
  const { lightMode } = useContext(LightModeContext);

  const speciesPublicLayers = [
    {
      name: 'Point Observations',
      value: 'pointObservations',
      isChecked: false,
    },
    {
      name: 'Habitat Suitable Range',
      value: 'habitatSuitableRange',
      isChecked: false,
    },
    {
      name: 'Local Inventories',
      value: 'localInventories',
      isChecked: false,
    },
    {
      name: 'Expert Range Maps',
      value: 'expertRangeMap',
      isChecked: false,
    },
    {
      name: 'Regional Checklists',
      value: 'regionalChecklist',
      isChecked: false,
    },
  ];

  const speciesPrivateLayers = [
    {
      name: 'Point Observations',
      value: 'privatePointObservations',
      isChecked: false,
    },
  ];

  const speciesRegionsLayers = [
    {
      name: 'Protected Areas',
      value: 'protectedAreas',
      isChecked: false,
    },
    {
      name: 'Proposed Protected',
      value: 'proposedProtected',
      isChecked: false,
    },
    {
      name: 'Administrative Layers',
      value: 'adminLayers',
      isChecked: false,
    },
  ];

  const [dataLayers, setDataLayers] = useState({});
  const [speciesLayers, setSpeciesLayers] = useState(speciesPublicLayers);

  const isOpened = true;

  const updateOption = (layerName, showHide) => {
    const visibleLayers = speciesLayers.map((l) => {
      if (l.value === layerName) {
        return { ...l, isChecked: showHide };
      }
      return l;
    });
    setSpeciesLayers(visibleLayers);
  };

  const displayLayer = (event) => {
    const layerName = event.value;
    const taxa = 'mammals';
    const scientificname = 'Syncerus caffer';

    const url =
      'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/occurrence_202301_alltaxa_drc_test/FeatureServer/0';

    const layerToShow = speciesLayers.find((l) => l.value === layerName);

    if (!layerToShow.isChecked) {
      EsriFeatureService.getFeatures({
        url,
        whereClause: `taxa = '${taxa}' AND scientificname = '${scientificname}'`,
        returnGeometry: true,
      }).then((features) => {
        const { layer } = features[0];
        setDataLayers({ ...dataLayers, [layerName]: layer });

        updateOption(layerName, true);

        map.add(layer);
      });
    } else {
      const layer = dataLayers[layerName];
      // get remaining layers from object
      const { [layerName]: name, ...rest } = dataLayers;
      // set the update the dataLayers object
      setDataLayers(rest);

      updateOption(layerName, false);

      map.remove(layer);
    }
  };

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>Data Layers</span>
      <hr className={hrTheme.dark} />
      <div className={styles.data}>
        <Button
          type="rectangular"
          className={styles.saveButton}
          label="download data"
        />
        <SearchLocation
          stacked
          searchType={SEARCH_TYPES.full}
          view={view}
          theme="dark"
          width="full"
          parentWidth="380px"
          searchSourceLayerSlug={selectedOption?.slug}
        />
      </div>
      <hr className={hrTheme.dark} />
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => { }}
      >
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: isOpened,
          })}
        />
        <span>Distribute Data: Public</span>
      </button>
      {speciesLayers.map((layer) => (
        <LayerToggle
          map={map}
          option={layer}
          type="checkbox"
          variant="light"
          key={layer.value}
          isChecked={layer.isChecked}
          activeLayers={activeLayers}
          onChange={displayLayer}
          themeCategorySlug={layer.value}
        />
      ))}
      <hr className={hrTheme.dark} />
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => { }}
      >
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: isOpened,
          })}
        />
        <span>Distribute Data: Private</span>
      </button>
      {speciesPrivateLayers.map((layer) => (
        <LayerToggle
          map={map}
          option={layer}
          type="checkbox"
          variant="light"
          key={layer.value}
          isChecked={layer.isChecked}
          activeLayers={activeLayers}
          onChange={displayLayer}
          themeCategorySlug={layer.value}
        />
      ))}
      <hr className={hrTheme.dark} />
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => { }}
      >
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: isOpened,
          })}
        />
        <span>Regions Data</span>
      </button>
      {speciesRegionsLayers.map((layer) => (
        <LayerToggle
          map={map}
          option={layer}
          type="checkbox"
          variant="light"
          key={layer.value}
          isChecked={layer.isChecked}
          activeLayers={activeLayers}
          onChange={displayLayer}
          themeCategorySlug={layer.value}
        />
      ))}
    </section>
  );
}

export default DataLayerComponent;
