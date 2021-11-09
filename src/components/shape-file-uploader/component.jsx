import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { featureCollectionFromShape } from 'utils/analyze-areas-utils';
import {ReactComponent as AddShapeIcon} from "icons/add_shape_icon.svg";
import styles from './styles.module.scss';

const  Component = ({
  view,
  onChange,
  onSuccess,
}) => {
  const { getRootProps, getInputProps, rootRef} = useDropzone({
    onDrop: useCallback(() => {
      featureCollectionFromShape(rootRef.current, view, onSuccess)
    })
  });

  return (
    <div className={styles.container}>
      <form 
        {...getRootProps({
          className: styles.shapeUploader,
          encType:"multipart/form-data",
          method: 'post',
          id: 'dropzoneForm'
        })} 
      >
        <input
          {...getInputProps({
            name:"file",
            id:"inFile"
          })}
          className={styles.uploaderInput}
        />
        <AddShapeIcon className={styles.uploadShapeButton}/>
        <span className={styles.label}>Add a shapefile from your computer</span>
      </form> 
    </div>
  );
}

export default Component;