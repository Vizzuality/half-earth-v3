import React, { useRef, useState, useEffect } from "react";
import { ReactComponent as MenuIcon } from "icons/menu.svg";
import styles from "./main-menu.module.scss";
import MainMenuContent from "./main-menu-content";

function useClickOutside(ref, callback, exceptionRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        exceptionRef.current &&
        !exceptionRef.current.contains(event.target)
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const MainMenu = ({ className }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useClickOutside(wrapperRef, () => setMenuOpen(false), buttonRef);

  return (
    <>
      <button
        className={styles.mainMenuButton}
        onClick={() => setMenuOpen(true)}
        ref={buttonRef}
        id="main-menu-button"
        aria-haspopup="true"
        aria-controls="main-menu"
        aria-expanded={isMenuOpen}
      >
        <div className={styles.menuTitle}>Menu</div>
        <MenuIcon className={className} />
      </button>
      <MainMenuContent
        open={isMenuOpen}
        ref={wrapperRef}
        setMenuOpen={setMenuOpen}
      />
    </>
  );
};

export default MainMenu;
