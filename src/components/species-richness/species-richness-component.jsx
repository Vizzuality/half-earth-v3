import React, { useContext, useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import cx from 'classnames';
import last from 'lodash/last';

import AmphibiansBlack from 'images/dashboard/amphibian_icon_black.png?react';
import AmphibiansWhite from 'images/dashboard/amphibian_icon_white.png?react';
import BirdsBlack from 'images/dashboard/bird_icon_black.png?react';
import BirdsWhite from 'images/dashboard/bird_icon_white.png?react';
import MammalsBlack from 'images/dashboard/mammal_icon_black.png?react';
import MammalsWhite from 'images/dashboard/mammal_icon_white.png?react';
import ReptilesBlack from 'images/dashboard/reptile_icon_black.png?react';
import ReptilesWhite from 'images/dashboard/reptile_icon_white.png?react';

import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../containers/sidebars/dashboard-trends-sidebar/dashboard-trends-sidebar-component';
import compStyles from '../../containers/sidebars/dashboard-trends-sidebar/spi/score-distibutions/score-distributions-spi-styles.module.scss';
import { LightModeContext } from '../../context/light-mode';
import SpiArcChartComponent from '../charts/spi-arc-chart/spi-arc-chart-component';

import styles from './species-richness-styles.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SpeciesRichnessComponent(props) {
  const t = useT();
  const {
    selectedProvince,
    activeTrend,
    provinces,
    countryData,
    shiActiveTrend,
    shiCountryData,
    shi,
  } = props;

  const { lightMode } = useContext(LightModeContext);
  const [scores, setScores] = useState({
    birds: {
      count: 0,
      total: 0,
      percentage: 0,
    },
    mammals: {
      count: 0,
      total: 0,
      percentage: 0,
    },
    reptiles: {
      count: 0,
      total: 0,
      percentage: 0,
    },
    amphibians: {
      count: 0,
      total: 0,
      percentage: 0,
    },
  });
  const [labelType, setLabelType] = useState('SPI');
  const [data, setData] = useState();
  const [titleText, setTitleText] = useState();

  const getPercentage = (species) => {
    const { count } = scores[species];
    return [count, 100 - count];
  };

  const getScores = () => {
    let formattedData = [];
    if (selectedProvince && activeTrend === PROVINCE_TREND) {
      const regionData = provinces.find(
        (region) => region.region_name === selectedProvince.region_name
      );
      formattedData = regionData;
    } else {
      formattedData = last(countryData);
    }

    formattedData = data;

    if (formattedData) {
      if (shi) {
        let filterValue = 'XXX';
        if (selectedProvince && shiActiveTrend === PROVINCE_TREND) {
          filterValue = selectedProvince.iso3_regional;
        }
        // eslint-disable-next-line camelcase
        const { habitat_score_taxa, nspecies } = shiCountryData.find(
          (sc) => sc.iso3_regional === filterValue
        );

        const values = JSON.parse(habitat_score_taxa)[0];
        const total = JSON.parse(nspecies)[0];

        setScores({
          birds: {
            count: values.birds,
            total: total.birds,
          },
          mammals: {
            count: values.mammals,
            total: total.mammals,
          },
          reptiles: {
            count: values.reptiles,
            total: total.reptiles,
          },
          amphibians: {
            count: values.amphibians,
            total: total.amphibians,
          },
        });
      } else {
        const {
          BirdSpeciesRichness,
          BirdSPI,
          MammalSpeciesRichness,
          MammalSPI,
          ReptileSpeciesRichness,
          ReptileSPI,
          AmphibianSpeciesRichness,
          AmphibianSPI,
        } = formattedData;

        setScores({
          birds: {
            count: BirdSPI,
            total: BirdSpeciesRichness,
          },
          mammals: {
            count: MammalSPI,
            total: MammalSpeciesRichness,
          },
          reptiles: {
            count: ReptileSPI,
            total: ReptileSpeciesRichness,
          },
          amphibians: {
            count: AmphibianSPI,
            total: AmphibianSpeciesRichness,
          },
        });
      }
    }
  };

  const emptyArcColor = lightMode
    ? getCSSVariable('dark-opacity')
    : getCSSVariable('white-opacity-20');

  const birdData = {
    labels: [t('Birds'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: getPercentage('birds'),
        backgroundColor: [getCSSVariable('birds'), emptyArcColor],
        borderColor: [getCSSVariable('birds'), emptyArcColor],
        borderWidth: 1,
      },
    ],
  };

  const mammalsData = {
    labels: [t('Mammals'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: getPercentage('mammals'),
        backgroundColor: [getCSSVariable('mammals'), emptyArcColor],
        borderColor: [getCSSVariable('mammals'), emptyArcColor],
        borderWidth: 1,
      },
    ],
  };

  const reptilesData = {
    labels: [t('Reptiles'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: getPercentage('reptiles'),
        backgroundColor: [getCSSVariable('reptiles'), emptyArcColor],
        borderColor: [getCSSVariable('reptiles'), emptyArcColor],
        borderWidth: 1,
      },
    ],
  };

  const amphibianData = {
    labels: [t('Amphibians'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: getPercentage('amphibians'),
        backgroundColor: [getCSSVariable('amphibians'), emptyArcColor],
        borderColor: [getCSSVariable('amphibians'), emptyArcColor],
        borderWidth: 1,
      },
    ],
  };

  const getData = () => {
    if (shi) {
      setLabelType(t('SHI'));
      setData(shiCountryData);

      if (shiActiveTrend === NATIONAL_TREND || !selectedProvince) {
        setTitleText(`NATIONAL ${labelType} ${t('BY TAXONOMIC GROUP')}`);
      } else if (shiActiveTrend === PROVINCE_TREND && selectedProvince) {
        setTitleText(
          `${selectedProvince?.region_name} ${labelType} ${t(
            'BY TAXONOMIC GROUP'
          )}`
        );
      }
    } else {
      setLabelType(t('SPI'));
      setData(countryData);

      if (activeTrend === NATIONAL_TREND || !selectedProvince) {
        setTitleText(`NATIONAL ${labelType} ${t('BY TAXONOMIC GROUP')}`);
      } else if (activeTrend === PROVINCE_TREND && selectedProvince) {
        setTitleText(
          `${selectedProvince?.region_name} ${labelType} ${t(
            'BY TAXONOMIC GROUP'
          )}`
        );
      }
    }

    getScores();
  };

  useEffect(() => {
    if (!countryData.length && !shiCountryData.length) return;
    getData();
  }, [countryData, shiCountryData]);

  useEffect(() => {
    if (!selectedProvince) return;
    getData();
  }, [selectedProvince, activeTrend, shiActiveTrend]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={compStyles.title}>{titleText}</div>
      <div className={styles.spis}>
        <SpiArcChartComponent
          value={scores.birds.count}
          scores={scores}
          data={birdData}
          img={lightMode ? BirdsBlack : BirdsWhite}
          species="birds"
        />
        <SpiArcChartComponent
          value={scores.mammals.count}
          scores={scores}
          data={mammalsData}
          img={lightMode ? MammalsBlack : MammalsWhite}
          species="mammals"
        />
        <SpiArcChartComponent
          value={scores.reptiles.count}
          scores={scores}
          data={reptilesData}
          img={lightMode ? ReptilesBlack : ReptilesWhite}
          species="reptiles"
        />
        <SpiArcChartComponent
          value={scores.amphibians.count}
          scores={scores}
          data={amphibianData}
          img={lightMode ? AmphibiansBlack : AmphibiansWhite}
          species="amphibians"
        />
      </div>
    </div>
  );
}

export default SpeciesRichnessComponent;
