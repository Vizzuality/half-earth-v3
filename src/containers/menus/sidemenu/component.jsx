import React, { useState } from 'react';

import cx from 'classnames';
import { ReactComponent as HelpIcon } from 'icons/help.svg';
import { ReactComponent as SearchIcon } from 'icons/search-menu.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';

import MinimapWidget from 'containers/menus/sidemenu/minimap-widget';
import ZoomControls from 'containers/menus/sidemenu/zoom-controls';
import HelpModal from 'containers/modals/help-modal';

import Button from 'components/button';
import SearchLocation from 'components/search-location';
import ShareModal from 'components/share-modal';
import SideMenuLanguageSwitcher from 'components/sidemenu-language-switcher';

import { useMobile } from 'constants/responsive';

import uiStyles from 'styles/ui.module.scss';

import styles from './styles.module';

function SideMenuComponent({
  map,
  view,
  hideZoom = false,
  hideMiniMap = true,
  openedModal = null,
  isNotMapsList = true,
  hidden = false,
  onboardingStep,
  selectedOption,
}) {
  const isOnMobile = useMobile();

  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isSearcherOpen, setSearcherOpen] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const hiddenWidget = hidden || isOnMobile;
  return (
    <div
      className={cx(styles.menuContainer, {
        [uiStyles.onboardingOverlay]: typeof onboardingStep === 'number',
      })}
    >
      <Button
        Icon={SearchIcon}
        type="icon-square"
        className={styles.searchBtn}
        handleClick={() => setSearcherOpen(true)}
      />

      {isSearcherOpen && (
        <div className={styles.searcherContainer}>
          <SearchLocation
            view={view}
            theme="dark"
            width="full"
            parentWidth="380px"
            searchSourceLayerSlug={selectedOption.slug}
            hasResetButton
            handleCloseButton={() => setSearcherOpen(false)}
          />
        </div>
      )}

      {!hideZoom && (onboardingStep === null || onboardingStep === undefined) && (
        <ZoomControls
          map={map}
          view={view}
          isNotMapsList={isNotMapsList}
          hidden={hiddenWidget}
        />
      )}
      <Button
        Icon={HelpIcon}
        type="icon-square"
        className={styles.menuBtn}
        handleClick={() => setHelpModalOpen(true)}
      />
      <Button
        Icon={ShareIcon}
        type="icon-square"
        className={styles.menuBtn}
        handleClick={setShareModalOpen}
      />
      {!hideMiniMap && (
        <MinimapWidget
          map={map}
          view={view}
          hidden={hiddenWidget}
          openedModal={openedModal}
        />
      )}
      <SideMenuLanguageSwitcher />
      <ShareModal
        isOpen={isShareModalOpen}
        setShareModalOpen={setShareModalOpen}
      />
      <div className={styles.helpModalWrapper}>
        <HelpModal
          isOpen={isHelpModalOpen}
          setHelpModalOpen={setHelpModalOpen}
        />
      </div>

    </div>
  );
}

export default SideMenuComponent;
