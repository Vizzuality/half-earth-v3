import React from 'react';
import Component from './species-modal-component';
import { connect } from 'react-redux';
import { getCountryData, getSearchTerm } from './species-modal-selectors';
import * as urlActions from 'actions/url-actions';

const actions = { ...urlActions };

const mapStateToProps = (state) => ({
  countryData: getCountryData(state),
  searchTerm: getSearchTerm(state)
});

const SpeciesModalContainer = (props) => {
  const handleSearch = (event) => {
    const { value } = event.target;
    const { changeUI } = props;
    changeUI({ speciesModalSearch: value })
  }
  return (
    <Component
      {...props}
      handleSearchChange={handleSearch}
    />
  );
}

export default connect(mapStateToProps, actions)(SpeciesModalContainer);