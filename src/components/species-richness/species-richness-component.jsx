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

import Amphibians from 'images/amphibians.svg';
import Birds from 'images/birds.svg';
import Mammals from 'images/mammals.svg';
import Reptiles from 'images/reptiles.svg';

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
  const { selectedProvince, activeTrend, provinces, countryData } = props;

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

  const [titleText, setTitleText] = useState(
    `NATIONAL ${t(' SPI BY TAXONOMIC GROUP')}`
  );

  const getPercentage = (species) => {
    const { count } = scores[species];
    return [count, 100 - count];
  };

  const getScores = () => {
    let data = [];
    if (selectedProvince && activeTrend === PROVINCE_TREND) {
      const regionData = provinces.find(
        (region) => region.region_name === selectedProvince.region_name
      );
      data = regionData;
    } else {
      data = last(countryData);
    }

    if (data) {
      const {
        BirdSpeciesRichness,
        BirdSPI,
        MammalSpeciesRichness,
        MammalSPI,
        ReptileSpeciesRichness,
        ReptileSPI,
        AmphibianSpeciesRichness,
        AmphibianSPI,
      } = data;

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
  };

  useEffect(() => {
    if (!selectedProvince) return;
    getScores();
    if (activeTrend === NATIONAL_TREND || !selectedProvince) {
      setTitleText(`NATIONAL ${t(' SPI BY TAXONOMIC GROUP')}`);
    } else if (activeTrend === PROVINCE_TREND && selectedProvince) {
      setTitleText(
        `${selectedProvince?.region_name} ${t('SPI BY TAXONOMIC GROUP')}`
      );
    }
  }, [selectedProvince, activeTrend]);

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

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={compStyles.title}>{titleText}</div>
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
  );
}

export default SpeciesRichnessComponent;
