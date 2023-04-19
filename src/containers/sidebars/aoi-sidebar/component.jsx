import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { DATA } from 'router';

import { useT, useLocale, T } from '@transifex/react';

import { writeToForageItem } from 'utils/local-forage-utils';

import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import MapLayers from 'containers/sidebars/map-layers';
import TabsSidebar from 'containers/sidebars/tabs-sidebar';

import Button from 'components/button';
import CloseButton from 'components/close-button';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import ShareModal from 'components/share-modal';
import TitleTooltip from 'components/title-tooltip';

import {
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG,
  PROTECTION_SLUG,
  PROTECTED_ATTRIBUTES_SLUG,
} from 'constants/analyze-areas-constants';
import { getAOIBiodiversityToggles } from 'constants/biodiversity-layers-constants';
import { getHumanPressuresLandUse } from 'constants/human-pressures';
import {
  WDPA_OECM_FEATURE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  LAND_HUMAN_PRESSURES,
} from 'constants/layers-slugs';
import { ALL_TAXA_PRIORITY } from 'constants/metadata';
import { getWDPALayers } from 'constants/protected-areas';
import {
  getAOIContextualData,
  getCountryNames,
} from 'constants/translation-constants';
import { getSidebarTabs } from 'constants/ui-params';

import styles from './styles.module.scss';

import { ReactComponent as ClimateRegimeIcon } from 'icons/climate-regime.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as LandCoverIcon } from 'icons/land-cover.svg';
import { ReactComponent as PopulationIcon } from 'icons/population.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';

import goalGlobe from 'images/goal-globe.png';

import mapStateToProps from './selectors';
import SidebarCard from './sidebar-card-content';
import SpeciesCard from './species-card';
import SpeciesCardLegacy from './species-card-legacy';

const { REACT_APP_FEATURE_AOI_CHANGES } = process.env;

