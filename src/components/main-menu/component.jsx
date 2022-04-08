import React, { useState } from 'react';
import cx from 'classnames';

import MainMenuContent from './main-menu-content';
import styles from './main-menu.module.scss';

import { ReactComponent as MenuIcon } from 'icons/menu.svg';

const MainMenu = ({ className, onboardingStep, onboardingType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onboardingOverlayMenu =
    (typeof onboardingStep === 'number' &&
      onboardingStep !== 5 &&
      onboardingType === 'priority-places') ||
    (typeof onboardingStep === 'number' &&
      onboardingStep !== 6 &&
      onboardingType === 'national-report-cards');

  return (
    <>
      <button
        className={cx(className, styles.mainMenuButton, {
          [styles.onboardingOverlay]: onboardingOverlayMenu,
        })}
        onClick={() => setMenuOpen(true)}
        id="main-menu-button"
        aria-haspopup="true"
        aria-controls="main-menu"
        aria-expanded={isMenuOpen}
      >
        <div className={styles.menuTitle}>Menu</div>
        <MenuIcon className={styles.menuButton} />
      </button>
      <MainMenuContent open={isMenuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default MainMenu;
