import React from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SpeciesModal from 'components/species-modal';
import PieChart from 'components/charts/pie-chart';
import HighLightedSpeciesList from 'components/highlighted-species-list';
import { MODALS } from 'constants/ui-params';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as SpeciesOval } from 'icons/species_oval.svg';
import { ReactComponent as EndemicOval } from 'icons/endemic_oval.svg';
import styles from './local-species-card-styles.module.scss';
import buttonTheme from 'styles/themes/button-theme.module.scss';
import { Button } from 'he-components';

const LocalSpeciesCardComponent = ({
  birds,
  mammals,
  reptiles,
  chartData,
  countryISO,
  amphibians,
  toggleModal,
  openedModal,
  birdsEndemic,
  mammalsEndemic,
  reptilesEndemic,
  vertebratesCount,
  amphibiansEndemic,
  endemicVertebratesSentence,
  highlightedSpeciesSentence,
  highlightedSpeciesRandomNumber,
}) => (
  <div className={styles.cardContainer}>
    <SidebarCardWrapper>
      <section className={styles.chartContainer}>
        <h3 className={styles.title}>Species composition:</h3>
        <PieChart
          width={260}
          height={260}
          id="local-species-composition"
          data={chartData}
          explodingSliceStroke="none"
          strokeWidth={20}
          regularSliceR={100}
          explodingSliceR={130}
        />
        <div className={styles.chartLegend}>
          <div className={styles.legendItem}>
            <SpeciesOval />
            <span>{`${vertebratesCount}`}</span>
            <span>species</span>
          </div>
          <div className={styles.legendItem}>
            <EndemicOval />
            <span>{endemicVertebratesSentence}</span>
            <span>endemic</span>
          </div>
        </div>
        <div>
          <p className={styles.speciesCount}>
            <span className={styles.amphibiansIcon}>
              <AmphibiansIcon />
            </span>{' '}
            {`${amphibians} amphibians (${amphibiansEndemic} endemic)`}
          </p>
          <p className={styles.speciesCount}>
            <span className={styles.birdsIcon}>
              <BirdsIcon />
            </span>{' '}
            {`${birds} birds (${birdsEndemic} endemic)`}
          </p>
          <p className={styles.speciesCount}>
            <span className={styles.mammalsIcon}>
              <MammalsIcon />
            </span>{' '}
            {`${mammals} mammals (${mammalsEndemic} endemic)`}
          </p>
          <p className={styles.speciesCount}>
            <span className={styles.reptilesIcon}>
              <ReptilesIcon />
            </span>{' '}
            {`${reptiles} reptiles (${reptilesEndemic} endemic)`}
          </p>
        </div>
      </section>
      <section>
        <p
          className={styles.speciesSentence}
        >{highlightedSpeciesSentence}</p>
        <HighLightedSpeciesList
          countryISO={countryISO}
          highlightedSpeciesRandomNumber={highlightedSpeciesRandomNumber}
        />
        <Button theme={buttonTheme} onClick={toggleModal}>
          See all vertebrates
        </Button>
        <SpeciesModal open={openedModal === MODALS.SPECIES} handleModalClose={toggleModal} />
      </section>
    </SidebarCardWrapper>
  </div>
)

export default LocalSpeciesCardComponent;