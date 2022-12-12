import React from 'react';

import PropTypes from 'prop-types';

import { shareSocialMedia } from 'constants/social-media-constants';

import styles from './styles.module';

function Component({ setShareUrl }) {
  return (
    <div className={styles.socialMediaContainer}>
      {shareSocialMedia.map((socialMedia) => (
        <button
          type="button"
          onClick={() =>
            window.open(
              `${socialMedia.sharePath}${encodeURIComponent(setShareUrl())}`
            )
          }
          className={styles.iconBackground}
          key={socialMedia.alt}
        >
          <socialMedia.icon />
        </button>
      ))}
    </div>
  );
}

Component.propTypes = {
  setShareUrl: PropTypes.func,
};

Component.defaultProps = {
  setShareUrl: () => '',
};

export default Component;
