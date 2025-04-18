import { useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import {
  useOnboardingTooltipRefs,
  getOnboardingProps,
} from 'containers/onboarding/onboarding-hooks';
import SidebarLegend from 'containers/sidebars/sidebar-legend';

import LayerToggle from 'components/layer-toggle';
import SearchLocation from 'components/search-location';

import {
  GLOBAL_SPI_FEATURE_LAYER,
  NRC_LANDING_LAYERS_SLUG,
  MARINE_SPI_FEATURE_LAYER,
} from 'constants/layers-slugs';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import styles from './styles.module.scss';

function NRCLandingSidebar({
  activeLayers,
  className,
  changeUI,
  handleLayerToggle,
  globalAverage,
  map,
  onboardingStep,
  onboardingType,
  view,
  waitingInteraction,
}) {
  const t = useT();

  const NRCLandingLayers = [
    {
      name: t('Land'),
      value: GLOBAL_SPI_FEATURE_LAYER,
      id: GLOBAL_SPI_FEATURE_LAYER,
      title: GLOBAL_SPI_FEATURE_LAYER,
      slug: GLOBAL_SPI_FEATURE_LAYER, // TODO: change specific slug for metadata
      portalId: 'e8683dd4a3c9457aa1f4e9af8ce8fe49',
      metadataTitle: t('Land SPI'),
    },
    {
      name: t('Marine'),
      value: MARINE_SPI_FEATURE_LAYER,
      id: MARINE_SPI_FEATURE_LAYER,
      title: MARINE_SPI_FEATURE_LAYER,
      slug: MARINE_SPI_FEATURE_LAYER, // TODO: change specific slug for metadata
      portalId: '484a4ed84da5455a8a3d3f624037030d',
      metadataTitle: t('Marine SPI'),
    },
  ];

  const { landAverage, marineAverage } = globalAverage;
  const averageLoaded =
    landAverage !== undefined || marineAverage !== undefined;

  // --- Onboarding

  const tooltipRefs = useOnboardingTooltipRefs({
    changeUI,
    onboardingType,
    onboardingStep,
    waitingInteraction,
  });

  const { overlay: onboardingOverlay, onClick: onboardingOnClick } =
    getOnboardingProps({
      section: 'nrcLandingSidebar',
      styles,
      changeUI,
      onboardingStep,
      waitingInteraction,
    });

  // ---

  return (
    <motion.div
      ref={(ref) => {
        tooltipRefs.current.nrcLandingSidebar = ref;
      }}
      className={cx(className, {
        [styles.container]: true,
      })}
      {...onboardingOverlay}
      {...onboardingOnClick}
    >
      <p className={styles.title}>{t('National Report Cards')}</p>
      <div className={styles.body}>
        <p>
          {t(
            `The Half-Earth Project calls to protect half of the land and sea to safeguard the bulk of Earth's biodiversity and preserve the bulk of species.`
          )}
        </p>
        <p>
          {t(
            `To achieve this ambitious goal, every nation on earth has an essential role. We’re using a metric we’ve developed, the {spiText}. The SPI provides an estimation of how well each country is meeting conservation targets and is the basis for a National Report Card on every country in the world.`,
            {
              spiText: (
                <span className={styles.bold}>
                  {t('Species Protection Index or SPI')}
                </span>
              ),
            }
          )}
        </p>
        <p>
          {t(
            `Report cards make it possible to see the varied conservation opportunities and challenges faced by each country in the world.`
          )}
        </p>
      </div>
      <p className={styles.legendTitle}>
        {t('National Species Protection Index')}
      </p>
      <SidebarLegend className={styles.legend} legendItem="spi" />
      {averageLoaded && (
        <div className={styles.togglesContainer}>
          {NRCLandingLayers.map((layer) => {
            const { name, slug } = layer;
            const nameUpdated =
              name && slug === GLOBAL_SPI_FEATURE_LAYER
                ? `${t('Land SPI (Global average:')} ${landAverage})`
                : `${t('Marine SPI (Global average:')} ${marineAverage})`;
            const layerUpdated = { ...layer, name: nameUpdated };
            return (
              <LayerToggle
                map={map}
                option={layerUpdated}
                type="checkbox"
                variant="light"
                key={layer.value}
                activeLayers={activeLayers}
                onChange={handleLayerToggle}
                themeCategorySlug={NRC_LANDING_LAYERS_SLUG}
              />
            );
          })}
        </div>
      )}

      <SearchLocation
        reference={(ref) => {
          tooltipRefs.current.nrcLandingSearch = ref;
        }}
        view={view}
        theme="dark"
        width="full"
        parentWidth="380px"
        placeholder={t('search countries')}
        searchSourceLayerSlug={GLOBAL_SPI_FEATURE_LAYER}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
        searchType={SEARCH_TYPES.country}
      />
    </motion.div>
  );
}

export default NRCLandingSidebar;
