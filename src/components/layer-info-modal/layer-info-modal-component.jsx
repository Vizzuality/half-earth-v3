import React from 'react';

import styles from './layer-info-modal-styles.module.scss';

function LayerInfoModalComponent({ layerInfo, setLayerInfo }) {
  const { info, title } = layerInfo;

  const closeModal = () => {
    setLayerInfo(null);
  };

  return (
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
        <tbody>
          {info?.map((item) =>
            item.children.map((child) => (
              <tr key={child.label}>
                <td>
                  <b>{child.label}</b>
                </td>
                <td>{child.value}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LayerInfoModalComponent;
