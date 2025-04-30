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
  ZONE_3,
  ZONE_5,
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
    zoneData,
    shiActiveTrend,
    shiCountryData,
    countryISO,
    shi,
  } = props;

  const acceptedZones = ['ACC_3', 'ACC_5', 'MEX', 'PER', 'BRA', 'MDG', 'VNM'];
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
  const [titleText, setTitleText] = useState();

  const getPercentage = (species) => {
    const { count } = scores[species];
    return [count, 100 - count];
  };

  const populateScores = (formattedData) => {
    const data = JSON.parse(formattedData.richness_taxa_spi)[0];
    const spiData = JSON.parse(formattedData.spi_taxa)[0];
    const { reptiles, amphibians, mammals, birds } = data;
    setScores({
      birds: {
        count: +spiData.birds * 100,
        total: +birds,
      },
      mammals: {
        count: +spiData.mammals * 100,
        total: +mammals,
      },
      reptiles: {
        count: +spiData.reptiles * 100,
        total: +reptiles,
      },
      amphibians: {
        count: +spiData.amphibians * 100,
        total: +amphibians,
      },
    });
  };

  const getScores = () => {
    if (countryISO.toLowerCase() === 'eewwf') {
      let formattedData = [];
      formattedData = zoneData.find(
        (item) =>
          item.iso3 === selectedProvince.iso3 &&
          item.region_key === selectedProvince.region_key
      );

      if (formattedData) {
        populateScores(formattedData);
      }
    } else if (shi) {
      let values;
      let total;

      if (
        selectedProvince &&
        (shiActiveTrend === ZONE_5 || shiActiveTrend === ZONE_3)
      ) {
        const data = zoneData.find(
          (item) => item.region_key === selectedProvince.region_key
        );

        if (data) {
          values = JSON.parse(data.habitat_index_taxa)[0];
          total = JSON.parse(data.richness_taxa_shi)[0];

          setScores({
            birds: {
              count: +values.birds * 100,
              total: +total.birds,
            },
            mammals: {
              count: +values.mammals * 100,
              total: +total.mammals,
            },
            reptiles: {
              count: +values.reptiles * 100,
              total: +total.reptiles,
            },
            amphibians: {
              count: +values.amphibians * 100,
              total: +total.amphibians,
            },
          });
        }
      } else {
        let filterValue = 'XXX';
        if (selectedProvince && shiActiveTrend === PROVINCE_TREND) {
          filterValue = selectedProvince.iso3_regional;
        }
        // eslint-disable-next-line camelcase
        const { habitat_score_taxa, nspecies } = shiCountryData.find(
          (sc) => sc.iso3_regional === filterValue
        );

        values = JSON.parse(habitat_score_taxa)[0];
        total = JSON.parse(nspecies)[0];

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
      }
    } else {
      let formattedData = [];
      if (selectedProvince && acceptedZones.includes(activeTrend)) {
        formattedData = zoneData.find(
          (item) => item.region_key === selectedProvince.region_key
        );

        if (formattedData) {
          populateScores(formattedData);
        }
      } else {
        if (selectedProvince && activeTrend === PROVINCE_TREND) {
          const regionData = provinces.find(
            (region) => region.region_name === selectedProvince.region_name
          );
          formattedData = regionData;
        } else {
          formattedData = last(countryData);
        }

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
      if (shiActiveTrend === NATIONAL_TREND || !selectedProvince) {
        setTitleText(`${t('NATIONAL SHI BY TAXONOMIC GROUP')}`);
      } else if (shiActiveTrend === PROVINCE_TREND && selectedProvince) {
        setTitleText(
          `${selectedProvince?.region_name} SHI ${t('BY TAXONOMIC GROUP')}`
        );
      } else if (acceptedZones.includes(activeTrend) && selectedProvince) {
        setTitleText(
          `${selectedProvince?.name} SHI ${t('BY TAXONOMIC GROUP')}`
        );
      }
    } else if (activeTrend === NATIONAL_TREND || !selectedProvince) {
      setTitleText(`${t('NATIONAL SPI BY TAXONOMIC GROUP')}`);
    } else if (activeTrend === PROVINCE_TREND && selectedProvince) {
      setTitleText(
        `${selectedProvince?.region_name} SPI ${t('BY TAXONOMIC GROUP')}`
      );
    } else if (acceptedZones.includes(activeTrend) && selectedProvince) {
      setTitleText(`${selectedProvince?.name} SPI ${t('BY TAXONOMIC GROUP')}`);
    }
    getScores();
  };

  useEffect(() => {
    if (countryISO.toLowerCase() === 'eewwf') {
      getScores();
    }
  }, []);

  useEffect(() => {
    if (!countryData.length || !shiCountryData.length) return;
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
