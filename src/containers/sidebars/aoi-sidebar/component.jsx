import React, { useState } from 'react';
import cx from 'classnames';

import { Loading } from 'he-components';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';

import Button from 'components/button';
import ShareModal from 'components/share-modal';
import LayerToggle from 'components/layer-toggle';
import Legend from 'containers/sidebars/sidebar-legend';
import SourceAnnotation from 'components/source-annotation';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import { humanPressuresLandUse } from 'constants/human-pressures';
import { WDPALayers } from 'constants/protected-areas';
import { LAND_HUMAN_PRESSURES_SLUG, BIODIVERSITY_SLUG } from 'constants/legend-configs';

import checkboxTheme from 'styles/themes/checkboxes-theme.module.scss';
import styles from './styles.module.scss';

const LocalSceneSidebarComponent = ({
  map,
  areaName,
  className,
  activeLayers,
  handlePrintReport,
  percentageProtected,
  handleSceneModeChange,
  percentageUnderPressure,
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
        <div>
          <p>
            What is the biodiversity pattern in this area?
          </p>
          <Legend legendItem={BIODIVERSITY_SLUG} className={styles.legendContainer}/>
          <p>
            Species range maps are summarised in biodiversity richness which informs rarity driving Half-Earth Project’s prioritisation exercise.
          </p>
          <SourceAnnotation
            theme='dark'
            metaDataSources={'RInnan'}
            className={styles.sourceContainer}
          />
        </div>
        <div className={styles.togglesContainer}>
          {WDPALayers.map(layer => (
            <LayerToggle
              key={layer.value}
              map={map}
              option={layer}
              type='checkbox'
              activeLayers={activeLayers}
              optionsSelected={[]}
              theme={checkboxTheme.landPressures}
              onChange={() => {}}
            />
          ))}
        </div>
      </SidebarCardWrapper>
      <SidebarCardWrapper>
        <div>
          <p>
            What is already protected in this area?
          </p>
          <p>
            {`Of the current area, ${percentageProtected} is under protection, the majority of which are protected areas.`}
          </p>
          <SourceAnnotation
            theme='dark'
            metaDataSources={' WDPA, OECM & RAISG.'}
            className={styles.sourceContainer}
          />
        </div>
        <div className={styles.togglesContainer}>
          {WDPALayers.map(layer => (
            <LayerToggle
              key={layer.value}
              map={map}
              option={layer}
              type='checkbox'
              activeLayers={activeLayers}
              optionsSelected={[]}
              theme={checkboxTheme.landPressures}
              onChange={() => {}}
            />
          ))}
        </div>
      </SidebarCardWrapper>
      <SidebarCardWrapper>
        <div>
          <p>How are humans affecting this area?</p>
          <Legend legendItem={LAND_HUMAN_PRESSURES_SLUG} className={styles.legendContainer}/>
          <p>
            {`Of the current area, ${percentageUnderPressure} is under human pressure, the majority of which are pressures from irrigated agriculture.`}
          </p>
          <SourceAnnotation
            theme='dark'
            metaDataSources={' WDPA, OECM & RAISG.'}
            className={styles.sourceContainer}
          />
        </div>
        <div className={styles.togglesContainer}>
          {humanPressuresLandUse.map(layer => (
            <LayerToggle
              key={layer.value}
              map={map}
              option={layer}
              type='checkbox'
              activeLayers={activeLayers}
              optionsSelected={[]}
              theme={checkboxTheme.landPressures}
              onChange={() => {}}
            />
          ))}
        </div>
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
