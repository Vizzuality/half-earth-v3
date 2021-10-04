import React from 'react';
import SpeciesModal from 'components/species-modal';
import SourceAnnotation from 'components/source-annotation';
import Dropdown from 'components/dropdown';
import SearchWithSuggestions from 'components/search-with-suggestions';
import SearchInput from 'components/search-input';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import styles from './styles.module.scss';


const Component = ({
  cardTitle,
  speciesData,
  searchTerm,
  handleSearchChange,
}) => (
  <SidebarCardWrapper className={styles.cardWrapper}>
    <div>
      <p className={styles.title}>{`This area is likely to have ${speciesData.species.length} vertebrate species`}</p>
      <Dropdown
        stacked
        width="full"
        parentWidth="322px"
        options={[{slug: 'vertebrates', label: 'vertebrates'}, {slug: 'mammals', label: 'mammals'},{slug: 'reptiles', label: 'reptiles'},]}
        selectedOption={{slug: 'vertebrates', label: 'vertebrates'}}
        handleOptionSelection={() => {}}
      />
      <SearchWithSuggestions
        stacked
        theme={'light'}
        width="full"
        parentWidth="322px"
      />
    </div>
  </SidebarCardWrapper>
);

export default Component;