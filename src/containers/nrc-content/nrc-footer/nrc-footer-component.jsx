import React from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import Button from 'components/button';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';

import styles from './nrc-footer-styles.module.scss';

function Footer({ goToAnalyzeAreas, isShrunken }) {
  const t = useT();
  return (
    <div className={cx(styles.footer, { [styles.shrunken]: isShrunken })}>
      <p className={styles.footerText}>
        {t(
          'For a detailed analysis check the country analysis of the Explore Data section.'
        )}
      </p>
      <Button
        type="icon-square"
        Icon={AnalyzeAreasIcon}
        handleClick={goToAnalyzeAreas}
        className={styles.analyzeBtn}
        tooltipText={t('Go to Explore Data section')}
        label={t('ANALYZE AREA')}
      />
    </div>
  );
}

export default Footer;
