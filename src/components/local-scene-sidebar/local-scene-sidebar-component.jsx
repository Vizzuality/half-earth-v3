import React, { useState } from 'react';
import cx from 'classnames';
import { Loading } from 'he-components';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';

import Tabs from 'components/tabs';
import Button from 'components/button';
import ShareModal from 'components/share-modal';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import OverviewSidebar from './overview-sidebar';
import ChallengesSidebar from './challenges-sidebar';
import RankingSidebar from './ranking-sidebar';

import animationStyles from 'styles/common-animations.module.scss';
import styles from './local-scene-sidebar-styles.module.scss';

import { 
  LOCAL_SCENE_TABS_SLUGS,
  LOCAL_SCENE_TABS,
  LOCAL_SCENE_DEFAULT_TAB 
} from 'constants/ui-params';

const LocalSceneSidebarComponent = ({
  className,
  countryISO,
  countryData,
  countryName,
  handlePrintReport,
  handleSourceClick,
  handleTabSelection,
  isFullscreenActive,
  localSceneActiveTab,
  handleSceneModeChange,
}) => {
  const sidebarHidden = isFullscreenActive;
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  return (
    <div
      className={cx(styles.container, className, {
        [animationStyles.leftHidden]: sidebarHidden
      })}
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
        <img className={styles.flag} src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`} alt="" />
        {countryName && <p className={styles.countryName}>{countryName}</p>}
      </div>
      <Tabs
        tabs={LOCAL_SCENE_TABS}
        onClick={handleTabSelection}
        className={styles.tabsContainer}
        defaultTabSlug={localSceneActiveTab || LOCAL_SCENE_DEFAULT_TAB}
      />
      {!countryData ? (
        <div className={styles.loading}>
          <span className={styles.loadingText}>{`Loading country information...`}</span>
          <Loading />
        </div>
      ) : (
        <div className={styles.scrollableArea}>
          {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.OVERVIEW && 
            <OverviewSidebar 
              countryISO={countryISO}
              handleSourceClick={handleSourceClick}
            />
          }
          {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.CHALLENGES && 
            <ChallengesSidebar 
              countryISO={countryISO}
              handleSourceClick={handleSourceClick}
            />
          }
          {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.RANKING && 
            <RankingSidebar 
              countryISO={countryISO}
            />
          }
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
        </div>
      )}
    </div>
  );
}


export default LocalSceneSidebarComponent;
