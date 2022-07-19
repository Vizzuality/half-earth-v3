import React from 'react';
import cx from 'classnames';
import { useLanguages, useLocale } from '@transifex/react';
import { tx } from '@transifex/native';
import styles from './language-switcher.module.scss';

const LanguageSwitcher = (props) => {
  const { route, changeLang } = props;
  const { page } = route;
  const languages = useLanguages();
  const locale = useLocale();
  const renderLanguageSwitcher = () =>
    languages.map(({ code }, index) => (
      <button
        className={cx(
          styles.languageButton,
          (locale.length >= 2 ? locale : 'en') === code &&
            styles.languageButtonSelected,
          index !== languages.length - 1 && styles.languageButtonSeparator
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
};

export default LanguageSwitcher;
