import React, { useContext, useEffect, useState } from 'react';

import { LightModeContext } from 'context/light-mode';
import last from 'lodash/last';

import EsriFeatureService from 'services/esri-feature-service';

import {
  INITIAL_LAYERS,
  LAYER_OPTIONS,
  LAYER_TITLE_TYPES,
} from 'constants/dashboard-constants';

import BioDiversityComponent from './biodiversity-indicators-component';

const roundUpNumber = (val) => {
  if (val > 10000) {
    return Math.round(val / 1000) * 1000;
  }
  if (val > 1000) {
    return Math.round(val / 100) * 100;
  }
  return val;
};

function BioDiversityContainer(props) {
  const {
    data,
    countryName,
    dataByCountry,
    regionLayers,
    map,
    speciesInfo,
    setRegionLayers,
    countryISO,
  } = props;

  const { lightMode } = useContext(LightModeContext);
  const [selectedTab, setSelectedTab] = useState(2);
  const [habitatScore, setHabitatScore] = useState('0.00');
  const [habitatTableData, setHabitatTableData] = useState([]);
  const [globalHabitatScore, setGlobalHabitatScore] = useState(0);
  const [protectionScore, setProtectionScore] = useState();
  const [globalProtectionScore, setGlobalProtectionScore] = useState('0.00');
  const [protectionTableData, setProtectionTableData] = useState([]);
  const [startYear, setStartYear] = useState(1950);

  const removeRegionLayers = () => {
    map.layers.items.forEach((layer) => {
      if (!INITIAL_LAYERS.includes(layer.id)) {
        map.remove(layer);
      }
    });
  };

  const getCountryScores = (country, lastCountryYearValue, startYearValue) => {
    let countryAreaScore = 0;
    let countryConnectivityScore = 0;

    if (country?.shs[lastCountryYearValue]) {
      countryAreaScore = country?.shs[lastCountryYearValue].propchange;
      if (country?.frag[lastCountryYearValue]?.gisfrag) {
        countryConnectivityScore =
          // eslint-disable-next-line no-unsafe-optional-chaining
          country?.frag[lastCountryYearValue]?.gisfrag / startYearValue;
      }

      return { countryAreaScore, countryConnectivityScore };
    }
    return { countryAreaScore: 0, countryConnectivityScore: 0 };
  };

  const getHabitatScore = () => {
    const country = dataByCountry[countryName];

    // TODO: handle no frag values
    const startYearValue = country?.frag[0]?.gisfrag ?? 0;
    setStartYear(country?.frag[0]?.year ?? country?.shs[0]?.year ?? 2001);
    // eslint-disable-next-line no-unsafe-optional-chaining
    const lastCountryYearValue = country?.shs.length - 1;
    let globalAreaScore = 0;
    let globalConnectivityScore = 0;

    const { countryAreaScore, countryConnectivityScore } = getCountryScores(
      country,
      lastCountryYearValue,
      startYearValue
    );

    if (dataByCountry.Global?.shs[lastCountryYearValue]) {
      globalAreaScore =
        dataByCountry.Global?.shs[lastCountryYearValue].propchange;

      if (dataByCountry.Global?.frag[lastCountryYearValue]?.gisfrag) {
        globalConnectivityScore =
          // eslint-disable-next-line no-unsafe-optional-chaining
          dataByCountry.Global?.frag[lastCountryYearValue].gisfrag /
          startYearValue;
      }
    }

    const scores = {
      habitat: (
        ((countryAreaScore + countryConnectivityScore) / 2) *
        100
      ).toFixed(1),
      globalHabitat: ((globalAreaScore + globalConnectivityScore) / 2) * 100,
    };

    return scores;
  };

  const getHabitatTableData = () => {
    const tableData = [];

    Object.keys(dataByCountry).forEach((country) => {
      let stewardship = 100;
      const habitatCountry = dataByCountry[countryName];

      // const countrySHS = country?.shs;
      const startYearValue = habitatCountry?.frag[0]?.gisfrag ?? 0;
      // eslint-disable-next-line no-unsafe-optional-chaining
      const lastCountryYearValue = habitatCountry?.shs.length - 1;
      const countryData = dataByCountry[country];
      const global2001 = dataByCountry.Global?.shs[0]?.val || 0;
      const country2001 = roundUpNumber(countryData.shs[0]?.val || 0);
      if (country.toUpperCase() === 'GLOBAL') {
        stewardship = 100;
      } else {
        stewardship = (country2001 / global2001) * 100;
      }

      const { countryAreaScore, countryConnectivityScore } = getCountryScores(
        countryData,
        lastCountryYearValue,
        startYearValue
      );
      const shs = ((countryAreaScore + countryConnectivityScore) / 2) * 100;

      if (!Number.isNaN(shs)) {
        tableData.push({
          country,
          stewardship,
          countryAreaScore,
          countryConnectivityScore,
          shs,
        });
      }
    });

    setHabitatTableData(tableData);
  };

  const getProtectionTableData = (spiData) => {
    const tableData = [];

    Object.keys(dataByCountry).forEach((country) => {
      const currentCountryData = last(
        spiData.filter((row) => row.country_name === country)
      );
      // grab stewardship value from habitat table data
      if (currentCountryData) {
        tableData.push({
          country: currentCountryData.country_name,
          stewardship: currentCountryData.stewardship,
          rangeProtected: currentCountryData.range_protected.toFixed(1),
          targetProtected: currentCountryData.target_protected.toFixed(1),
          sps: currentCountryData.shs_score.toFixed(1),
        });
      }
    });

    setProtectionTableData(tableData);
  };

  // get habitat score information
  useEffect(() => {
    if (dataByCountry && data) {
      const { habitat, globalHabitat } = getHabitatScore();
      setHabitatScore(habitat);
      setGlobalHabitatScore(globalHabitat);

      getHabitatTableData();
    }
  }, [dataByCountry, data]);

  // get protection score information
  useEffect(() => {
    if (data && habitatTableData && dataByCountry) {
      getProtectionTableData(data.spiScoreData);

      const globalValues = data.spiScoreData.filter(
        (country) => country.country_name.toUpperCase() === 'GLOBAL'
      );
      const countryData = data.spiScoreData.filter(
        (country) =>
          country.country_name.toUpperCase() === countryName.toUpperCase()
      );

      const scores = {
        protectionScore: last(countryData).shs_score.toFixed(1),
        globalProtectionScore: last(globalValues).shs_score.toFixed(1),
      };

      setProtectionScore(scores.protectionScore);
      setGlobalProtectionScore(scores.globalProtectionScore);
    }
  }, [habitatTableData]);

  useEffect(() => {
    removeRegionLayers();
    const protectedLayers = EsriFeatureService.addProtectedAreaLayer(
      null,
      countryISO
    );
    const layerName = LAYER_OPTIONS.HABITAT;
    const webTileLayer = EsriFeatureService.getXYZLayer(
      speciesInfo.scientificname.replace(' ', '_'),
      layerName,
      LAYER_TITLE_TYPES.TREND
    );
    webTileLayer.then((layer) => {
      setRegionLayers({
        ...regionLayers,
        [layerName]: layer,
        [LAYER_OPTIONS.PROTECTED_AREAS]: protectedLayers,
      });
      map.add(protectedLayers);
      map.add(layer);
    });
  }, []);

  return (
    <BioDiversityComponent
      lightMode={lightMode}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      habitatScore={habitatScore}
      habitatTableData={habitatTableData}
      globalHabitatScore={globalHabitatScore}
      protectionScore={protectionScore}
      globalProtectionScore={globalProtectionScore}
      protectionTableData={protectionTableData}
      startYear={startYear}
      {...props}
    />
  );
}

export default BioDiversityContainer;
