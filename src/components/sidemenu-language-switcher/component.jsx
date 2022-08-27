import React, { useEffect, useState } from 'react';

import { tx } from '@transifex/native';
import { useLanguages, useLocale } from '@transifex/react';

import styles from './styles.module.scss';

function SideMenuLanguageSwitcher(props) {
  const { changeLang } = props;
  const languages = useLanguages();
  const locale = useLocale();

  const [languageOptions, setLanguageOptions] = useState(languages);

  useEffect(() => {
    const options = languages.filter((l) => l.code !== locale);
    setLanguageOptions(options);
  }, [locale, languages]);

  return (
    <div className={styles.switcher}>
      <button
        className={styles.switcherBtn}
        type="button"
      >
        {locale}
      </button>
      <div className={styles.switcherContent}>
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
      </div>
    </div>
  );
}

export default SideMenuLanguageSwitcher;
