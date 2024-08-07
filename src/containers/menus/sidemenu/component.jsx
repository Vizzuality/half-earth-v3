import { useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import ZoomControls from 'containers/menus/sidemenu/zoom-controls';
import HelpModal from 'containers/modals/help-modal';

import Button from 'components/button';
import SearchLocation from 'components/search-location';
import ShareModal from 'components/share-modal';
import SideMenuLanguageSwitcher from 'components/sidemenu-language-switcher';

import { SEARCH_TYPES } from 'constants/search-location-constants';

import styles from './styles.module';

import HelpIcon from 'icons/help.svg?react';
import SearchIcon from 'icons/search-menu.svg?react';
import ShareIcon from 'icons/share.svg?react';

function SideMenu({
  map,
  view,
  isNotMapsList,
  hidden,
  selectedAnalysisLayer,
  blur,
}) {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isSearcherOpen, setSearcherOpen] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const hiddenWidget = hidden;
  return (
    <div
      className={cx(styles.menuContainer, {
        [styles.blur]: blur,
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
            searchSourceLayerSlug={selectedAnalysisLayer}
            hasResetButton
            handleCloseButton={() => setSearcherOpen(false)}
            setSearcherOpen={setSearcherOpen}
            searchType={SEARCH_TYPES.simple}
            className={{
              inputContainer: styles.searchLocation,
              placeholderIcon: styles.placeholderIcon,
            }}
          />
        </div>
      )}

      <ZoomControls
        map={map}
        view={view}
        isNotMapsList={isNotMapsList}
        hidden={hiddenWidget}
      />

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
        handleClick={() => setShareModalOpen(true)}
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
  isNotMapsList: PropTypes.bool,
  map: PropTypes.shape(),
  view: PropTypes.shape(),
};

SideMenu.defaultProps = {
  blur: false,
  hidden: false,
  isNotMapsList: true,
  map: null,
  view: null,
};

export default SideMenu;
