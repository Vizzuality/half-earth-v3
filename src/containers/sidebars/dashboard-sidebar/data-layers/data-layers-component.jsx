import React, { useContext, useEffect, useState } from 'react';
import { useT } from '@transifex/react';
import cx from 'classnames';
import { Loading } from 'he-components';

import LayerToggle from 'components/layer-toggle';

import SpeciesInfoContainer from '../species-info';
import EsriFeatureService from 'services/esri-feature-service';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import ArrowIcon from 'icons/arrow_right.svg?react';

import styles from './data-layers-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';
import DataLayersGroupedList from './grouped-list';

function DataLayerComponent(props) {
  const t = useT();
  const { map, activeLayers, view, selectedOption, speciesInfo, dataLayerData } = props;

  const { lightMode } = useContext(LightModeContext);

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

  const isOpened = true;

  const [dataLayers, setDataLayers] = useState({});
  const [dataPoints, setDataPoints] = useState();
  const [privateDataPoints, setPrivateDataPoints] = useState({
    'Point Observations': {
      items: [],
      total_no_rows: 0,
      isActive: false,
      showChildren: false,
    }
  });
  const [regionsData, setRegionsData] = useState({
    'Protected Areas': {
      items: [],
      total_no_rows: 0,
      isActive: false,
      showChildren: false,
    },
    'Proposed Protection': {
      items: [],
      total_no_rows: 0,
      isActive: false,
      showChildren: false,
    },
    'Administrative Layers': {
      items: [],
      total_no_rows: 0,
      isActive: false,
      showChildren: false,
    },
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!dataLayerData) return;
    setDataPoints(groupByTypeTitle(dataLayerData));

  }, [dataLayerData]);

  useEffect(() => {
    if (!dataPoints) return;
    setIsLoading(false);
  }, [dataPoints]);

  const groupByTypeTitle = (arr) => {
    return arr.reduce((acc, obj) => {
      const key = obj.type_title;
      if (!acc[key]) {
        acc[key] = {
          items: [],
          total_no_rows: 0,
          isActive: false,
          showChildren: false,
        };
      }
      obj.isActive = false;
      acc[key].items.push(obj);
      acc[key].total_no_rows += obj.no_rows || 0; // Summing the no_rows property
      return acc;
    }, {});
  }

  const updateOption = (layerName, showHide) => {
    const visibleLayers = speciesLayers.map((l) => {
      if (l.value === layerName) {
        return { ...l, isChecked: showHide };
      }
      return l;
    });
    setSpeciesLayers(visibleLayers);
  };

  const updateLayer = (event) => {
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
      <span className={styles.sectionTitle}>{t('Data Layers')}</span>
      <hr className={hrTheme.dark} />

      <SpeciesInfoContainer speciesInfo={speciesInfo} />
      <hr className={hrTheme.dark} />
      {isLoading && <Loading height={200} />}
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => { }}
      >
        <span>{t('Species Data: Public')}</span>
      </button>
      {!isLoading && dataPoints && <DataLayersGroupedList
        dataPoints={dataPoints}
        map={map}
        setDataPoints={setDataPoints} />}

      <hr className={hrTheme.dark} />
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => { }}
      >
        <span>{t('Species Data: Private')}</span>
      </button>
      <DataLayersGroupedList
        dataPoints={privateDataPoints}
        map={map}
        setDataPoints={setPrivateDataPoints} />
      <hr className={hrTheme.dark} />
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => { }}
      >
        <span>{t('Regions Data')}</span>
      </button>
      <DataLayersGroupedList
        dataPoints={regionsData}
        map={map}
        setDataPoints={setRegionsData} />
    </section>
  );
}

export default DataLayerComponent;
