import React from 'react';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SpeciesModal from 'components/species-modal';
import PieChart from 'components/charts/pie-chart';
import HighLightedSpeciesList from 'components/highlighted-species-list';
import { MODALS } from 'constants/ui-params';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as MarMammalsIcon } from 'icons/taxa_marine_mammals.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as FishesIcon } from 'icons/taxa_fishes.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as SpeciesOval } from 'icons/species_oval.svg';
import { ReactComponent as EndemicOval } from 'icons/endemic_oval.svg';
import styles from './local-species-card-styles.module.scss';
import Button from 'components/button';

const LocalSpeciesCardComponent = ({
  birds,
  mammals,
  mammalsMar,
  mammalsMarEndemic,
  reptiles,
  fishes,
  fishesEndemic,
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
}) => {
  const { REACT_APP_FEATURE_MARINE } = process.env;
  return (
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
            className={styles.chart}
          />
          <div className={styles.chartLegend}>
            <div className={styles.chartLegendItem}>
              <SpeciesOval />
              <div className={styles.chartLegendItemNameContainer}>
                <span>{`${vertebratesCount}`}</span>
                <span>species</span>
              </div>
            </div>
            <div className={styles.chartLegendItem}>
              <EndemicOval />
              <div className={styles.chartLegendItemNameContainer}>
                <span>{endemicVertebratesSentence}</span>
                <span>endemic</span>
              </div>
            </div>
          </div>

          <ul className={styles.legendList}>
            {/* amphibians */}
            <li className={styles.legendItem}>
              <span className={styles.amphibiansIcon}>
                <AmphibiansIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>{`${amphibians || 0} amphibians`}</span>
                <span>{`${amphibiansEndemic || 0} endemic`}</span>
              </div>
            </li>
            {/* reptiles */}
            <li className={styles.legendItem}>
              <span className={styles.reptilesIcon}>
                <ReptilesIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>{`${reptiles || 0} reptiles`}</span>
                <span>{`${reptilesEndemic || 0} endemic`}</span>
              </div>
            </li>
            {/* mammals (land) */}
            <li className={styles.legendItem}>
              <span className={styles.mammalsIcon}>
                <MammalsIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>{`${mammals || 0} mammals (land)`}</span>
                <span>{`${mammalsEndemic || 0} endemic`}</span>
              </div>
            </li>
            {/* mammals (sea) */}
            {REACT_APP_FEATURE_MARINE && (
              <li className={styles.legendItem}>
                <span className={styles.marMammalsIcon}>
                  <MarMammalsIcon />
                </span>
                <div className={styles.legendNameContainer}>
                  <span className={styles.speciesName}>{`${mammalsMar || 0} mammals (sea)`}</span>
                  <span>{`${mammalsMarEndemic || 0} endemic`}</span>
                </div>
              </li>
            )}
            {/* birds */}
            <li className={styles.legendItem}>
              <span className={styles.birdsIcon}>
                <BirdsIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>{`${birds || 0} birds`}</span>
                <span>{`${birdsEndemic || 0} endemic`}</span>
              </div>
            </li>
            {/* fishes */}
            {REACT_APP_FEATURE_MARINE && (
              <li className={styles.legendItem}>
                <span className={styles.fishesIcon}>
                  <FishesIcon />
                </span>
                <div className={styles.legendNameContainer}>
                  <span className={styles.speciesName}>{`${fishes || 0} fishes`}</span>
                  <span>{`${fishesEndemic || 0} endemic`}</span>
                </div>
              </li>
            )}
          </ul>
          <Button
            type='compound'
            handleClick={toggleModal}
            label="See all vertebrates"
            tooltipText="Open vertebrates list modal"
            className={styles.actionButton}
          />
        </section>
        <section>
          <p
            className={styles.speciesSentence}
          >{highlightedSpeciesSentence}</p>
          <HighLightedSpeciesList
            countryISO={countryISO}
            highlightedSpeciesRandomNumber={highlightedSpeciesRandomNumber}
          />
          <SpeciesModal open={openedModal === MODALS.SPECIES} handleModalClose={toggleModal} />
        </section>
      </SidebarCardWrapper>
    </div>
  )
};

export default LocalSpeciesCardComponent;
