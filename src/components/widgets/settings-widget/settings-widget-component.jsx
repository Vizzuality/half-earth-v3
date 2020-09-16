import React, { useRef, useEffect } from 'react';
import { ReactComponent as SettingsIcon } from 'icons/icon_settings.svg';
import ReactTooltip from 'react-tooltip';
import styles from './settings-widget.module.scss';

function useClickOutside(ref, callback, exceptionRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (ref.current && !ref.current.contains(event.target) && !exceptionRef) ||
        !exceptionRef.current.contains(event.target)
      ) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const SettingsWidgetComponent = () => {
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  useClickOutside(wrapperRef, () => setTooltipOpen(false), buttonRef);
  return (
    <div className={styles.settingsContainer}>
      <button
        data-tip
        data-for="settingsUi"
        className={styles.settingsButton}
        ref={buttonRef}
        onClick={() => {
          setTooltipOpen(!isTooltipOpen);
        }}
        data-effect="solid"
        data-delay-show={0}
      >
        <SettingsIcon />
      </button>
      <ReactTooltip
        id="settingsUi"
        className="infoTooltipStyle"
        place="left"
        globalEventOff="click"
      >
        Settings
      </ReactTooltip>
      {isTooltipOpen && (
        <div ref={wrapperRef} className={styles.settingsTooltip}>
          MAP SETTINGS
        </div>
      )}
    </div>
  );
};

export default SettingsWidgetComponent;
