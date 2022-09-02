import React, { useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';
import { ReactComponent as HelpIcon } from 'icons/help.svg';
import { ReactComponent as SearchIcon } from 'icons/search-menu.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';

import useIsCursorBottom from 'hooks/use-cursor-bottom';

import ZoomControls from 'containers/menus/sidemenu/zoom-controls';
import HelpModal from 'containers/modals/help-modal';

import Button from 'components/button';
import SearchLocation from 'components/search-location';
import ShareModal from 'components/share-modal';
import SideMenuLanguageSwitcher from 'components/sidemenu-language-switcher';

import { useMobile } from 'constants/responsive';

import uiStyles from 'styles/ui.module.scss';

import styles from './styles.module';

function SideMenu({
  map,
  view,
  hideZoom,
  isNotMapsList,
  hidden,
  onboardingStep,
  selectedOption,
  blur,
}) {
  const isOnMobile = useMobile();
  const cursorBottom = useIsCursorBottom({ });

  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isSearcherOpen, setSearcherOpen] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const hiddenWidget = hidden || isOnMobile;

  return (
    <div
      className={cx(styles.menuContainer, {
        [uiStyles.onboardingOverlay]: typeof onboardingStep === 'number',
        [styles.blur]: blur && cursorBottom,
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
          setSearcherOpen={setSearcherOpen}
          simple
          className={{
            inputContainer: styles.searchLocation,
            placeholderIcon: styles.placeholderIcon,
          }}
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

SideMenu.propTypes = {
  blur: PropTypes.bool,
  hidden: PropTypes.bool,
  hideZoom: PropTypes.bool,
  isNotMapsList: PropTypes.bool,
  map: PropTypes.shape.isRequired,
  onboardingStep: PropTypes.oneOf([1, 2, 3, 4, 5]),
  selectedOption: PropTypes.shape.isRequired,
  view: PropTypes.shape.isRequired,
};

SideMenu.defaultProps = {
  blur: false,
  hidden: false,
  hideZoom: false,
  isNotMapsList: true,
  onboardingStep: null,
};

export default SideMenu;
