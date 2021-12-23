import React from "react";
import { Modal } from "he-components";

// components
import ProtectedAreasTable from 'components/protected-areas-table';

// icons
import { ReactComponent as SearchIcon } from 'icons/search-species.svg';

// styles
import styles from "./styles.module";

const ProtectedAreasModal = ({
  isOpen,
  handleModalClose,
  handleSearchIconClick,
  handleSearchInputChange,
  data,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContainer}>
        <h1>Protected areas in </h1>
        <div className={styles.searchContainer}>
          <div className={styles.searchInput}>
            <SearchIcon className={styles.searchIcon} onClick={handleSearchIconClick} />
            <input onChange={handleSearchInputChange} type="text" placeholder="SEARCH IN TABLE" />
          </div>
          <div><strong>{data.length}</strong>{` PROTECTED AREAS`}</div>
        </div>
        <div className={styles.tableContainer}>
          <ProtectedAreasTable data={data} />
        </div>
      </div>
    </Modal>
  );
};

export default ProtectedAreasModal;
