import React from "react";
import PropTypes from "prop-types";
import { shareSocialMedia } from 'constants/social-media-constants';

import styles from "./styles.module";

const Component = ({ shareUrl }) => (
  <div className={styles.socialMediaContainer}>
    {shareSocialMedia.map((socialMedia) => (
      <button
        onClick={() =>
          window.open(
            `${socialMedia.sharePath}${encodeURIComponent(shareUrl)}`
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

Component.propTypes = {
  shareUrl: PropTypes.string,
};

Component.defaultProps = {
  shareUrl: "",
};

export default Component;
