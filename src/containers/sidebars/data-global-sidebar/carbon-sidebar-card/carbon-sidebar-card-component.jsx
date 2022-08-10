// Dependencies
import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useT, useLocale } from '@transifex/react';

// Components
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';
import SidebarLegend from 'containers/sidebars/sidebar-legend';
// Constants
import { CARBON_LAYER } from 'constants/layers-slugs';
import { getCarbonLayer } from 'constants/carbon-layer';

// Hooks
// Styles
import styles from './carbon-sidebar-card-styles.module.scss';
import checkboxTheme from 'styles/themes/checkboxes-theme.module.scss';
// Assets
import CarbonThumbnail from 'images/carbon.png';

const CarbonSidebarCardComponent = ({
  map,
  source,
  activeLayers,
  className,
  handleLayerToggle,
  countedActiveLayers,
}) => {
  const t = useT();
  const locale = useLocale();

  const carbonLayer = useMemo(() => getCarbonLayer(), [locale]);
  const texts = {
    categoryTitle: t('Carbon'),
    description: t(
      'Irrecoverable carbon stores in nature that are vulnerable to release from human activity.'
    ),
  };

  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  return (
    <motion.div
      className={cx(styles.sidebarCardContainer, className, {
        [styles.open]: isOpen,
      })}
    >
      <CategoryBox
        title={texts.categoryTitle}
        image={CarbonThumbnail}
        counter={countedActiveLayers}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen })}
      >
        <span className={styles.description}>{texts.description}</span>
        <SidebarLegend
          legendItem={CARBON_LAYER}
          className={styles.legendContainer}
        />
        <div className={styles.togglesContainer}>
          <LayerToggle
            key={carbonLayer.value}
            map={map}
            option={carbonLayer}
            variant="light"
            type="checkbox"
            activeLayers={activeLayers}
            themeCategorySlug={CARBON_LAYER}
            theme={checkboxTheme.carbonLayer}
            onChange={(option) => handleLayerToggle(option, CARBON_LAYER)}
          />
        </div>
        <SourceAnnotation
          theme="light"
          metaDataSources={source}
          className={styles.sourceContainer}
        />
      </div>
    </motion.div>
  );
};

export default CarbonSidebarCardComponent;
