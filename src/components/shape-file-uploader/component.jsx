import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { useT } from '@transifex/react';

import { featureCollectionFromShape } from 'utils/analyze-areas-utils';

import styles from './styles.module.scss';

import AddShapeIcon from 'icons/add_shape_icon.svg?react';

function ShapeFileUploader({ sizeWarning, view, onError, onSuccess }) {
  const t = useT();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((files) => {
      if (!files || !files[0]) {
        console.error('No file provided');
        return;
      }

      const formData = new FormData();
      formData.append('file', files[0]);
      featureCollectionFromShape(formData, view, onSuccess, onError);
    }),
  });

  return (
    <div className={styles.container}>
      <form
        {...getRootProps({
          className: styles.shapeUploader,
          encType: 'multipart/form-data',
          method: 'post',
          id: 'dropzoneForm',
        })}
      >
        <input
          {...getInputProps({
            name: 'file',
            id: 'inFile',
          })}
          className={styles.uploaderInput}
        />
        <AddShapeIcon className={styles.uploadShapeButton} />
        <p className={styles.label}>
          <b>{t('Drag or click to upload your shapefile.')}</b>
          {sizeWarning && (
            <span className={styles.warning}>{t(sizeWarning)}</span>
          )}
        </p>
      </form>
    </div>
  );
}

export default ShapeFileUploader;
