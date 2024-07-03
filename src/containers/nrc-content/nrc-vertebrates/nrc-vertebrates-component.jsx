/* eslint-disable camelcase */
import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';

import Button from 'components/button';

import { LAND_MARINE } from 'constants/country-mode-constants';
import { useMobile } from 'constants/responsive';

import uiStyles from 'styles/ui.module.scss';

import AmphibiansIcon from 'icons/taxa_amphibians.svg?react';
import BirdsIcon from 'icons/taxa_birds.svg?react';
import FishesIcon from 'icons/taxa_fishes.svg?react';
import MammalsIcon from 'icons/taxa_mammals.svg?react';
import MammalsMarIcon from 'icons/taxa_marine_mammals.svg?react';
import ReptilesIcon from 'icons/taxa_reptiles.svg?react';

import styles from './nrc-vertebrates-styles.module.scss';

function NRCVertebrates({
  countryData,
  isShrunken,
  selectedLandMarineOption,
  setFullRanking,
  setNRCSidebarView,
  onboardingType,
}) {
  const t = useT();
  const isMobile = useMobile();
  const locale = useLocale();
  const land = selectedLandMarineOption.slug === LAND_MARINE.land;
  const {
    amphibians,
    birds,
    fishes_mar,
    mammals,
    mammals_mar,
    reptiles,
    endemic_amphibians,
    endemic_birds,
    endemic_fishes_mar,
    endemic_mammals,
    endemic_mammals_mar,
    endemic_reptiles,
  } = countryData || {};

  const SPECIES_COMPOSITION = [
    {
      specie: 'amphibians',
      endemic: land && endemic_amphibians,
      total: amphibians,
      icon: AmphibiansIcon,
    },
    {
      specie: 'birds',
      endemic: land && endemic_birds,
      total: birds,
      icon: BirdsIcon,
    },
    {
      specie: 'reptiles',
      endemic: land && endemic_reptiles,
      total: reptiles,
      icon: ReptilesIcon,
    },
    {
      specie: 'mammalsMar',
      endemic: !land && endemic_mammals_mar,
      total: mammals_mar,
      icon: MammalsMarIcon,
    },
    {
      specie: 'mammals',
      endemic: land && endemic_mammals,
      total: mammals,
      icon: MammalsIcon,
    },
    {
      specie: 'fishes',
      endemic: !land && endemic_fishes_mar,
      total: fishes_mar,
      icon: FishesIcon,
    },
  ];

  return (
    <div
      className={cx(styles.vertebratesContainer, {
        [styles.shrunken]: isShrunken,
        [styles.mobile]: isMobile,
      })}
    >
      <div className={styles.endemicCardsContainer}>
        {SPECIES_COMPOSITION.map((s) => {
          const endemicSpecieString = {
            mammals: (
              <T
                _str="endemic mammals"
                _comment="10 {endemic mammals} of 200"
              />
            ),
            mammalsMar: (
              <T
                _str="endemic sea mammals"
                _comment="10 {endemic mammals} of 200"
              />
            ),
            birds: (
              <T _str="endemic birds" _comment="10 {endemic mammals} of 200" />
            ),
            reptiles: (
              <T
                _str="endemic reptiles"
                _comment="10 {endemic mammals} of 200"
              />
            ),
            amphibians: (
              <T
                _str="endemic amphibians"
                _comment="10 {endemic mammals} of 200"
              />
            ),
            fishes: (
              <T _str="endemic fishes" _comment="10 {endemic mammals} of 200" />
            ),
          }[s.specie];
          if (s.endemic === false) return null;
          return (
            s.endemic !== false && (
              <div className={styles.endemicCard} key={s.specie}>
                <s.icon className={styles.endemicIcon} />
                <p>
                  <T
                    _str="{endemicNumber} {endemicSpecie} of {totalNumber}"
                    endemicNumber={getLocaleNumber(s.endemic, locale)}
                    totalNumber={getLocaleNumber(s.total, locale)}
                    endemicSpecie={
                      <>
                        <b>{endemicSpecieString}</b>
                        <br />
                      </>
                    }
                  />
                </p>
              </div>
            )
          );
        })}
      </div>
      {!isMobile && (
        <Button
          className={cx(styles.vertebratesButton, {
            [uiStyles.onboardingDisableInteraction]: !!onboardingType,
          })}
          type="compound"
          handleClick={() => {
            setFullRanking(false);
            setNRCSidebarView('vertebrates');
          }}
          label={t('All vertebrates')}
          tooltipText={t('Open vertebrates list modal')}
        />
      )}
    </div>
  );
}

export default NRCVertebrates;
