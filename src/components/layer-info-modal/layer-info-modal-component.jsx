import React from 'react';

import styles from './layer-info-modal-styles.module.scss';

function LayerInfoModalComponent({ layerInfo, setLayerInfo }) {
  const { info, title } = layerInfo;

  const closeModal = () => {
    setLayerInfo(null);
  };

  const getInfo = (item) => {
    if (!item.children) {
      return (
        <tr key={item.label}>
          <td>
            <b>{item.label}</b>
          </td>
          <td dangerouslySetInnerHTML={{ __html: item.value }} />
        </tr>
      );
    }
    return item.children.map((child) => (
      <tr key={child.label}>
        <td>
          <b>{child.label}</b>
        </td>
        <td dangerouslySetInnerHTML={{ __html: item.value }} />
      </tr>
    ));
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeModal} />
      <div className={styles.container}>
        <header>
          <h2>{title}</h2>
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
