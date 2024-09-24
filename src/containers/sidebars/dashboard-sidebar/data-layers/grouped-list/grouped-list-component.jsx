import React from 'react';
import cx from 'classnames';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowIcon from 'icons/arrow_right.svg?react';
import EsriFeatureService from 'services/esri-feature-service';

import styles from './grouped-list-styles.module.scss';

function GroupedListComponent(props) {
  const { dataPoints, setDataPoints, map, speciesInfo } = props;

  const displayChildren = (key) => {
    const showChildren = !dataPoints[key].showChildren;

    setDataPoints({
      ...dataPoints,
      [key]: {
        ...dataPoints[key],
        showChildren: showChildren,
      }
    });
  }

  // update value of all children
  const updateChildren = (item) => {
    const isActive = !dataPoints[item].isActive;

    const typeItems = dataPoints[item].items;
    typeItems.map(item => item.isActive = isActive);
    setDataPoints({
      ...dataPoints,
      [item]: {
        ...dataPoints[item],
        isActive: isActive,
        items: [
          ...typeItems
        ]
      }
    });
  }

  const displaySingleLayer = (item) => {
    if (dataPoints[item]?.items.length === 0) {
      setDataPoints({
        ...dataPoints, [item]: { ...dataPoints[item], isActive: !dataPoints[item].isActive }
      });
    } else {
      setDataPoints({
        ...dataPoints,
        [item.type_title]: {
          ...dataPoints[item.type_title],
          items: [
            ...dataPoints[item.type_title].items.map(point => {
              return point?.dataset_id === item.dataset_id ? { ...point, isActive: !point.isActive } : point
            }),
          ]
        }
      });
    }
  };

  const findLayerToShow = (item) => {
    if (item.type_title.toUpperCase() === 'POINT OBSERVATIONS') {

      const jsonLayer = EsriFeatureService.getGeoJsonLayer(speciesInfo.scientificname.replace(' ', '_'));
      map.add(jsonLayer);
    }

    displaySingleLayer(item)
  }

  // check if some but not all children are selected
  const checkIfSomeChecked = (key) => {
    const items = dataPoints[key].items
    const typeItems = items.some(item => item.isActive === true) && !items.every(item => item.isActive === true);
    return typeItems;
  }

  // check if all children are selected
  const checkIfAllChecked = (key) => {
    const items = dataPoints[key].items
    const typeItems = items.every(item => item.isActive === true);
    dataPoints[key].isActive = typeItems;
    return typeItems;
  }

  return (
    <div className={styles.container}>
      {Object.keys(dataPoints).map((key) => (
        <div key={key}>
          {dataPoints[key].items.length > 0 &&
            <>
              <div className={styles.parent}>
                <button onClick={() => displayChildren(key)}>
                  <ArrowIcon
                    className={cx(styles.arrowIcon, {
                      [styles.isOpened]: dataPoints[key].showChildren,
                    })}
                  />
                </button>
                <FormControlLabel
                  label={key}
                  control={
                    <Checkbox
                      indeterminate={checkIfSomeChecked(key)}
                      checked={checkIfAllChecked(key)}
                      onChange={() => updateChildren(key)}
                    />
                  }
                />
                <img className={styles.productTypeLogo}
                  src={`https://cdn.mol.org/static/images/legends/datatypes/${(dataPoints[key].items[0]?.product_type === 'points' ? 'points_agg' : dataPoints[key].items[0]?.product_type)}.png`} />
                <span>{dataPoints[key].total_no_rows}</span>
              </div>
              {dataPoints[key].showChildren && <ul>
                {dataPoints[key].items.map((item) => (
                  <li key={item.dataset_id} className={styles.children} onClick={() => findLayerToShow(item)}>
                    <FormControlLabel
                      label={item.dataset_title}
                      control={<Checkbox checked={item.isActive} />}
                    />
                    <span></span>
                    <span>{item.no_rows}</span>
                  </li>
                ))}
              </ul>
              }
            </>
          }
          {dataPoints[key].items.length === 0 && <div className={styles.children} onClick={() => displaySingleLayer(key)}>
            <FormControlLabel
              label={key}
              control={<Checkbox checked={dataPoints[key].isActive} />}
            />
            <span></span>
            <span>{dataPoints[key].total_no_rows}</span>
          </div>
          }
        </div>
      ))}
    </div>
  );
}

export default GroupedListComponent;
