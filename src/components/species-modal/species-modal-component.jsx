import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as ArrowIcon } from 'icons/arrow_right.svg';
import { Virtuoso } from 'react-virtuoso';
import { Loading } from 'he-components';
import HeaderItem from 'components/header-item';

import styles from './species-modal-styles.module.scss';

const SpeciesModalComponent = ({ handleModalClose, countryData, open, sortCategory, handleSortClick, handleSearchChange, speciesList, searchTerm }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
      handleModalClose();
    }
  };

  useEventListener('keydown', keyEscapeEventListener);

  const toggleExpand = (index) => {
    setExpandedRow(index === expandedRow ? null : index)
  };

  const renderRow = (index) => {
    const { species, speciesgroup, NSPS, percentprotected, stewardship } = speciesList[index];
    const isOpened = expandedRow === index;
    return (
      <button
        className={styles.tableRowContainer}
        onClick={() => toggleExpand(index)}
      >
        <div className={cx(styles.groupColor, styles[speciesgroup])} />
        <div className={styles.tableRow}>
          <div className={styles.mainInfo}>
            <div className={styles.tableItem}>{speciesgroup}</div>
            <div className={cx(styles.tableItem, styles.bold)}>{species}</div>
            <div className={styles.tableItem}>{NSPS}</div>
            <div className={styles.tableItem}>{percentprotected}</div>
            <div
              className={cx(styles.tableItem, {
                [styles.bold]: stewardship === 1
              })}
            >
              {stewardship === 1 ? 'Endemic' : stewardship}
            </div>
            <ArrowIcon className={cx(styles.arrowIcon, { [styles.isOpened]: isOpened })} />
          </div>
          <div className={cx(styles.expandedInfo, {[styles.isOpened]: isOpened })}>
            Hello
          </div>
        </div>
      </button>
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
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search in table"
              onChange={handleSearchChange}
              value={searchTerm || ''}
            />
          </div>
          <div className={styles.summary}>
            {speciesList ? speciesList.length : countryData.speciesNumber} LAND
            VERTEBRATE SPECIES
          </div>
        </section>
        <div>
          <div className={styles.tableHeaderContainer}>
            <div className={styles.tableHeader}>
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
                  handleSortClick={handleSortClick}
                />
              ))}
            </div>
          </div>
          {!speciesList ? (
            <div className={styles.loader} style={{ width: '100%', height: '600px' }}>
              <Loading />
            </div>
          ) : (
            <Virtuoso
              style={{ width: '100%', height: '400px' }}
              totalCount={speciesList.length}
              item={renderRow}
            />
          )}
        </div>
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
