import React, { useContext, useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import Button from 'components/button';
import SearchInput from 'components/search-input';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import SpeciesGroupContainer from '../species-group';
import TaxaImageComponent from '../taxa-image';

import styles from './species-list-component-styles.module.scss';

function SpeciesListComponent(props) {
  const t = useT();
  const { selectedTaxa, setSelectedTaxa, filteredTaxaList, isLoading } = props;

  const { lightMode } = useContext(LightModeContext);
  const SPHINGID_MOTHS = /Sphingid moths/gi;

  const [inFilter, setInFilter] = useState(0);
  const [familyCounts, setFamilyCounts] = useState({});
  const [selectedTaxaObj, setSelectedTaxaObj] = useState();
  const [filteredSpecies, setFilteredSpecies] = useState({});
  const [filter, setFilter] = useState();

  const getTaxaTitle = (label, taxa) => {
    const taxaToCheck = [
      'MAMMALS',
      'BIRDS',
      'REPTILES',
      'AMPHIBIANS',
      'CONIFERS',
      'CACTI',
      'PALMS',
      'FISHES',
      'OTHER PLANTS*', // because the backend sends a * already
    ];
    if (taxa) {
      if (taxa.match(SPHINGID_MOTHS)) {
        return `Old World ${label}*`;
      }
      if (!taxaToCheck.includes(taxa.toUpperCase())) {
        return `${t(label)}*`;
      }
    }

    return t(label);
  };

  const updateSelectedTaxa = (taxa) => {
    if (!taxa) return;

    setFilter('');
    setSelectedTaxa(taxa);
    const fc = {};

    const sto = filteredTaxaList?.find((tax) => tax.taxa === taxa);
    if (sto === undefined) return;

    setInFilter(sto?.species?.length);

    const transformer = (sp) => ({
      ...sp,
      visible: true,
      filterString: [sp.scientificname, sp.common, sp.family, sp.family_common]
        .join(' ')
        .toLocaleLowerCase(),
    });
    const transformed = [];
    sto?.species?.forEach((sp) => {
      let species = sp;
      if (!fc[species.family]) {
        fc[species.family] = {
          total: 1,
          visibleCount: 0,
        };
        species.first = true;
      } else {
        species.first = false;
        fc[species.family].total += 1;
      }
      species = transformer(species);
      species.familyObj = fc[species.family];
      transformed.push(species);
    });
    sto.species = transformed;
    setFamilyCounts(fc);
    setSelectedTaxaObj(sto);
  };

  const sortFilteredSpecies = (species) => {
    return species?.sort((a, b) => {
      if (a.scientific_name < b.scientific_name) {
        return -1;
      }
      if (a.scientific_name > b.scientific_name) {
        return 1;
      }
      return 0;
    });
  };

  const applyFilter = () => {
    // this.virtualScroll?.scrollToIndex(0);
    const inFilterCheck = (sp) => {
      return (
        sp.common_name?.toLowerCase().indexOf(filter) > -1 ||
        sp.scientific_name?.toLowerCase().indexOf(filter) > -1
      );
    };
    setInFilter(0);

    // clear the counts
    const fc = familyCounts;
    Object.keys(fc).forEach((k) => {
      fc[k].visibleCount = 0;
    });

    // sort by family common
    const familySortedSpecies = sortFilteredSpecies(selectedTaxaObj?.species);

    // group by family common
    let groupByFamily = familySortedSpecies?.reduce((group, result) => {
      const catName = result.scientific_name[0] ?? '__blank';

      const updateResult = { ...result };

      updateResult.visible = inFilterCheck(result);
      if (updateResult.visible) {
        let inf = inFilter;
        setInFilter((inf += 1));
        fc[updateResult.family].visibleCount += 1;

        group[catName] = group[catName] ?? [];
        group[catName].push(updateResult);
      }

      setFamilyCounts(fc);
      return group;
    }, {});

    if (groupByFamily) {
      // sort family common by common
      const groupKeys = Object.keys(groupByFamily);

      groupKeys.forEach((groupKey) => {
        groupByFamily[groupKey].sort((a, b) => {
          if (a.scientificname < b.scientificname) {
            return -1;
          }
          if (a.scientificname > b.scientificname) {
            return 1;
          }
          return 0;
        });
      });

      const keyLength = Object.keys(groupByFamily).length - 1;

      // check if there is a group with no name
      if (Object.keys(groupByFamily)[keyLength] === '') {
        const noNameGroup = Object.values(groupByFamily)[keyLength];
        delete groupByFamily[Object.keys(groupByFamily)[keyLength]];
        groupByFamily = { ...groupByFamily, __blank: noNameGroup };
      }

      setFilteredSpecies(groupByFamily);
    } else {
      setFilteredSpecies({});
    }
  };

  const handleSearch = (event) => {
    setFilter(event.currentTarget.value.toLowerCase());
  };

  const clearSelection = () => {
    setSelectedTaxa('');
  };

  useEffect(() => {
    if (!selectedTaxa) return;
    updateSelectedTaxa(selectedTaxa);
  }, [selectedTaxa, filteredTaxaList]);

  useEffect(() => {
    if (!selectedTaxaObj) return;

    applyFilter();
  }, [selectedTaxaObj]);

  useEffect(() => {
    const handler = setTimeout(() => {
      applyFilter();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.filters)}>
      <div className={styles.titleRow}>
        <div className={styles.title}>{t('Species')}</div>
        {selectedTaxa && (
          <Button
            className={styles.close}
            handleClick={clearSelection}
            label={t('Clear Selection')}
          />
        )}
      </div>
      <hr className={hrTheme.dark} />
      <p className={styles.comingSoon}>
        {t(
          'Fish, tree, and select invertebrate and other plant taxa coming soon'
        )}
      </p>
      <div className={styles.taxaList}>
        {!selectedTaxa &&
          filteredTaxaList?.map((taxa) => {
            return (
              <button
                type="button"
                className={styles.title}
                key={taxa.taxa}
                onClick={() => updateSelectedTaxa(taxa.taxa)}
              >
                <TaxaImageComponent taxa={taxa.taxa} />
                <div className={styles.header}>
                  <span style={{ marginRight: '5px' }}>{taxa.count}</span>
                  <span
                    style={{
                      textTransform: 'capitalize',
                      display: 'inline-block',
                    }}
                  >
                    {getTaxaTitle(taxa?.title, taxa?.taxa)}
                  </span>
                </div>
              </button>
            );
          })}
      </div>
      {isLoading && <Loading height={200} />}
      {!isLoading && selectedTaxa && selectedTaxaObj && (
        <div className={styles.speciesList}>
          <div className={styles.header}>
            <span style={{ marginRight: '5px' }}>{selectedTaxaObj?.count}</span>
            <span
              style={{
                textTransform: 'capitalize',
                display: 'inline-block',
              }}
            >
              {getTaxaTitle(selectedTaxaObj?.title, selectedTaxaObj?.taxa)}
            </span>
          </div>
          <SearchInput
            className={cx(styles.search)}
            placeholder={`${t('Filter')} ${selectedTaxa}`}
            onChange={handleSearch}
            value={filter}
          />
          <div className={styles.filterResults}>
            {Object.keys(filteredSpecies).map((sp, index) => {
              return (
                <div key={index}>
                  {/* {filteredSpecies[sp].length > 0 && (
                    <SpeciesGroupTitleContainer
                      species={filteredSpecies[sp][0]}
                      filter={filter}
                    />
                  )} */}
                  {filteredSpecies[sp].map(
                    (v, idx) =>
                      v.visible && (
                        <SpeciesGroupContainer
                          species={v}
                          key={idx}
                          selectedTaxaObj={selectedTaxaObj}
                          {...props}
                        />
                      )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default SpeciesListComponent;
