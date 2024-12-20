import React, { useContext, useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import DoneIcon from '@mui/icons-material/Done';
import { Chip } from '@mui/material';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import Button from 'components/button';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './filter-component-styles.module.scss';

function FilterComponent(props) {
  const t = useT();
  const {
    setFilteredTaxaList,
    selectedTaxa,
    taxaList,
    filters,
    setFilters,
    isLoading,
  } = props;

  const [anyActive, setAnyActive] = useState(false);
  const { lightMode } = useContext(LightModeContext);

  const clearCounts = () => {
    setFilteredTaxaList([]);
    const updatedFilters = [...filters];
    updatedFilters.forEach((f) => {
      const innerFilter = f;
      innerFilter.filters.forEach((ff) => {
        const filter = ff;
        filter.count = 0;
      });
    });

    setFilters(updatedFilters);
  };

  const refreshCounts = () => {
    clearCounts();

    let allTaxa = taxaList;
    if (selectedTaxa) {
      allTaxa = allTaxa.filter((taxa) => taxa.taxa === selectedTaxa);
    }

    const filtered = [];
    // allTaxa.species = [];
    let isAnyActive = false;

    filters.forEach((f) =>
      f.filters.forEach((ff) => {
        if (ff.active) isAnyActive = true;
      })
    );
    // TODO: FIGURE OUT FILTERS
    allTaxa.forEach((taxa) => {
      // Object.values(allTaxa).forEach((taxa) => {
      const candidateTaxa = { ...taxa };
      const candidateSpecies = [];
      taxa.species.forEach((species) => {
        const speciesFilters = [];
        const speciesOrFilters = [];
        filters.forEach((filterGroup) => {
          filterGroup.filters.forEach((filter) => {
            const result = filter.test(species);
            filter.result = result;
            if (isAnyActive && filter.active) {
              if (filter.type === 'and') {
                speciesFilters.push(result);
              } else if (filter.type === 'or') {
                speciesOrFilters.push(result);
              }
            }
          });
        });
        const allAnd =
          speciesFilters.every((x) => x) && speciesFilters.length > 0;
        const anyOr = speciesOrFilters.includes(true);
        let inCandidate = false;
        if (!isAnyActive) {
          inCandidate = true;
          candidateSpecies.push(species);
          // only ands
        } else if (allAnd && speciesOrFilters.length === 0) {
          inCandidate = true;
          candidateSpecies.push(species);
          // only or's
        } else if (speciesFilters.length === 0 && anyOr) {
          inCandidate = true;
          candidateSpecies.push(species);
        } else if (allAnd && anyOr) {
          inCandidate = true;
          candidateSpecies.push(species);
        }

        const onAnd = allAnd || speciesFilters.length === 0;

        filters.forEach((filterGroup) => {
          filterGroup.filters.forEach((filter) => {
            if (onAnd && filter.result) {
              filter.count += 1;
            }
          });
        });
      });

      candidateTaxa.species = candidateSpecies;
      candidateTaxa.count = candidateSpecies.length;
      filtered.push(candidateTaxa);
    });

    // setAnyActive(isAnyActive);
    setFilteredTaxaList(filtered);
  };

  const activateFilter = (filter) => {
    filter.active = !filter.active;
    refreshCounts();
  };

  const clearFilters = () => {
    filters.forEach((f) =>
      f.filters.forEach((ff) => {
        ff.active = false;
      })
    );
    refreshCounts();
  };

  useEffect(() => {
    if (!taxaList) return;
    refreshCounts();
  }, [taxaList]);

  useEffect(() => {
    refreshCounts();
  }, [selectedTaxa]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.filters)}>
      <div className={styles.titleRow}>
        <div className={styles.title}>{t('Filters')}</div>
        {anyActive && (
          <Button
            className={styles.close}
            handleClick={clearFilters}
            label={t('Clear Filters')}
          />
        )}
      </div>
      <hr className={hrTheme.dark} />
      {isLoading && <Loading height={200} />}
      {!isLoading &&
        filters.map((filterGroup, index) => {
          return (
            <div className={styles.filterList} key={index}>
              <div className={styles.filterGroupTitle}>
                {t(filterGroup.title)}
              </div>
              <div className={styles.filterbox}>
                {filterGroup.filters.map((filter, idx) => {
                  return (
                    <Chip
                      key={idx}
                      icon={filter.active ? <DoneIcon /> : <></>}
                      color={filter.active ? 'success' : 'primary'}
                      label={`${t(filter.name)}: ${filter.count}`}
                      onClick={() => activateFilter(filter)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FilterComponent;
