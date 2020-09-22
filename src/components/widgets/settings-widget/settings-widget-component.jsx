import React, { useRef, useEffect } from 'react';
import { ReactComponent as SettingsIcon } from 'icons/icon_settings.svg';
import ReactTooltip from 'react-tooltip';
import styles from './settings-widget.module.scss';
import cx from 'classnames';

function useClickOutside(ref, callback, exceptionRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (ref.current && !ref.current.contains(event.target)) &&
        (exceptionRef.current && !exceptionRef.current.contains(event.target))
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

const renderCheckbox = (option, handleChangeLayer) => (
  <div
    key={option.name}
    className={cx(styles.checkboxWrapper, {
      [styles.checkboxWrapperSelected]: option.isChecked
    })}
  >
    <input
      type="checkbox"
      value={option.value}
      name={option.label}
      id={option.value}
      checked={option.isChecked}
      onChange={handleChangeLayer}
    />
    <label
      htmlFor={option.value}
      className={cx(styles.checkbox, {
        [styles.checkboxSelected]: option.isChecked
      })}
    >
      <span className={styles.label}>{option.label}</span>
    </label>
  </div>
);

const SettingsWidgetComponent = ({
  layers,
  handleChangeLayer,
  hidden
}) => {
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  useClickOutside(wrapperRef, () => setMenuOpen(false), buttonRef);
  return (
    <div className={cx({ [styles.hidden]: hidden })}>
      <button
        data-tip
        data-for="settingsUi"
        className={styles.settingsButton}
        ref={buttonRef}
        onClick={() => {
          setMenuOpen(!isMenuOpen);
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
      {isMenuOpen && (
        <div ref={wrapperRef} className={styles.settingsMenu}>
          <div className={styles.settingsMenuTitle}>MAP SETTINGS</div>
          {layers.map((option) => renderCheckbox(option, handleChangeLayer))}
        </div>
      )}
    </div>
  );
};

export default SettingsWidgetComponent;
