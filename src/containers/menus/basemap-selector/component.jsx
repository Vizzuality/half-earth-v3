import PropTypes from 'prop-types';

import cx from 'classnames';

import uiStyles from 'styles/ui.module.scss';

import styles from './styles.module';

function BasemapSelector({ blur, landcoverBasemap, setLandcoverBasemap }) {
  const handleBasemapClick = () => setLandcoverBasemap(!landcoverBasemap);

  return (
    <button
      className={cx(styles.basemapContainer, {
        [styles.basemapDefault]: landcoverBasemap,
        [styles.basemapLandcover]: !landcoverBasemap,
        [uiStyles.blur]: blur,
      })}
      type="button"
      onClick={handleBasemapClick}
    >
      <p className={styles.basemapLabel}>
        {landcoverBasemap ? 'default' : 'landcover'}
      </p>
    </button>
  );
}

BasemapSelector.propTypes = {
  blur: PropTypes.bool,
  landcoverBasemap: PropTypes.bool,
  setLandcoverBasemap: PropTypes.func.isRequired,
};

BasemapSelector.defaultProps = {
  blur: false,
  landcoverBasemap: false,
};

export default BasemapSelector;
