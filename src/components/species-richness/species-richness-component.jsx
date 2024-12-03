import React, { useContext, useEffect, useState } from 'react';
import styles from './species-richness-styles.module.scss';
import SpiArcChartComponent from '../charts/spi-arc-chart/spi-arc-chart-component';
import Amphibians from 'images/amphibians.svg';
import Birds from 'images/birds.svg';
import Mammals from 'images/mammals.svg';
import { getCSSVariable } from 'utils/css-utils';
import Reptiles from 'images/reptiles.svg';
import cx from 'classnames';
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
import { LightModeContext } from '../../context/light-mode';
import { useT } from '@transifex/react';
import { PROVINCE_TREND } from '../../containers/sidebars/dashboard-trends-sidebar/dashboard-trends-sidebar-component';

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
  const { taxaData, selectedProvince, activeTrend } = props;

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

  const getPercentage = (species) => {
    const { count } = scores[species];
    return [count, 100 - count];
  };

  useEffect(() => {
    if (!taxaData) return;
    getScores();
  }, [taxaData]);

  const getScores = () => {
    let data = [];
    if (selectedProvince && activeTrend === PROVINCE_TREND) {
      const regionData = taxaData.filter(region => region.region_name === selectedProvince.region_name);
      data = regionData[0]?.taxa_scores;
    } else {
      data = taxaData;
    }

    if (data) {
      const amphibians = data.filter(taxa => taxa.speciesgroup === 'amphibians');
      const birds = data.filter(taxa => taxa.speciesgroup === 'birds');
      const mammals = data.filter(taxa => taxa.speciesgroup === 'mammals');
      const reptiles = data.filter(taxa => taxa.speciesgroup === 'reptiles');

      setScores({
        birds: {
          count: birds[0].mean_protection_score,
          total: birds[0].nspecies,
        },
        mammals: {
          count: mammals[0].mean_protection_score,
          total: mammals[0].nspecies,
        },
        reptiles: {
          count: reptiles[0].mean_protection_score,
          total: reptiles[0].nspecies,
        },
        amphibians: {
          count: amphibians[0].mean_protection_score,
          total: amphibians[0].nspecies,
        },
      });
    }
  };

  const emptyArcColor = lightMode ? getCSSVariable('dark-opacity') : getCSSVariable('white-opacity-20');

  const birdData = {
    labels: [t('Birds'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: getPercentage('birds'),
        backgroundColor: [
          getCSSVariable('birds'),
          emptyArcColor,
        ],
        borderColor: [
          getCSSVariable('birds'),
          emptyArcColor,
        ],
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
        backgroundColor: [
          getCSSVariable('mammals'),
          emptyArcColor,
        ],
        borderColor: [
          getCSSVariable('mammals'),
          emptyArcColor,
        ],
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
        backgroundColor: [
          getCSSVariable('reptiles'),
          emptyArcColor,
        ],
        borderColor: [
          getCSSVariable('reptiles'),
          emptyArcColor,
        ],
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
        backgroundColor: [
          getCSSVariable('amphibians'),
          emptyArcColor,
        ],
        borderColor: [
          getCSSVariable('amphibians'),
          emptyArcColor,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.spis}>
        <SpiArcChartComponent
          value={scores.birds.count}
          scores={scores}
          data={birdData}
          img={Birds}
          species="birds"
        />
        <SpiArcChartComponent
          value={scores.mammals.count}
          scores={scores}
          data={mammalsData}
          img={Mammals}
          species="mammals"
        />
        <SpiArcChartComponent
          value={scores.reptiles.count}
          scores={scores}
          data={reptilesData}
          img={Reptiles}
          species="reptiles"
        />
        <SpiArcChartComponent
          value={scores.amphibians.count}
          scores={scores}
          data={amphibianData}
          img={Amphibians}
          species="amphibians"
        />
      </div>
    </div>
  )
}

export default SpeciesRichnessComponent
