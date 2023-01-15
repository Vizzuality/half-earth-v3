/* eslint-disable camelcase */
import React from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import Button from 'components/button';

import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as MammalsIcon } from 'icons/taxa_marine_mammals.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';

import styles from './vertebrates-styles.module.scss';

function Indicators({ countryData, setNRCSidebarView }) {
  const t = useT();
  const locale = useLocale();

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

  const getSpecieText = (txt) => `${txt}`;

  return (
    <div className={styles.vertebratesContainer}>
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
        type="compound"
        handleClick={() => setNRCSidebarView('vertebrates')}
        label={t('All vertebrates')}
        tooltipText={t('Open vertebrates list modal')}
      />
    </div>
  );
}

export default Indicators;
