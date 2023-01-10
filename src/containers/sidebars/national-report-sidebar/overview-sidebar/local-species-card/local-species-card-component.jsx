import React from 'react';

import { useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

import Button from 'components/button';
import PieChart from 'components/charts/pie-chart';
import HighLightedSpeciesList from 'components/highlighted-species-list';
import SpeciesModal from 'components/species-modal-legacy';

import { MODALS } from 'constants/ui-params';

import { ReactComponent as EndemicOval } from 'icons/endemic_oval.svg';
import { ReactComponent as SpeciesOval } from 'icons/species_oval.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as FishesIcon } from 'icons/taxa_fishes.svg';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as MarMammalsIcon } from 'icons/taxa_marine_mammals.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';

import styles from './local-species-card-styles.module.scss';

function LocalSpeciesCardComponent({
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
}) {
  const t = useT();
  const locale = useLocale();

  return (
    <div className={styles.cardContainer}>
      <SidebarCardWrapper>
        <section className={styles.chartContainer}>
          <h3 className={styles.title}>{t('Species composition:')}</h3>
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
                <span>
                  {`${getLocaleNumber(vertebratesCount, locale) || 0}`}
                </span>
                <span>{t('species')}</span>
              </div>
            </div>
            <div className={styles.chartLegendItem}>
              <EndemicOval />
              <div className={styles.chartLegendItemNameContainer}>
                <span>{endemicVertebratesSentence}</span>
                <span>{t('endemic')}</span>
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
                <span className={styles.speciesName}>
                  {`${getLocaleNumber(amphibians, locale) || 0} ${t(
                    ' amphibians'
                  )}`}
                </span>
                <span>
                  {`${getLocaleNumber(amphibiansEndemic, locale) || 0} ${t(
                    'endemic'
                  )}`}
                </span>
              </div>
            </li>
            {/* reptiles */}
            <li className={styles.legendItem}>
              <span className={styles.reptilesIcon}>
                <ReptilesIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>
                  {`${getLocaleNumber(reptiles || 0, locale)} ${t('reptiles')}`}
                </span>
                <span>
                  {`${getLocaleNumber(reptilesEndemic || 0, locale)} ${t(
                    'endemic'
                  )}`}
                </span>
              </div>
            </li>
            {/* mammals (land) */}
            <li className={styles.legendItem}>
              <span className={styles.mammalsIcon}>
                <MammalsIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>
                  {`${getLocaleNumber(mammals || 0, locale)} ${t(
                    'mammals (land)'
                  )}`}
                </span>
                <span>
                  {`${getLocaleNumber(mammalsEndemic || 0, locale)} ${t(
                    'endemic'
                  )}`}
                </span>
              </div>
            </li>
            {/* mammals (sea) */}
            <li className={styles.legendItem}>
              <span className={styles.marMammalsIcon}>
                <MarMammalsIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>
                  {`${getLocaleNumber(mammalsMar || 0, locale)} ${t(
                    'mammals (sea)'
                  )}`}
                </span>
                <span>
                  {`${getLocaleNumber(mammalsMarEndemic || 0, locale)} ${t(
                    'endemic'
                  )}`}
                </span>
              </div>
            </li>
            {/* birds */}
            <li className={styles.legendItem}>
              <span className={styles.birdsIcon}>
                <BirdsIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>
                  {`${getLocaleNumber(birds || 0, locale)} ${t('birds')}`}
                </span>
                <span>
                  {`${getLocaleNumber(birdsEndemic || 0, locale)} ${t(
                    'endemic'
                  )}`}
                </span>
              </div>
            </li>
            {/* fishes */}
            <li className={styles.legendItem}>
              <span className={styles.fishesIcon}>
                <FishesIcon />
              </span>
              <div className={styles.legendNameContainer}>
                <span className={styles.speciesName}>
                  {`${getLocaleNumber(fishes, locale) || 0} ${t('fishes')}`}
                </span>
                <span>
                  {`${getLocaleNumber(fishesEndemic || 0, locale)}${t(
                    'endemic'
                  )}`}
                </span>
              </div>
            </li>
          </ul>
          <Button
            type="compound"
            handleClick={toggleModal}
            label={t('See all vertebrates')}
            tooltipText={t('Open vertebrates list modal')}
            className={styles.actionButton}
          />
        </section>
        <section>
          <p className={styles.speciesSentence}>{highlightedSpeciesSentence}</p>
          <HighLightedSpeciesList
            countryISO={countryISO}
            highlightedSpeciesRandomNumber={highlightedSpeciesRandomNumber}
          />
          <SpeciesModal
            open={openedModal === MODALS.SPECIES}
            handleModalClose={toggleModal}
          />
        </section>
      </SidebarCardWrapper>
    </div>
  );
}

export default LocalSpeciesCardComponent;
