import React from "react";
import cx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as CloseIcon } from "icons/menu-close.svg";
import { ReactComponent as TwitterIcon } from "icons/twitter.svg";
import { ReactComponent as InstagramIcon } from "icons/instagram.svg";
import { ReactComponent as FacebookIcon } from "icons/facebook.svg";

import styles from "./main-menu-content.module.scss";

const MainMenuContent = React.forwardRef(({ open, setMenuOpen }, ref) => (
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
              <h2 className={styles.menuItem} role="menuitem">
                Explore data
              </h2>
            </li>
            <li>
              <h2 className={styles.menuItem} role="menuitem">
                Discover Stories
              </h2>
            </li>
            <li>
              <h2 className={styles.menuItem} role="menuitem">
                National Report Cards
              </h2>
            </li>
            <li>
              <h2
                className={cx(styles.menuItem, styles.greyItem)}
                role="menuitem"
              >
                About the map
              </h2>
            </li>
          </ul>
          <ul className={styles.menuActions} role="menubar">
            <li>
              <h3 className={styles.menuAction} role="menuitem">
                SHARE THE HALF-EARTH MAP
              </h3>
            </li>
            <li>
              <h3
                className={cx(styles.menuAction, styles.socialAction)}
                role="menuitem"
              >
                JOIN THE CONVERSATION
                <ul className={styles.socialLinks}>
                  <li className={styles.socialLink}>
                    <TwitterIcon />
                  </li>
                  <li className={styles.socialLink}>
                    <InstagramIcon />
                  </li>
                  <li className={styles.socialLink}>
                    <FacebookIcon />
                  </li>
                </ul>
              </h3>
            </li>
          </ul>
        </div>
      </motion.nav>
    )}
  </AnimatePresence>
));

export default MainMenuContent;
