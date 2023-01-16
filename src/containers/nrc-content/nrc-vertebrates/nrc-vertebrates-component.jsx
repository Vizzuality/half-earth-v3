/* eslint-disable camelcase */
import React, { useMemo } from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';

import Button from 'components/button';

import { getSpeciesGroup } from 'constants/translation-constants';

import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as MammalsIcon } from 'icons/taxa_marine_mammals.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';

import styles from './nrc-vertebrates-styles.module.scss';

function NRCVertebrates({
  countryData,
  setNRCSidebarView,
  isShrunken,
  setFullRanking,
}) {
  const t = useT();
  const locale = useLocale();

  const translatedSpeciesGroup = useMemo(getSpeciesGroup, [locale]);
  const {
    amphibians,
    birds,
    mammals,
    reptiles,
    endemic_amphibians,
    endemic_birds,
    endemic_mammals,
    endemic_reptiles,
  } = countryData || {};

  const SPECIES_COMPOSITION = [
    {
      specie: 'amphibians',
      endemic: endemic_amphibians,
      total: amphibians,
      icon: AmphibiansIcon,
    },
    {
      specie: 'birds',
      endemic: endemic_birds,
      total: birds,
      icon: BirdsIcon,
    },
    {
      specie: 'reptiles',
      endemic: endemic_reptiles,
      total: reptiles,
      icon: ReptilesIcon,
    },
    {
      specie: 'mammals',
      endemic: endemic_mammals,
      total: mammals,
      icon: MammalsIcon,
    },
  ];

  const getSpecieText = (specie) => translatedSpeciesGroup[specie] || specie;

  return (
    <div
      className={cx(styles.vertebratesContainer, {
        [styles.shrunken]: isShrunken,
      })}
    >
      <div className={styles.endemicCardsContainer}>
        {SPECIES_COMPOSITION.map((s) => (
          <div className={styles.endemicCard} key={s.specie}>
            <s.icon className={styles.endemicIcon} />
            <p>
              <T
                _str="{bold} {specie} of {totalNumber}"
                endemicNumber={getLocaleNumber(s.endemic, locale)}
                specie={getSpecieText(s.specie)}
                totalNumber={getLocaleNumber(s.total, locale)}
                bold={
                  <>
                    <b>
                      <T
                        _str={`${getLocaleNumber(s.endemic, locale)} endemic`}
                      />
                    </b>
                    <br />
                  </>
                }
              />
            </p>
          </div>
        ))}
      </div>
      <Button
        className={styles.vertebratesButton}
        type="compound"
        handleClick={() => {
          setFullRanking(false);
          setNRCSidebarView('vertebrates');
        }}
        label={t('All vertebrates')}
        tooltipText={t('Open vertebrates list modal')}
      />
    </div>
  );
}

export default NRCVertebrates;
