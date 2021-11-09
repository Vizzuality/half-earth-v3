import React, {useCallback, useEffect, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import { featureCollectionFromShape } from 'utils/analyze-areas-utils';
import {ReactComponent as AddShapeIcon} from "icons/add_shape_icon.svg";
import styles from './styles.module.scss';

const  Component = ({
  handleUploadedShape,
  view,
  onFeatureSetGenerated
}) => {
  const formRef = useRef();
  // const { getRootProps, getInputProps, rootRef, inputRef} = useDropzone({
  //   onDrop: useCallback((files, error, event) => {
  //     console.log('FROM DROPZONE')
  //     console.log(rootRef)
  //     featureCollectionFromShape(rootRef.current, view)
  //   })
  // });

  useEffect(() => {
    if (formRef.current) {

      formRef.current.addEventListener("change", function (event) { 
        console.log('FROM EVENT LISTENER')
        const filePath = event.target.value.toLowerCase(); 
        
        //only accept .zip files 
        
        if (filePath.indexOf(".zip") !== -1) { 
        
          featureCollectionFromShape(formRef.current, view, onFeatureSetGenerated); 
        
        }  
        
        });  
    }
  },[formRef.current])


  return (
    <div className={styles.container}>
    
    
    {/* <form {...getRootProps({
        className: styles.shapeUploader,
        encType:"multipart/form-data",
        method: 'post',
        id: 'dropzoneForm'
      })}>
        <input {...getInputProps(
        //   onChange: (e) => {
        //     const filePath = e.target.value.toLowerCase(); 
        // console.log(filePath, e, inputRef)
        //     //only accept .zip files 
            
        //     if (filePath.indexOf(".zip") !== -1) { 
            
        //       featureCollectionFromShape(inputRef.current, view); 
            
        //     }  
        //   }
        )} />
        <AddShapeIcon className={styles.uploadShapeButton}/>
        <span className={styles.label}>Add a shapefile from your computer</span>
      </form>  */}
    <form encType="multipart/form-data" method="post" id="uploadForm" ref={formRef} className={styles.container}>
      <div>
        <label>
          <span className={styles.label}><strong>Upload shapefile .zip</strong></span>
          <input className={styles.uploadShapeButton} type="file" name="file" id="inFile" />
        </label>
      </div>
    </form>
    </div>
  );
}

export default Component;