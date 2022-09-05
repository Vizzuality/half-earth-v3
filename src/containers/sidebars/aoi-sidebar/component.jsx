import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';

import { DATA } from 'router';

import { useT, useLocale } from '@transifex/react';

import { writeToForageItem } from 'utils/local-forage-utils';

import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import MapLayers from 'containers/sidebars/map-layers';
import TabsSidebar from 'containers/sidebars/tabs-sidebar';

import Button from 'components/button';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import ShareModal from 'components/share-modal';

import {
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG,
  PROTECTION_SLUG,
} from 'constants/analyze-areas-constants';
import { getSidebarTabs } from 'constants/aois';
import { getAOIBiodiversityToggles } from 'constants/biodiversity-layers-constants';
import { getHumanPressuresLandUse } from 'constants/human-pressures';
import {
  MERGED_PROTECTION,
  MERGED_LAND_HUMAN_PRESSURES,
  ALL_TAXA_PRIORITY,
} from 'constants/metadata';
import { getWDPALayers } from 'constants/protected-areas';
import {
  getAOIContextualData,
  getCountryNames,
} from 'constants/translation-constants';

import styles from './styles.module.scss';

import { ReactComponent as ClimateRegimeIcon } from 'icons/climate-regime.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as LandCoverIcon } from 'icons/land-cover.svg';
import { ReactComponent as PopulationIcon } from 'icons/population.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';

import mapStateToProps from './selectors';
import SidebarCard from './sidebar-card-content';
import SpeciesCard from './species-card';

