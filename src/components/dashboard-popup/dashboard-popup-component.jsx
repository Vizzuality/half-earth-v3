import React from 'react';

import { useT } from '@transifex/react';

import styles from './dashboard-popup-component-styles.module.scss';

function DashboardPopupComponent(props) {
  const t = useT();
  const { DESIG, DESIG_TYPE, STATUS, STATUS_YR } = props;
  return (
    <table className={styles.popup}>
      <tbody>
        <tr>
          <td>
            <b>{t('Description')}</b>
          </td>
          <td>{DESIG}</td>
        </tr>
        <tr>
          <td>
            <b>{t('Type')}</b>
          </td>
          <td>{DESIG_TYPE}</td>
        </tr>
        <tr>
          <td>
            <b>{t('Status')}</b>
          </td>
          <td>{STATUS}</td>
        </tr>
        <tr>
          <td>
            <b>{t('Year')}</b>
          </td>
          <td>{STATUS_YR}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default DashboardPopupComponent;
