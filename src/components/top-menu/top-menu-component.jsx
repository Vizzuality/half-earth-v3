import React from 'react'
import styles from './top-menu-styles.module.scss';
import { useT } from '@transifex/react';

function TopMenuComponent(props) {
  const t = useT();
  return (
    <div className={styles.container}>
      <a href="#" target='_blank'>{t('À propos de nous')}</a>
      <span>|</span>
      <a href="#">{t('Connexion')}</a>
    </div>
  )
}

export default TopMenuComponent;
