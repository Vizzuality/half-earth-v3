// Dependencies
import React from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';
// Components
import SearchLocation from 'components/search-location';
import SidebarLegend from 'containers/sidebars/sidebar-legend';
// Constants
import { GLOBAL_SPI_FEATURE_LAYER } from 'constants/layers-slugs';
// Hooks
import { useTooltipRefs, getOnboardingProps } from 'containers/onboarding/onboarding-hooks';
// Styles
import styles from './styles.module.scss';

const NRCLandingSidebar = ({
  changeUI,
  onboardingStep,
  onboardingType,
  view,
  waitingInteraction,
}) => {
  const tooltipRefs = useTooltipRefs({
    changeUI,
    onboardingType,
    onboardingStep,
    waitingInteraction,
  });

  const {
    overlay: onboardingOverlay,
    onClick: onboardingOnClick,
  } = getOnboardingProps({
    section: 'nrcLandingSidebar',
    styles,
    changeUI,
    onboardingStep,
    waitingInteraction,
  });

  return (
    <motion.div
      ref={(ref) => {
        tooltipRefs.current.nrcLandingSidebar = ref;
      }}
      className={cx({
        [styles.container]: true,
      })}
      {...onboardingOverlay}
      {...onboardingOnClick}
    >
      <p className={styles.title}>National Report Cards</p>
      <p className={styles.body}>
        Protection Index reflects the average amount of area-based conservation
        targets met across all endemic species within a given country in a given
        year, weighted by a country's stewardship. Strategic and targeted
        protection of species habitat will generally result in a country's SPI
        increasing, but once a country meets an individual species' target,
        subsequent additional protection of habitat will not increase the
        country's SPI. Likewise, any protection of land that does not also
        protect species habitat will not increase a country's SPI.
      </p>
      <p className={styles.legendTitle}>National Species Protection Index</p>
      <SidebarLegend className={styles.legend} legendItem="spi" />
      <SearchLocation
        reference={(ref) => {
          tooltipRefs.current.nrcLandingSearch = ref;
        }}
        view={view}
        theme="dark"
        width="full"
        parentWidth="380px"
        placeholder="search countries"
        searchSourceLayerSlug={GLOBAL_SPI_FEATURE_LAYER}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />
    </motion.div>
  );
};

export default NRCLandingSidebar;
