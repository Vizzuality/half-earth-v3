import React from 'react';

import { useT } from '@transifex/react';

import styles from './layer-info-modal-styles.module.scss';

function LayerInfoModalComponent({ layerInfo, setLayerInfo }) {
  const t = useT();
  const { info, title } = layerInfo;

  const closeModal = () => {
    setLayerInfo(null);
  };

  const getInfo = (item) => {
    if (!item.children) {
      return (
        <tr key={item.label}>
          <td>
            <b>{t(item.label)}</b>
          </td>
          <td>{item.value}</td>
        </tr>
      );
    }
    return item.children.map((child) => (
      <tr key={child.label}>
        <td>
          <b>{t(child.label)}</b>
        </td>
        <td>{child.value}</td>
      </tr>
    ));
  };

  return (
    <>
      <div
        className={styles.overlay}
        role="button"
        aria-label="overlay"
        onClick={closeModal}
        onKeyDown={closeModal}
        tabIndex={0}
      />
      <div className={styles.container}>
        <header>
          <h2>{t(title)}</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeModal}
          >
            X
          </button>
        </header>
        <table>
          <tbody>{info?.map((item) => getInfo(item))}</tbody>
        </table>
      </div>
    </>
  );
}

export default LayerInfoModalComponent;
