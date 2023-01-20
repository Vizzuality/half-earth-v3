import React from 'react';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import cx from 'classnames';

import NrcContent from 'containers/nrc-content';

import styles from './nrc-mobile-styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function NationalReportCardMobile({
  countryISO,
  countryName,
  chartData,
  hasMetadata,
  countryId,
  handleLandMarineSelection,
  selectedLandMarineOption,
  handleSetFullRanking,
  fullRanking,
}) {
  const t = useT();
  const { marine } = chartData;

  const tabsData = {
    land: {
      text: t('Land'),
    },
    marine: {
      text: t('Marine'),
    },
  };

  return (
    <>
      <div className={styles.container}>
        <NrcContent
          chartData={chartData}
          countryISO={countryISO}
          countryName={countryName}
          countryId={countryId}
          fullRanking={fullRanking}
          setFullRanking={handleSetFullRanking}
          selectedLandMarineOption={selectedLandMarineOption}
          mobile
          landMarineSwitch={
            <div className={styles.switchDataButtons}>
              {Object.keys(tabsData).map((key) => (
                <button
                  key={key}
                  disabled={!marine}
                  type="button"
                  className={cx({
                    [styles.switchDataButton]: true,
                    [styles.switchDataActiveButton]:
                      selectedLandMarineOption.slug === key,
                  })}
                  onClick={() => handleLandMarineSelection(key)}
                >
                  {tabsData[key].text}
                </button>
              ))}
            </div>
          }
        />
      </div>
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default NationalReportCardMobile;
