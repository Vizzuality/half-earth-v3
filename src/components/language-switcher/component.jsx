import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import cx from 'classnames';
import { tx } from '@transifex/native';
import { useLanguages, useLocale } from '@transifex/react';
import styles from './language-switcher.module.scss';

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
});

const LanguageSwitcher = (props) => {
  const { route } = props;
  const { page } = route;
  const languages = useLanguages();
  const locale = useLocale();

  const renderLanguageSwitcher = () => languages.map(({ code }, index) => (
    <button
      className={
        cx(
          styles.languageButton,
          locale === code && styles.languageButtonSelected,
          index !== languages.length - 1 && styles.languageButtonSeparator,
        )
      }
      key={code}
      onClick={() => tx.setCurrentLocale(code)}
    >
      {code}
    </button>
  ))

  return (
    <div className={cx(
      styles.languageSwitcher,
      page === 'landing' && styles.alignCenter,
    )}>
      {renderLanguageSwitcher()}
    </div>
  )
}

// export default LanguageSwitcher;
export default process.env.NODE_ENV === 'development'
  ? hot(module)(connect(mapStateToProps, null)(LanguageSwitcher))
  : connect(mapStateToProps, null)(LanguageSwitcher);