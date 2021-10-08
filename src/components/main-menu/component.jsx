import React, { useState } from "react";
import { ReactComponent as MenuIcon } from "icons/menu.svg";
import styles from "./main-menu.module.scss";
import MainMenuContent from "./main-menu-content";

const MainMenu = ({ className }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        className={styles.mainMenuButton}
        onClick={() => setMenuOpen(true)}
        id="main-menu-button"
        aria-haspopup="true"
        aria-controls="main-menu"
        aria-expanded={isMenuOpen}
      >
        <div className={styles.menuTitle}>Menu</div>
        <MenuIcon className={className} />
      </button>
      <MainMenuContent open={isMenuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default MainMenu;
