import React, { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ShareModal from "components/share-modal";
import About from "components/about";
import { ReactComponent as CloseIcon } from "icons/menu-close.svg";
import { ReactComponent as TwitterIcon } from "icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "icons/facebook.svg";
import { ReactComponent as InstagramIcon } from "icons/instagram.svg";
import styles from "./main-menu-content.module.scss";
import menuExploreImage from "images/menu-explore.png";
import menuDiscoverImage from "images/menu-discover.png";
import menuNRCImage from "images/menu-national-report-cards.png";
import { DATA, NATIONAL_REPORT_CARD, FEATURED } from "router";

const joinConversationSocialMedia = [
  {
    link: `https://www.facebook.com/halfearth/`,
    icon: FacebookIcon,
    alt: "Facebook",
  },
  {
    link: `https://twitter.com/EOWilsonFndtn`,
    icon: TwitterIcon,
    alt: "Twitter",
  },
  {
    link: `https://www.instagram.com/thehalfearthproject`,
    icon: InstagramIcon,
    alt: "Instagram",
  },
];

const MainMenuContent = React.forwardRef(
  ({ open, setMenuOpen, shareModalRef, browsePage }, ref) => {
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    return (
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: 690 }}
            exit={{ x: 690 }}
            animate={{ x: 0 }}
            transition={{
              easing: "easeOut",
              duration: 0.4,
            }}
            role="navigation"
            className={styles.mainMenuContent}
            ref={ref}
          >
            <button
              className={styles.closeMenuButton}
              onClick={() => setMenuOpen(false)}
              aria-haspopup="true"
              aria-controls="main-menu"
              aria-expanded="true"
            >
              <div className={styles.closeText}>CLOSE MENU</div>
              <CloseIcon />
            </button>
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
                      Explore data
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
                      alt="explore data link"
                      className={styles.menuItemImage}
                    />
                    <h2 className={styles.menuItem} role="menuitem">
                      Discover Stories
                    </h2>
                  </button>
                </li>
                <li>
                  <button
                    className={styles.menuButton}
                    onClick={() => browsePage({ type: NATIONAL_REPORT_CARD })}
                  >
                    <img
                      src={menuNRCImage}
                      alt="explore data link"
                      className={styles.menuItemImage}
                    />
                    <h2 className={styles.menuItem} role="menuitem">
                      National Report Cards
                    </h2>
                  </button>
                </li>
                <li>
                  <About
                    className={styles.menuButton}
                    buttonContentComponent={
                      <h2 className={styles.menuItem} role="menuitem">
                        About the map
                      </h2>
                    }
                  />
                </li>
              </ul>
              <ul className={styles.menuActions} role="menubar">
                <li>
                  <h3 className={styles.menuAction} role="menuitem">
                    <button
                      onClick={setShareModalOpen}
                      className={styles.shareButton}
                    >
                      SHARE THE HALF-EARTH MAP
                    </button>
                    <ShareModal
                      ref={shareModalRef}
                      isOpen={isShareModalOpen}
                      setShareModalOpen={setShareModalOpen}
                    />
                  </h3>
                </li>
                <li>
                  <h3
                    className={cx(styles.menuAction, styles.socialAction)}
                    role="menuitem"
                  >
                    JOIN THE CONVERSATION
                    <ul className={styles.socialLinks}>
                      {joinConversationSocialMedia.map((socialMedia) => (
                        <li className={styles.socialLink}>
                          <button
                            onClick={() => window.open(socialMedia.link)}
                            className={styles.iconBackground}
                            key={socialMedia.alt}
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
  }
);

MainMenuContent.propTypes = {
  open: PropTypes.bool,
  setMenuOpen: PropTypes.func.isRequired,
  shareModalRef: PropTypes.ref,
  browsePage: PropTypes.func.isRequired,
};

export default MainMenuContent;
