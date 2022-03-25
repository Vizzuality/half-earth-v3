import React, { useEffect, useState } from "react";
import cx from 'classnames';

import MainMenuContent from "./main-menu-content";
import Tooltip from 'containers/onboarding/tooltip';
import styles from "./main-menu.module.scss";

import { ReactComponent as MenuIcon } from "icons/menu.svg";

const MainMenu = ({ className, onBoardingStep, onBoardingType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onBoardingOverlayMenu = (typeof onBoardingStep === 'number') && (onBoardingStep !== 5) && (onBoardingType === 'priority-places');
  const onBoardingStepOnMenu = (onBoardingType === 'priority-places') && (onBoardingStep === 5);

  useEffect(() => {
    onBoardingStepOnMenu && setMenuOpen(true)
  }, [onBoardingStep, onBoardingType]);

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={cx(className, styles.mainMenuButton, {
          [styles.onBoardingOverlay]: onBoardingOverlayMenu,
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
      {onBoardingStepOnMenu && isMenuOpen && (
        <div style={{ position: 'absolute', zIndex: 20, right: '520px', top: '330px' }}>
          <Tooltip placement='right' />
        </div>
      )
      }
    </div >
  );
};

export default MainMenu;
