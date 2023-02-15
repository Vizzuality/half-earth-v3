import React, { useEffect, useState, useMemo } from 'react';

import { tx } from '@transifex/native';
import { useLanguages, useLocale } from '@transifex/react';

import { motion } from 'framer-motion';

import styles from './styles.module.scss';

const { REACT_APP_FEATURE_ALLOWED_LANGUAGES } = process.env;

function SideMenuLanguageSwitcher(props) {
  const { changeLang } = props;
  const languages = useLanguages();
  const availableLanguages = useMemo(
    () =>
      languages.filter(
        (l) =>
          !REACT_APP_FEATURE_ALLOWED_LANGUAGES ||
          REACT_APP_FEATURE_ALLOWED_LANGUAGES.split(',').includes(l.code)
      ),
    [languages]
  );
  const locale = useLocale();
  const localeValue = locale === '' ? 'en' : locale;

  const [languageOptions, setLanguageOptions] = useState([]);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const options = availableLanguages.filter((l) => l.code !== localeValue);
    setLanguageOptions(options);
  }, [localeValue, languages]);

  return (
    <div
      className={styles.switcher}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button className={styles.switcherBtn} type="button">
        {localeValue}
      </button>
      <motion.div
        className={styles.switcherContent}
        initial={{
          right: '-100px',
          opacity: 0,
        }}
        animate={{
          right: isHover ? '30px' : '-100px',
          opacity: isHover ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        {languageOptions.map(({ code }) => (
          <button
            key={code}
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
