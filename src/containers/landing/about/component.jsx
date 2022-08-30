import React, { useState } from 'react';

import { useT } from '@transifex/react';

import { motion } from 'framer-motion';

import AboutModal from 'containers/modals/about-modal';

import styles from './styles.module.scss';

function AboutComponent() {
  const t = useT();
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);

  return (
    <motion.div>
      <button
        className={styles.aboutBtn}
        type="button"
        onClick={() => setAboutModalOpen(true)}
      >
        {t('About the map')}
      </button>
      <AboutModal
        isOpen={isAboutModalOpen}
        setAboutModalOpen={setAboutModalOpen}
      />
    </motion.div>
  );
}

export default AboutComponent;