const {
  REACT_APP_FEATURE_NEW_MENUS: FEATURE_NEW_MENUS,
} = process.env;

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
  isShareModalOpen,
  setShareModalOpen,
  dataLoaded,
  browsePage,
  changeUI,
  handleGlobeUpdating,
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) {
  const sidebarTabs = getSidebarTabs();
  const t = useT();
  const locale = useLocale();

  const humanPressuresLandUse = useMemo(
    () => getHumanPressuresLandUse(),
    [locale],
  );

  const aoiBiodiversityToggles = useMemo(
    () => getAOIBiodiversityToggles(),
    [locale],
  );
  const WDPALayers = useMemo(() => getWDPALayers(), [locale]);

  const [isEditingName, setIsEditingName] = useState(false);
  const [updatedAreaName, setUpdatedAreaName] = useState(false);

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
    [locale],
  );
  const countryNamesTranslations = useMemo(() => getCountryNames(), [locale]);

  const handleOnTabClick = useMemo(() => {
    if (sidebarTabActive === sidebarTabs[0].slug) {
      if (!aoiId) return browsePage({ type: DATA });
      changeUI({ aoiId });
    }
    return () => {};
  }, [sidebarTabActive]);

  const areaName = updatedAreaName
  || countryNamesTranslations[contextualData.areaName]
  || contextualData.areaName;

  if (FEATURE_NEW_MENUS) {
    return (
      <div className={styles.sidebarContainer}>
        <TabsSidebar
          activeLayers={activeLayers}
          view={view}
          onTabClick={() => handleOnTabClick()}
          aoiId={aoiId}
        />

        <AnimatePresence exitBeforeEnter>
          {sidebarTabActive === sidebarTabs[1].slug && (
          <motion.div
            key={sidebarTabs[1].slug}
            initial={{ opacity: 0, x: 160, width: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 160 }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
          >
            <section className={styles.headerCard}>
              {area && areaName && (
              <Button
                type="rounded"
                handleClick={handleClose}
                Icon={CloseIcon}
                className={styles.backButton}
                tooltipText={t('Go back to the globe')}
              />
              )}
              <DummyBlurWorkaround />
              <div className={styles.topRow}>
                <div className={styles.nameWrapper}>
                  {isEditingName ? (
                    <input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      type="text"
                      className={styles.areaNameEdit}
                      onChange={(e) => setUpdatedAreaName(e.target.value)}
                      placeholder={t('Type name')}
                    />
                  ) : (
                    <p className={styles.areaName}>
                      {areaName}
                    </p>
                  )}
                  {area && (
                  <p className={styles.area}>
                    {`${area} `}
                    <span>
                      {t('km')}
                      <sup>2</sup>
                    </span>
                  </p>
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
                  </div>
                )}
              </div>
            </section>
            <div className={cx(styles.content, className)}>
              <div className={styles.contextualDataRow}>
                <div className={styles.contextualIndicator} title="population">
                  <PopulationIcon />
                  <span>{population}</span>
                </div>
                <div
                  className={styles.contextualIndicator}
                  title={`${t('land cover: ')}${
                    AOIContextualTranslations[landCover && landCover.toLowerCase()]
                        || landCover
                  }`}
                >
                  <LandCoverIcon />
                  <span>
                    {AOIContextualTranslations[
                      landCover && landCover.toLowerCase()
                    ] || landCover}
                  </span>
                </div>
                <div
                  className={styles.contextualIndicator}
                  title={`${t('climate regime: ')}${
                    AOIContextualTranslations[
                      climateRegime && climateRegime.toLowerCase()
                    ] || climateRegime
                  }`}
                >
                  <ClimateRegimeIcon />
                  <span>
                    {AOIContextualTranslations[
                      climateRegime && climateRegime.toLowerCase()
                    ] || climateRegime}
                  </span>
                </div>
              </div>
              <SpeciesCard area={area} speciesData={speciesData} />
              <SidebarCard
                map={map}
                toggleType="radio"
                activeLayers={activeLayers}
                contextualData={contextualData}
                cardCategory={BIODIVERSITY_SLUG}
                layers={aoiBiodiversityToggles}
                metadataSlug={ALL_TAXA_PRIORITY}
              />
              <SidebarCard
                map={map}
                layers={WDPALayers}
                toggleType="checkbox"
                activeLayers={activeLayers}
                cardCategory={PROTECTION_SLUG}
                contextualData={contextualData}
                metadataSlug={MERGED_PROTECTION}
              />
              <SidebarCard
                map={map}
                toggleType="checkbox"
                activeLayers={activeLayers}
                layers={humanPressuresLandUse}
                contextualData={contextualData}
                cardCategory={LAND_HUMAN_PRESSURES_SLUG}
                metadataSlug={MERGED_LAND_HUMAN_PRESSURES}
              />
              <section className={styles.completeDatabaseWrapper}>
                <p>{t('Do you have more information about this particular area?')}</p>
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
          {sidebarTabActive === sidebarTabs[0].slug && (
            <motion.div
              className={styles.mapLayersContainer}
              key={sidebarTabs[0].slug}
              initial={{ opacity: 0, x: 160 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 160 }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
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
  if (!FEATURE_NEW_MENUS) {
    return (
      <>
        <section className={styles.headerCardOLD}>
          <Button
            type="rounded"
            handleClick={handleClose}
            Icon={CloseIcon}
            className={styles.backButtonOLD}
            tooltipText={t('Go back to the globe')}
          />
          <DummyBlurWorkaround />
          <div className={styles.topRowOLD}>
            <div className={styles.nameWrapper}>
              {isEditingName ? (
                <input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  type="text"
                  className={styles.areaNameEdit}
                  onChange={(e) => setUpdatedAreaName(e.target.value)}
                  placeholder={t('Type name')}
                />
              ) : (
                <p className={styles.areaName}>
                  {updatedAreaName || countryNamesTranslations[contextualData.areaName]
                  || contextualData.areaName}
                </p>
              )}
              {area && (
              <p className={styles.area}>
                {`${area} `}
                <span>
                  {t('km')}
                  <sup>2</sup>
                </span>
              </p>
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
        <div className={cx(styles.container, className)}>
          <div className={styles.contextualDataRow}>
            <div className={styles.contextualIndicator} title="population">
              <PopulationIcon />
              <span>{population}</span>
            </div>
            <div
              className={styles.contextualIndicator}
              title={`${t('land cover: ')}${
                AOIContextualTranslations[landCover && landCover.toLowerCase()]
                || landCover
              }`}
            >
              <LandCoverIcon />
              <span>
                {AOIContextualTranslations[
                  landCover && landCover.toLowerCase()
                ] || landCover}
              </span>
            </div>
            <div
              className={styles.contextualIndicator}
              title={`${t('climate regime: ')}${
                AOIContextualTranslations[climateRegime && climateRegime.toLowerCase()]
                || climateRegime
              }`}
            >
              <ClimateRegimeIcon />
              <span>
                {AOIContextualTranslations[climateRegime && climateRegime.toLowerCase()]
                || climateRegime}
              </span>
            </div>
          </div>
          <SpeciesCard area={area} speciesData={speciesData} />
          <SidebarCard
            map={map}
            toggleType="radio"
            activeLayers={activeLayers}
            contextualData={contextualData}
            cardCategory={BIODIVERSITY_SLUG}
            layers={aoiBiodiversityToggles}
            metadataSlug={ALL_TAXA_PRIORITY}
          />
          <SidebarCard
            map={map}
            layers={WDPALayers}
            toggleType="checkbox"
            activeLayers={activeLayers}
            cardCategory={PROTECTION_SLUG}
            contextualData={contextualData}
            metadataSlug={MERGED_PROTECTION}
          />
          <SidebarCard
            map={map}
            toggleType="checkbox"
            activeLayers={activeLayers}
            layers={humanPressuresLandUse}
            contextualData={contextualData}
            cardCategory={LAND_HUMAN_PRESSURES_SLUG}
            metadataSlug={MERGED_LAND_HUMAN_PRESSURES}
          />
          <section className={styles.completeDatabaseWrapper}>
            <p>{t('Do you have more information about this particular area?')}</p>
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
      </>
    );
  }
}

export default connect(mapStateToProps, null)(AOISidebar);
