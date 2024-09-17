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
  const { countryData, taxaData } = props;

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
    const { count, total } = scores[species];
    // const percent = (count / total) * 100 || 0;
    // return [percent, 100 - percent];

    return [count, 100 - count];
  };

  // useEffect(() => {
  //   if (countryData) {
  //     const {
  //       endemic_birds,
  //       birds,
  //       endemic_mammals,
  //       mammals,
  //       endemic_reptiles,
  //       reptiles,
  //       endemic_amphibians,
  //       amphibians,
  //     } = countryData;

  //     setScores({
  //       birds: {
  //         count: endemic_birds,
  //         total: birds,
  //       },
  //       mammals: {
  //         count: endemic_mammals,
  //         total: mammals,
  //       },
  //       reptiles: {
  //         count: endemic_reptiles,
  //         total: reptiles,
  //       },
  //       amphibians: {
  //         count: endemic_amphibians,
  //         total: amphibians,
  //       },
  //     });
  //   }
  // }, [countryData]);

  useEffect(() => {
    if (!taxaData) return;
    setScores({
      birds: {
        count: taxaData.birdData[0].values.spi_values[taxaData.birdData[0].values.spi_values.length - 1][1],
        total: taxaData.birdData[0].nspecies,
      },
      mammals: {
        count: taxaData.mammalData[0].values.spi_values[taxaData.mammalData[0].values.spi_values.length - 1][1],
        total: taxaData.mammalData[0].nspecies,
      },
      reptiles: {
        count: taxaData.reptileData[0].values.spi_values[taxaData.reptileData[0].values.spi_values.length - 1][1],
        total: taxaData.reptileData[0].nspecies,
      },
      amphibians: {
        count: taxaData.amphibianData[0].values.spi_values[taxaData.amphibianData[0].values.spi_values.length - 1][1],
        total: taxaData.amphibianData[0].nspecies,
      },
    });

  }, [taxaData])

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
