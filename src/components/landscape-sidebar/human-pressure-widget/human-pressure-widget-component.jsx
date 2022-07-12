import React from 'react';
import { useT } from '@transifex/react';
import { format } from 'd3-format';
import CheckboxGroup from 'components/checkbox-group';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import styles from './human-pressure-widget-styles.module.scss';

const BarComponent = ({ selectedPressures, totalPressure }) => {
  const f = selectedPressures % 10 === 0 ? '.0%' : '.2%';
  return (
    <div className={styles.barContainer}>
      <div
        className={styles.selectedPressureBar}
        style={{ width: `${Math.round(selectedPressures)}%` }}
      >
        <span className={styles.selectedPressureLabel}>{`${format(f)(
          selectedPressures / 100
        )}`}</span>
      </div>
      <div
        className={styles.nonSelectedPressureBar}
        style={{ width: `${totalPressure}%` }}
      ></div>
      <div className={styles.pressureFreeBar}></div>
    </div>
  );
};

const PressureStatementComponent = ({ totalPressure, biggestPressureName }) => {
  const t = useT();
  return (
    <>
      {!totalPressure || totalPressure === 0 ? (
        <p className={styles.text}>
          {t('There is no land human pressure on the selected area')}
        </p>
      ) : (
        <p className={styles.text}>
          {t('Of the current landscape,')}{' '}
          <b>
            {format('.2%')(totalPressure / 100)}
            {t(' is under human pressure')}
          </b>
          {t(', the majority of which is pressure from ')}
          {biggestPressureName}.
        </p>
      )}
    </>
  );
};

const HumanPressureWidgetComponent = ({
  handleOnClick,
  options,
  checkedOptions,
  selectedPressures,
  totalPressure,
  biggestPressureName,
  pressureFree,
}) => {
  const t = useT();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('Land human pressures in this area')}</h3>
      <DummyBlurWorkaround />
      <PressureStatementComponent
        totalPressure={totalPressure}
        biggestPressureName={biggestPressureName}
      />
      {options && (
        <>
          <BarComponent
            selectedPressures={selectedPressures}
            totalPressure={totalPressure}
          />
          <CheckboxGroup
            options={options}
            handleClick={handleOnClick}
            checkedOptions={checkedOptions}
          />
          {pressureFree && (
            <p className={styles.pressureFreeLabel}>
              {t('Not under pressure ')}
              {pressureFree}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default HumanPressureWidgetComponent;
