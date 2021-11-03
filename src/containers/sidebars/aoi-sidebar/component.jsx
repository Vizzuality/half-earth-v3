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
import { LAND_HUMAN_PRESSURES_SLUG, BIODIVERSITY_SLUG, PROTECTION_SLUG } from 'constants/analyze-areas-constants';

import styles from './styles.module.scss';

const LocalSceneSidebarComponent = ({
  map,
  area,
  speciesData,
  contextualData,
  className,
  landCover,
  population,
  activeLayers,
  climateRegime,
  handlePrintReport,
  handleSceneModeChange,
}) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  return (
    <>
    <section className={styles.headerCard}>
      <Button 
        type='rounded'
        handleClick={handleSceneModeChange}
        Icon={CloseIcon}
        className={styles.backButton}
        tooltipText="Go back to the globe"
      />
      <DummyBlurWorkaround />
      <div className={styles.topRow}>
        <div className={styles.nameWrapper}>
          <p className={styles.areaName}>{contextualData.name}</p>
          {area && <p className={styles.area}>{`${area} `}<span>km<sup>2</sup></span></p>}
        </div>
        <div className={styles.actionButtons}>
          <Button 
            Icon={EditIcon}
            type="icon-square"
            handleClick={() => console.log('edit')}
            tooltipText="Draw a new area"
          />
          <Button 
            Icon={ShareIcon}
            type="icon-square"
            handleClick={setShareModalOpen}
            tooltipText="Share this area"
          />
        </div>
      </div>
    </section>
      <div
        className={cx(styles.container, className)}
      >
        <div className={styles.contextualDataRow}>
          <div className={styles.contextualIndicator} title="population">
            <PopulationIcon />
            <span>{population}</span>
          </div>
          <div className={styles.contextualIndicator} title={`land cover: ${landCover}` }>
            <LandCoverIcon />
            <span>{landCover}</span>
          </div>
          <div className={styles.contextualIndicator}  title={`climate regime: ${climateRegime}` }>
            <ClimateRegimeIcon />
            <span>{climateRegime}</span>
          </div>
        </div>
        <SpeciesCard
          speciesData={speciesData}
        />
        <SidebarCard 
          map={map}
          contextualData={contextualData}
          toggleType='radio'
          activeLayers={activeLayers}
          cardCategory={BIODIVERSITY_SLUG}
          layers={AOI_BIODIVERSITY_TOGGLES}
        />
        <SidebarCard 
          map={map}
          contextualData={contextualData}
          layers={WDPALayers}
          toggleType='checkbox'
          activeLayers={activeLayers}
          cardCategory={PROTECTION_SLUG}
        />
        <SidebarCard 
          map={map}
          contextualData={contextualData}
          toggleType='checkbox'
          activeLayers={activeLayers}
          layers={humanPressuresLandUse}
          cardCategory={LAND_HUMAN_PRESSURES_SLUG}
        />
        <ShareModal
          isOpen={isShareModalOpen}
          setShareModalOpen={setShareModalOpen}
        />
      </div>
    </>
  );
}


export default LocalSceneSidebarComponent;
