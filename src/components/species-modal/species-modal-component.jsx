import React, { useEffect, useState } from 'react';
import usePrevious from 'hooks/use-previous';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as ArrowIcon } from 'icons/arrow_right.svg';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useFeatureLayer } from 'hooks/esri';
import { SPECIES_LIST } from 'constants/layers-slugs';
import { Loading } from 'he-components';
import HeaderItem from 'components/header-item';

import styles from './species-modal-styles.module.scss';

const SpeciesModalComponent = ({ handleModalClose, countryData, open, sortCategory, handleSortClick, handleSearchChange, searchTerm }) => {
  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
      handleModalClose();
    }
  };

  useEventListener('keydown', keyEscapeEventListener);

  const layer = useFeatureLayer({ layerSlug: SPECIES_LIST });

  const [speciesList, setSpeciesList] = useState(null);
  const [filteredSpeciesList, setFilteredSpeciesList] = useState(null);
  useEffect(() => {
    if (layer && countryData.iso && !speciesList) {
      const getFeatures = async () => {
        const query = await layer.createQuery();
        query.where = `iso3 = '${countryData.iso}'`;
        query.maxRecordCountFactor = '5000';
        const results = await layer.queryFeatures(query);
        const { features } = results;
        if (features) {
          setSpeciesList(features.map(f => f.attributes));
        }
      };

      getFeatures(countryData.iso);
    }
  }, [layer, countryData.iso]);

  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    if(!searchTerm && speciesList && !filteredSpeciesList) {
      setFilteredSpeciesList(speciesList);
    }
    if (previousSearch !== searchTerm && speciesList) {
      if (!searchTerm) {
        setFilteredSpeciesList(speciesList);
      } else {
        const speciesFilteredBySearch = speciesList.filter((c) =>
          Object.values(c).some((v) =>
            v && String(v).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setFilteredSpeciesList(speciesFilteredBySearch);
      }
    }
  }, [searchTerm, previousSearch, speciesList])

  const Row = ({ index, style, data }) => {
    const { species, speciesgroup, NSPS, percentprotected, stewardship } = filteredSpeciesList[index];
    return (
      <div className={styles.tableRow} style={style}>
        <div className={cx(styles.groupColor, styles[speciesgroup])} />
        <div className={styles.tableItem}>{speciesgroup}</div>
        <div className={styles.tableItem}>{species}</div>
        <div className={styles.tableItem}>{NSPS}</div>
        <div className={styles.tableItem}>{percentprotected}</div>
        <div
          className={cx(styles.tableItem, { [styles.bold]: stewardship === 1 })}
        >
          {stewardship === 1 ? 'Endemic' : stewardship}
        </div>
        <ArrowIcon className={styles.arrow} />
      </div>
    );
  }

  const headers = ['Species group', 'Species', 'Range within country protected', 'Species protection score', 'Stewardship']
  const renderSpeciesModal = (
    <div className={styles.speciesModal}>
      <div className={styles.grid}>
        <h1 className={styles.title}>{countryData.name}</h1>
        <section className={styles.section}>
          <div className={styles.search}>
            <SearchIcon className={styles.searchIcon} />
            <input type="text" className={styles.searchInput} placeholder="Search in table" onChange={handleSearchChange} value={searchTerm} />
          </div>
          <div className={styles.summary}>
            {countryData.speciesNumber} LAND VERTEBRATE SPECIES
          </div>
        </section>
        <AutoSizer>
          {({ height, width }) => (
            <div>
              <div className={styles.tableHeaderContainer} style={{ width }}>
                <div className={styles.tableHeader} style={{ width: width - 200 }}>
                  {headers.map((title) => (
                    <HeaderItem
                      title={title}
                      className={styles.tableHeaderItem}
                      key={title}
                      isSortSelected={
                        sortCategory &&
                        sortCategory.split('-')[0] &&
                        sortCategory.split('-')[0] === title
                      }
                      sortDirection={sortCategory && sortCategory.split('-')[1]}
                      handleSortClick={handleSortClick || (() => {})}
                    />
                  ))}
                </div>
              </div>
              {!filteredSpeciesList ? (
                <div
                  className={styles.loader}
                  style={{ width, height, paddingTop: height / 2 - 100 }}
                >
                  <Loading />
                </div>
              ) : (
                <List
                  height={height}
                  width={width}
                  itemCount={filteredSpeciesList.length}
                  itemSize={50}
                >
                  {Row}
                </List>
              )}
            </div>
          )}
        </AutoSizer>
        <section></section>
      </div>
      <button className={styles.closeButton} onClick={handleModalClose}>
        <CloseIcon />
      </button>
    </div>
  );

  if (!open) return null;

  return ReactDOM.createPortal(
    renderSpeciesModal,
    document.getElementById('root')
  );
};

export default SpeciesModalComponent;
