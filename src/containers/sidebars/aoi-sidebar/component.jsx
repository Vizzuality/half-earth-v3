import React, { useState } from 'react';
import cx from 'classnames';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as LandCoverIcon } from 'icons/land-cover.svg';
import { ReactComponent as PopulationIcon } from 'icons/population.svg';
import { ReactComponent as ClimateRegimeIcon } from 'icons/climate-regime.svg';

import Button from 'components/button';
import ShareModal from 'components/share-modal';
import SidebarCard from './sidebar-card-content';
import SpeciesCard from './species-card';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import { humanPressuresLandUse } from 'constants/human-pressures';
import { WDPALayers } from 'constants/protected-areas';
import { AOI_BIODIVERSITY_TOGGLES } from 'constants/biodiversity-layers-constants';
import {
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG,
  PROTECTION_SLUG,
} from 'constants/analyze-areas-constants';

import styles from './styles.module.scss';

const LocalSceneSidebarComponent = ({
  map,
  area,
  className,
  landCover,
  population,
  speciesData,
  activeLayers,
  climateRegime,
  contextualData,
  shareAoiAnalytics,
  handleSceneModeChange,
}) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const handleShareModalOpen = () => {
    shareAoiAnalytics();
    setShareModalOpen(true);
  };
  return (
    <>
      <section className={styles.headerCard}>
        <Button
          type="rounded"
          handleClick={handleSceneModeChange}
          Icon={CloseIcon}
          className={styles.backButton}
          tooltipText="Go back to the globe"
        />
        <DummyBlurWorkaround />
        <div className={styles.topRow}>
          <div className={styles.nameWrapper}>
            <p className={styles.areaName}>{contextualData.areaName}</p>
            {area && (
              <p className={styles.area}>
                {`${area} `}
                <span>
                  km<sup>2</sup>
                </span>
              </p>
            )}
          </div>
          <div className={styles.actionButtons}>
            {contextualData.isCustom && (
              <Button
                Icon={EditIcon}
                type="icon-square"
                handleClick={() => console.log('edit')}
                tooltipText="Edit the name of this area"
              />
            )}
            <Button
              Icon={ShareIcon}
              type="icon-square"
              handleClick={handleShareModalOpen}
              tooltipText="Share this area"
            />
          </div>
        </div>
      </section>
      <div className={cx(styles.container, className)}>
        <div className={styles.contextualDataRow}>
          <div className={styles.contextualIndicator} title="population">
            <PopulationIcon />
            <span>{population}</span>
          </div>
          <div
            className={styles.contextualIndicator}
            title={`land cover: ${landCover}`}
          >
            <LandCoverIcon />
            <span>{landCover}</span>
          </div>
          <div
            className={styles.contextualIndicator}
            title={`climate regime: ${climateRegime}`}
          >
            <ClimateRegimeIcon />
            <span>{climateRegime}</span>
          </div>
        </div>
        <SpeciesCard area={area} speciesData={speciesData} />
        <SidebarCard
          map={map}
          toggleType="radio"
          activeLayers={activeLayers}
          contextualData={contextualData}
          cardCategory={BIODIVERSITY_SLUG}
          layers={AOI_BIODIVERSITY_TOGGLES}
          // displayWarning={area < 10000}
        />
        <SidebarCard
          map={map}
          layers={WDPALayers}
          toggleType="checkbox"
          activeLayers={activeLayers}
          cardCategory={PROTECTION_SLUG}
          contextualData={contextualData}
        />
        <SidebarCard
          map={map}
          toggleType="checkbox"
          activeLayers={activeLayers}
          layers={humanPressuresLandUse}
          contextualData={contextualData}
          cardCategory={LAND_HUMAN_PRESSURES_SLUG}
        />
        <section className={styles.completeDatabaseWrapper}>
          <p>Do you have more information about this particular area?</p>
          <a
            className={styles.link}
            href="https://mol.org/upload"
            target="_blank"
            rel="noopener noreferrer"
          >
            help us complete our database
          </a>
        </section>
        <ShareModal
          isOpen={isShareModalOpen}
          setShareModalOpen={setShareModalOpen}
        />
      </div>
    </>
  );
};

export default LocalSceneSidebarComponent;
