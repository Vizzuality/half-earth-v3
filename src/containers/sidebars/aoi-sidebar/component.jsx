import React, { useState } from 'react';
import cx from 'classnames';

import { Loading } from 'he-components';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';

import Button from 'components/button';
import ShareModal from 'components/share-modal';
import SidebarCard from './sidebar-card-content';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import { humanPressuresLandUse } from 'constants/human-pressures';
import { WDPALayers } from 'constants/protected-areas';
import { AOI_BIODIVERSITY_TOGGLES } from 'constants/biodiversity-layers-constants';
import { LAND_HUMAN_PRESSURES_SLUG, BIODIVERSITY_SLUG, PROTECTION_SLUG } from 'constants/analyze-areas-constants';

import styles from './styles.module.scss';

const LocalSceneSidebarComponent = ({
  map,
  areaName,
  className,
  activeLayers,
  handlePrintReport,
  handleSceneModeChange,
}) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  return (
    <div
      className={cx(styles.container, className)}
    >
      <Button 
        type='rounded'
        handleClick={handleSceneModeChange}
        Icon={CloseIcon}
        className={styles.backButton}
        tooltipText="Go back to the globe"
      />
      <DummyBlurWorkaround />
      <div className={styles.nameWrapper}>
        <p className={styles.areaName}>{areaName || 'Custom Area'}</p>
      </div>
      <SidebarCard 
        map={map}
        toggleType='radio'
        activeLayers={activeLayers}
        cardCategory={BIODIVERSITY_SLUG}
        layers={AOI_BIODIVERSITY_TOGGLES}
      />
      <SidebarCard 
        map={map}
        layers={WDPALayers}
        toggleType='checkbox'
        activeLayers={activeLayers}
        cardCategory={PROTECTION_SLUG}
      />
      <SidebarCard 
        map={map}
        toggleType='checkbox'
        activeLayers={activeLayers}
        layers={humanPressuresLandUse}
        cardCategory={LAND_HUMAN_PRESSURES_SLUG}
      />

      {/* <div className={styles.scrollableArea}>
        <Button 
          type='compound'
          Icon={DownloadIcon}
          handleClick={handlePrintReport}
          className={styles.actionButton}
          label="download this info (pdf)"
          tooltipText="Download national data report"
          />
        <Button 
          type='compound'
          Icon={ShareIcon}
          handleClick={setShareModalOpen}
          className={styles.actionButton}
          label="share this info"
          tooltipText="Share the URL to this view"
        />
          <ShareModal
            isOpen={isShareModalOpen}
            setShareModalOpen={setShareModalOpen}
          />
      </div> */}
    </div>
  );
}


export default LocalSceneSidebarComponent;
