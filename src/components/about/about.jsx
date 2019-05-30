import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './about-styles.module.scss';

const About = () => {
  return (
    <button className={styles.aboutButton}>About the Half-Earth map</button>
  )
}

export default About;