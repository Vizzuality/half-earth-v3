import React, { useState } from 'react';
import cx from 'classnames';

import { Loading } from 'he-components';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';

import Button from 'components/button';
import ShareModal from 'components/share-modal';
import SidebarCardContent from './sidebar-card-content';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import { humanPressuresLandUse } from 'constants/human-pressures';
import { WDPALayers } from 'constants/protected-areas';
import { AOI_BIODIVERSITY_TOGGLES } from 'constants/biodiversity-layers-constants';
import { LAND_HUMAN_PRESSURES_SLUG, BIODIVERSITY_SLUG } from 'constants/legend-configs';

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
      <SidebarCardWrapper>
        <SidebarCardContent 
          map={map}
          toggleType='radio'
          activeLayers={activeLayers}
          legendItem={BIODIVERSITY_SLUG}
          layers={AOI_BIODIVERSITY_TOGGLES}
        />
      </SidebarCardWrapper>
      <SidebarCardWrapper>
        <SidebarCardContent 
          map={map}
          layers={WDPALayers}
          toggleType='checkbox'
          activeLayers={activeLayers}
        />
      </SidebarCardWrapper>
      <SidebarCardWrapper>
        <SidebarCardContent 
          map={map}
          toggleType='checkbox'
          activeLayers={activeLayers}
          layers={humanPressuresLandUse}
          legendItem={LAND_HUMAN_PRESSURES_SLUG}
        />
      </SidebarCardWrapper>

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
