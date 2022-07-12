import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { T, useT } from '@transifex/react';

import ShareModal from 'components/share-modal';
import About from 'components/about';
import LanguageSwitcher from 'components/language-switcher';
import { ReactComponent as CloseIcon } from 'icons/menu-close.svg';
import styles from './main-menu-content.module.scss';
import menuExploreImage from 'images/menu-explore.png';
import menuDiscoverImage from 'images/menu-discover.png';
import menuNRCImage from 'images/menu-national-report-cards.png';
import { DATA, NATIONAL_REPORT_CARD_LANDING, FEATURED } from 'router';
import { joinConversationSocialMedia } from 'constants/social-media-constants';

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
});

const REACT_APP_FEATURE_TRANSLATION =
  process.env.REACT_APP_FEATURE_TRANSLATION === 'true';

const MainMenuContent = ({
  open,
  browsePage,
  toggleModal,
  setMenuOpen,
  handleShareClick,
  isShareModalOpen,
  handleJoinConversationClick,
  route,
}) => {
  const t = useT();
  const { page } = route;

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          initial={{ x: 690 }}
          exit={{ x: 690 }}
          animate={{ x: 0 }}
          transition={{
            easing: 'easeOut',
            duration: 0.4,
          }}
          role="navigation"
          className={styles.mainMenuContent}
        >
          <button
            className={styles.closeMenuButton}
            onClick={() => setMenuOpen(false)}
            aria-haspopup="true"
            aria-controls="main-menu"
            aria-expanded="true"
          >
            <div className={styles.closeText}>
              <T _str="CLOSE MENU" />
            </div>
            <CloseIcon />
          </button>
          {REACT_APP_FEATURE_TRANSLATION &&
            page !== 'landing' &&
            <LanguageSwitcher />
          }
          <div className={styles.menuListContainer}>
            <ul className={styles.menuList} role="menubar">
              <li>
                <button
                  className={styles.menuButton}
                  onClick={() => browsePage({ type: DATA })}
                >
                  <img
                    src={menuExploreImage}
                    alt="explore data link"
                    className={styles.menuItemImage}
                  />
                  <h2 className={styles.menuItem} role="menuitem">
                    <T _str="Explore data" />
                  </h2>
                </button>
              </li>
              <li>
                <button
                  className={styles.menuButton}
                  onClick={() => browsePage({ type: FEATURED })}
                >
                  <img
                    src={menuDiscoverImage}
                    alt="discover stories link"
                    className={styles.menuItemImage}
                  />
                  <h2 className={styles.menuItem} role="menuitem">
                    <T _str="Discover Stories" />
                  </h2>
                </button>
              </li>
              <li>
                <button
                  className={styles.menuButton}
                  onClick={() =>
                    browsePage({ type: NATIONAL_REPORT_CARD_LANDING })
                  }
                >
                  <img
                    src={menuNRCImage}
                    alt={t('National Report Card link')}
                    className={styles.menuItemImage}
                  />
                  <h2 className={styles.menuItem} role="menuitem">
                    <T _str="National Report Cards" />
                  </h2>
                </button>
              </li>
              <li>
                <About
                  className={styles.menuButton}
                  buttonContentComponent={
                    <h2
                      className={cx(styles.menuItem, styles.greyItem)}
                      role="menuitem"
                    >
                      <T _str="About the map" />
                    </h2>
                  }
                />
              </li>
            </ul>
            <ul className={styles.menuActions} role="menubar">
              <li>
                <h3 className={styles.menuAction} role="menuitem">
                  <button
                    onClick={handleShareClick}
                    className={styles.shareButton}
                  >
                    <T _str="SHARE THE HALF-EARTH PROJECT MAP" />
                  </button>
                  <ShareModal
                    isOpen={isShareModalOpen}
                    setShareModalOpen={toggleModal}
                  />
                </h3>
              </li>
              <li>
                <h3
                  className={cx(styles.menuAction, styles.socialAction)}
                  role="menuitem"
                >
                  <T _str="JOIN THE CONVERSATION" />
                  <ul className={styles.socialLinks}>
                    {joinConversationSocialMedia.map((socialMedia) => (
                      <li key={socialMedia.alt} className={styles.socialLink}>
                        <button
                          onClick={() =>
                            handleJoinConversationClick(socialMedia)
                          }
                          className={styles.iconBackground}
                        >
                          <socialMedia.icon />
                        </button>
                      </li>
                    ))}
                  </ul>
                </h3>
              </li>
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

MainMenuContent.propTypes = {
  open: PropTypes.bool,
  setMenuOpen: PropTypes.func.isRequired,
  browsePage: PropTypes.func.isRequired,
};

export default process.env.NODE_ENV === 'development'
  ? hot(module)(connect(mapStateToProps, null)(MainMenuContent))
  : connect(mapStateToProps, null)(MainMenuContent);
