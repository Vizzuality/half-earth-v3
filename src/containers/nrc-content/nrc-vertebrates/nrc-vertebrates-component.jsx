/* eslint-disable camelcase */
import React from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';

import Button from 'components/button';

import { useMobile } from 'constants/responsive';

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
  const isMobile = useMobile();
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
          }[s.specie];
          return (
            <div className={styles.endemicCard} key={s.specie}>
              <s.icon className={styles.endemicIcon} />
              <p>
                <T
                  _str="{localNumber} {endemicSpecie} of {totalNumber}"
                  endemicNumber={getLocaleNumber(s.endemic, locale)}
                  localNumber={getLocaleNumber(s.endemic, locale)}
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
          );
        })}
      </div>
      {!isMobile && (
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
      )}
    </div>
  );
}

export default NRCVertebrates;
