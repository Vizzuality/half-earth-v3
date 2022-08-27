import React, { useEffect, useState } from 'react';

import { tx } from '@transifex/native';
import { useLanguages, useLocale } from '@transifex/react';

import { motion } from 'framer-motion';

import styles from './styles.module.scss';

function SideMenuLanguageSwitcher(props) {
  const { changeLang } = props;
  const languages = useLanguages();
  const locale = useLocale();

  const [languageOptions, setLanguageOptions] = useState(languages);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const options = languages.filter((l) => l.code !== locale);
    setLanguageOptions(options);
  }, [locale, languages]);

  return (
    <div
      className={styles.switcher}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        className={styles.switcherBtn}
        type="button"
      >
        {locale || 'en'}
      </button>
      <motion.div
        className={styles.switcherContent}
        initial={{
          right: '-100px',
          opacity: 0,
        }}
        animate={{
          right: isHover ? '28px' : '-100px',
          opacity: isHover ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        {languageOptions.map(({ code }) => (
          <button
            type="button"
            onClick={() => {
              tx.setCurrentLocale(code).then(() => {
                changeLang(code);
              });
            }}
          >
            {code}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

export default SideMenuLanguageSwitcher;
