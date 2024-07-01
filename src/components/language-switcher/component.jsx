import React, { useMemo } from 'react';

import { tx } from '@transifex/native';
import { useLanguages, useLocale } from '@transifex/react';

import cx from 'classnames';

import styles from './language-switcher.module.scss';

const { VITE_APP_FEATURE_ALLOWED_LANGUAGES } = import.meta.env;

function LanguageSwitcher(props) {
  const { route, changeLang } = props;
  const { page } = route;
  const languages = useLanguages();
  const availableLanguages = useMemo(
    () =>
      languages.filter(
        (l) =>
          !VITE_APP_FEATURE_ALLOWED_LANGUAGES ||
          VITE_APP_FEATURE_ALLOWED_LANGUAGES.split(',').includes(l.code)
      ),
    [languages]
  );
  const locale = useLocale();
  const renderLanguageSwitcher = () =>
    availableLanguages.map(({ code }, index) => (
      <button
        type="button"
        className={cx(
          styles.languageButton,
          (locale.length >= 2 ? locale : 'en') === code &&
            styles.languageButtonSelected,
          index !== availableLanguages.length - 1 &&
            styles.languageButtonSeparator
        )}
        key={code}
        onClick={() => {
          // We need to wait until the locale is loaded to avoid race conditions
          tx.setCurrentLocale(code).then(() => {
            changeLang(code);
          });
        }}
      >
        {code}
      </button>
    ));

  return (
    <div
      className={cx(
        styles.languageSwitcher,
        page === 'landing' && styles.alignCenter
      )}
    >
      {renderLanguageSwitcher()}
    </div>
  );
}

export default LanguageSwitcher;
