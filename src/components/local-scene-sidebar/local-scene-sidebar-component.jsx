import React, { useState } from 'react';
import cx from 'classnames';
import { Loading } from 'he-components';

import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';

import Tabs from 'components/tabs';
import Button from 'components/button';
import ShareModal from 'components/share-modal';
import ShareModalButton from 'components/share-button';
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
  countryName,
  countryData,
  handlePrintReport,
  handleSourceClick,
  handleTabSelection,
  isFullscreenActive,
  countryDataLoading,
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
      />
      <DummyBlurWorkaround />
      <div className={styles.nameWrapper}>
        <img className={styles.flag} src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`} alt="" />
        <p className={styles.countryName}>{countryName}</p>
      </div>
      <Tabs
        tabs={LOCAL_SCENE_TABS}
        onClick={handleTabSelection}
        className={styles.tabsContainer}
        defaultTabSlug={localSceneActiveTab || LOCAL_SCENE_DEFAULT_TAB}
      />
      {!countryData ? (
        <div className={styles.loading}>
          <span className={styles.loadingText}>{`Loading ${countryName} information...`}</span>
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
          <div className={styles.actionGroup}>
            <DownloadIcon />
            <button className={styles.actionButton} onClick={handlePrintReport}>
              download this info (pdf)
            </button>
          </div>
          <div className={styles.actionGroup}>
            <ShareModalButton
              variant="longText"
              theme={{ shareText: styles.shareText }}
              setShareModalOpen={setShareModalOpen}
            />
            <ShareModal
              isOpen={isShareModalOpen}
              setShareModalOpen={setShareModalOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}


export default LocalSceneSidebarComponent;