function AOISidebar({
  activeCategory,
  aoiId,
  area,
  map,
  view,
  className,
  landCover,
  population,
  speciesData,
  activeLayers,
  climateRegime,
  contextualData,
  shareAoiAnalytics,
  handleClose,
  sidebarTabActive,
  setSidebarTabActive,
  isShareModalOpen,
  setShareModalOpen,
  dataLoaded,
  browsePage,
  changeUI,
  handleGlobeUpdating,
  precalculatedLayerSlug,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  sentenceData,
}) {
  const [mapLayersTab, analyzeAreasTab] = getSidebarTabs();
  const t = useT();
  const locale = useLocale();

  const isProtectedAreaAOI = precalculatedLayerSlug === WDPA_OECM_FEATURE_LAYER;
  const protectedAreaAOILoading = contextualData.iso && isProtectedAreaAOI;
  // If we have an active area go to the analyze areas tab first
  useEffect(() => {
    if (sidebarTabActive === mapLayersTab.slug && aoiId) {
      setSidebarTabActive(analyzeAreasTab.slug);
    }
  }, [precalculatedLayerSlug]);

  const WDPALayers = useMemo(() => getWDPALayers(), [locale]);

  const humanPressuresLandUse = useMemo(
    () => getHumanPressuresLandUse(),
    [locale]
  );

  const aoiBiodiversityToggles = useMemo(
    () => getAOIBiodiversityToggles(),
    [locale]
  );

  const [isEditingName, setIsEditingName] = useState(false);
  const [updatedAreaName, setUpdatedAreaName] = useState(false);

  const isCustomArea = contextualData?.isCustom;

  const handleShareModalOpen = () => {
    shareAoiAnalytics();
    setShareModalOpen(true);
  };

  const saveName = () => {
    setIsEditingName(false);
    writeToForageItem(contextualData.aoiId, {
      ...contextualData,
      timestamp: Date.now(),
      areaName: updatedAreaName,
    });
  };

  const AOIContextualTranslations = useMemo(
    () => getAOIContextualData(),
    [locale]
  );
  const countryNamesTranslations = useMemo(() => getCountryNames(), [locale]);

  const handleOnTabClick = useMemo(() => {
    if (sidebarTabActive === mapLayersTab.slug) {
      if (!aoiId) return browsePage({ type: DATA });
      changeUI({ aoiId });
    }
    return () => {};
  }, [sidebarTabActive]);

  const areaName =
    updatedAreaName ||
    countryNamesTranslations[contextualData.areaName] ||
    contextualData.areaName;

  return (
    <div className={styles.sidebarContainer}>
      <TabsSidebar
        activeLayers={activeLayers}
        view={view}
        onTabClick={() => handleOnTabClick()}
        aoiId={aoiId}
      />

      <AnimatePresence exitBeforeEnter>
        {sidebarTabActive === analyzeAreasTab.slug && (
          <motion.div
            key={analyzeAreasTab.slug}
            initial={{ opacity: 0, x: 160, width: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 160 }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
          >
            <section className={styles.headerCard}>
              <CloseButton
                type="rounded"
                handleClose={handleClose}
                className={styles.backButton}
                tooltipText={t('Go back to the globe')}
              />
              <DummyBlurWorkaround />
              <div className={styles.topRow}>
                <div className={styles.nameWrapper}>
                  {isEditingName && (
                    <input
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      type="text"
                      className={styles.areaNameEdit}
                      onChange={(e) => setUpdatedAreaName(e.target.value)}
                      placeholder={t('Type name')}
                    />
                  )}

                  {!isEditingName && !protectedAreaAOILoading && (
                    <p className={styles.areaName}>{areaName}</p>
                  )}

                  {(!areaName || !!protectedAreaAOILoading) && (
                    <div className={styles.loadingAreaName} />
                  )}

                  {!!area && !protectedAreaAOILoading ? (
                    <p className={styles.area}>
                      {area}{' '}
                      <span>
                        {t('km')}
                        <sup>2</sup>
                      </span>
                    </p>
                  ) : (
                    <div className={styles.loadingArea} />
                  )}
                </div>
                {isEditingName ? (
                  <div className={styles.actionButtons}>
                    <Button
                      type="rectangular"
                      className={styles.saveButton}
                      handleClick={saveName}
                      tooltipText={t('Save the area name')}
                      label={t('SAVE')}
                    />
                  </div>
                ) : (
                  <div className={styles.actionButtons}>
                    {contextualData.isCustom && (
                      <Button
                        Icon={EditIcon}
                        type="icon-square"
                        handleClick={() => setIsEditingName(true)}
                        tooltipText={t('Edit area name')}
                      />
                    )}
                    {dataLoaded && (
                      <Button
                        Icon={ShareIcon}
                        type="icon-square"
                        handleClick={handleShareModalOpen}
                        tooltipText={t('Share this area')}
                        disabled
                      />
                    )}
                  </div>
                )}
              </div>
            </section>
            <div className={cx(styles.content, className)}>
              <div className={styles.contextualDataRow}>
                <TitleTooltip content={<T _str="Population" />}>
                  <div className={styles.contextualIndicator}>
                    <PopulationIcon />
                    {population && !protectedAreaAOILoading && (
                      <span>{population}</span>
                    )}
                    {(!population || !!protectedAreaAOILoading) && (
                      <div className={styles.loadingIndicator} />
                    )}
                  </div>
                </TitleTooltip>

                <TitleTooltip
                  content={`${t('Land cover: ')}${
                    AOIContextualTranslations[
                      landCover && landCover.toLowerCase()
                    ] || landCover
                  }`}
                >
                  <div className={styles.contextualIndicator}>
                    {landCover && !protectedAreaAOILoading && (
                      <span>
                        {AOIContextualTranslations[
                          landCover && landCover.toLowerCase()
                        ] || landCover}
                      </span>
                    )}

                    {(!landCover || protectedAreaAOILoading) && (
                      <div className={styles.loadingIndicator} />
                    )}
                    <LandCoverIcon />
                  </div>
                </TitleTooltip>

                <TitleTooltip
                  content={`${t('Climate regime: ')}${
                    AOIContextualTranslations[
                      climateRegime && climateRegime.toLowerCase()
                    ] || climateRegime
                  }`}
                >
                  <div className={styles.contextualIndicator}>
                    <ClimateRegimeIcon />
                    {climateRegime && !protectedAreaAOILoading && (
                      <span>
                        {AOIContextualTranslations[
                          climateRegime && climateRegime.toLowerCase()
                        ] || climateRegime}
                      </span>
                    )}

                    {(!climateRegime || protectedAreaAOILoading) && (
                      <div className={styles.loadingIndicator} />
                    )}
                  </div>
                </TitleTooltip>
              </div>
              {REACT_APP_FEATURE_AOI_CHANGES && (
                <SpeciesCard
                  area={area}
                  speciesData={speciesData}
                  contextualData={contextualData}
                />
              )}

              {!REACT_APP_FEATURE_AOI_CHANGES && (
                <SpeciesCardLegacy
                  area={area}
                  speciesData={speciesData}
                  contextualData={contextualData}
                />
              )}

              <SidebarCard
                map={map}
                toggleType="radio"
                activeLayers={activeLayers}
                contextualData={contextualData}
                cardCategory={BIODIVERSITY_SLUG}
                layers={aoiBiodiversityToggles}
                metadataSlug={ALL_TAXA_PRIORITY}
              />
              {!isProtectedAreaAOI && (
                <SidebarCard
                  map={map}
                  layers={WDPALayers}
                  toggleType="checkbox"
                  activeLayers={activeLayers}
                  cardCategory={PROTECTION_SLUG}
                  contextualData={contextualData}
                  metadataSlug={PROTECTED_AREAS_VECTOR_TILE_LAYER}
                />
              )}

              {isProtectedAreaAOI && (
                <SidebarCard
                  map={map}
                  layers={WDPALayers}
                  toggleType="checkbox"
                  activeLayers={activeLayers}
                  cardCategory={PROTECTED_ATTRIBUTES_SLUG}
                  contextualData={contextualData}
                  metadataSlug={PROTECTED_AREAS_VECTOR_TILE_LAYER}
                />
              )}

              <SidebarCard
                map={map}
                toggleType="checkbox"
                activeLayers={activeLayers}
                layers={humanPressuresLandUse}
                contextualData={contextualData}
                cardCategory={LAND_HUMAN_PRESSURES_SLUG}
                metadataSlug={LAND_HUMAN_PRESSURES}
              />

              {isCustomArea && REACT_APP_FEATURE_AOI_CHANGES && (
                <div className={styles.goalSection}>
                  <div className={styles.goalHeader}>
                    <img src={goalGlobe} alt={t('Half-Earth Goal')} />
                    <h3 className={styles.goalTitle}>{t('HALF-EARTH GOAL')}</h3>
                  </div>
                  <p className={styles.goalSentence}>
                    {sentenceData &&
                      (sentenceData.meetTargetTotal ? (
                        <T
                          _str="Protecting the appropriate habitats in this area would help satisfy the {conservationTargets} representing {meetTargetPercentage}% of species found here."
                          conservationTargets={
                            <span>
                              <T
                                _str="conservation targets of {meetTargetTotal} species,"
                                meetTargetTotal={sentenceData.meetTargetTotal}
                                _comment="Protecting the appropriate habitats in this area would help satisfy the {conservation targets of } meetTargetTotal{ species,} representing meetTargetPercentage% of species found here."
                              />
                            </span>
                          }
                          meetTargetPercentage={
                            sentenceData.meetTargetPercentage
                          }
                          _comment="Protecting the appropriate habitats in this area would help satisfy the conservation targets of meetTargetTotal species, representing meetTargetPercentage of species found here."
                        />
                      ) : (
                        <T
                          _str="Protecting the appropriate habitats in this area would improve the {conservationTargets} moving them closer to their conservation target."
                          conservationTargets={
                            <span>
                              <T
                                _str="Species Protection Score of {SPSIncreaseTotal} species,"
                                SPSIncreaseTotal={sentenceData.SPSIncreaseTotal}
                                _comment="Protecting the appropriate habitats in this area would improve the {Species Protection Score of } SPSIncreaseTotal{ species,} moving them closer to their conservation target."
                              />
                            </span>
                          }
                          meetTargetPercentage={
                            sentenceData.meetTargetPercentage
                          }
                          _comment="Protecting the appropriate habitats in this area would improve the Species Protection Score of SPSIncreaseTotal species, moving them closer to their conservation target."
                        />
                      ))}
                  </p>
                </div>
              )}
              <section className={styles.completeDatabaseWrapper}>
                <p>
                  {t(
                    'Do you have more information about this particular area?'
                  )}
                </p>
                <a
                  className={styles.link}
                  href="https://mol.org/upload"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(' help us complete our database')}
                </a>
              </section>
              <ShareModal
                isOpen={isShareModalOpen}
                setShareModalOpen={setShareModalOpen}
              />
            </div>
          </motion.div>
        )}
        {sidebarTabActive === mapLayersTab.slug && (
          <motion.div
            className={styles.mapLayersContainer}
            key={mapLayersTab.slug}
            initial={{ opacity: 0, x: 160 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 160 }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
            id="groupDropdownScrollContainer"
          >
            <MapLayers
              activeLayers={activeLayers}
              activeCategory={activeCategory}
              handleGlobeUpdating={handleGlobeUpdating}
              map={map}
              onboardingStep={onboardingStep}
              onboardingType={onboardingType}
              view={view}
              waitingInteraction={waitingInteraction}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default connect(mapStateToProps, null)(AOISidebar);
