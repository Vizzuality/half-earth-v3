import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { useT, useLocale } from '@transifex/react';

// icons
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

// components
import SourceAnnotation from 'components/source-annotation';
import LayerToggle from 'components/layer-toggle';
import Button from 'components/button';

// containers
import SidebarLegend from 'containers/sidebars/sidebar-legend';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import ProtectedAreasModal from 'containers/modals/protected-areas-modal';

// constants
import {
  PROTECTION_SLUG,
  getSidebarCardsConfig,
} from 'constants/analyze-areas-constants';

// styles
import styles from './styles.module.scss';

const SidebarCard = ({
  map,
  layers,
  onChange,
  hasLegend,
  cardTitle,
  toggleType,
  cardCategory,
  activeLayers,
  cardDescription,
  displayWarning,
  handleAllProtectedAreasClick,
  isProtectedAreasModalOpen,
  handleProtectedAreasModalToggle,
  contextualData,
  metadata,
}) => {
  const t = useT();
  const locale = useLocale();
  const sidebarCardsConfig = useMemo(() => getSidebarCardsConfig(), [locale]);

  return (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>{cardTitle}</p>
        {hasLegend && (
          <SidebarLegend
            legendItem={cardCategory}
            className={styles.legendContainer}
            theme="light"
          />
        )}
        <ReactMarkdown
          className={styles.description}
          source={cardDescription}
        />
        {cardCategory === PROTECTION_SLUG && (
          <div>
            <Button
              type="rectangular"
              className={styles.fullwidthButton}
              handleClick={handleAllProtectedAreasClick}
              label={t('ALL PROTECTED AREAS')}
            />
            <ProtectedAreasModal
              isOpen={isProtectedAreasModalOpen}
              handleModalClose={handleProtectedAreasModalToggle}
              contextualData={contextualData}
            />
          </div>
        )}
        <SourceAnnotation
          theme="dark"
          metaDataSources={metadata && metadata.source}
          className={styles.sourceContainer}
        />
      </div>
      {displayWarning ? (
        <div className={styles.warningWrapper}>
          <WarningIcon className={styles.warning} />
          <ReactMarkdown
            className={styles.description}
            source={sidebarCardsConfig[cardCategory].warning}
          />
        </div>
      ) : (
        <div className={styles.togglesContainer}>
          {layers.map((layer) => (
            <LayerToggle
              map={map}
              variant="dark"
              option={layer}
              key={layer.value}
              type={toggleType}
              onChange={onChange}
              themeCategorySlug={cardCategory}
              activeLayers={activeLayers}
            />
          ))}
        </div>
      )}
    </SidebarCardWrapper>
  );
};

export default SidebarCard;
