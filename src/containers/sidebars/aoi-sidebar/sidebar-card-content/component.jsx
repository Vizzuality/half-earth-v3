import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

// icons
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

// components
import SourceAnnotation from 'components/source-annotation';
import LayerToggle from 'components/layer-toggle';
import Button from 'components/button';

// containers
import Legend from 'containers/sidebars/sidebar-legend';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import ProtectedAreasModal from 'containers/modals/protected-areas-modal';

// constants
import { PROTECTION_SLUG, SIDEBAR_CARDS_CONFIG } from 'constants/analyze-areas-constants';

// styles
import styles from './styles.module.scss';

const Component = ({
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
}) => (
  <SidebarCardWrapper className={styles.cardWrapper}>
    <div>
      <p className={styles.title}>{cardTitle}</p>
      {hasLegend && <Legend legendItem={cardCategory} className={styles.legendContainer} />}
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
            label="ALL PROTECTED AREAS"
          />
          <ProtectedAreasModal
            isOpen={isProtectedAreasModalOpen}
            handleModalClose={handleProtectedAreasModalToggle}
            contextualData={contextualData}
          />
        </div>
      )}
      <SourceAnnotation
        theme='dark'
        isJSX
        metaDataSources={<a href="http://protectedplanet.net/" target="_blank" rel="noopener noreferrer">World Database on Protected Areas.</a>}
        className={styles.sourceContainer}
      />
    </div>
    {displayWarning ?
      <div className={styles.warningWrapper}>
        <WarningIcon className={styles.warning} />
        <ReactMarkdown
          className={styles.description}
          source={SIDEBAR_CARDS_CONFIG[cardCategory].warning}
        />
      </div> :
      <div className={styles.togglesContainer}>
        {layers.map(layer => (
          <LayerToggle
            map={map}
            variant='dark'
            option={layer}
            key={layer.value}
            type={toggleType}
            onChange={onChange}
            toggleCategory={cardCategory}
            activeLayers={activeLayers}
          />
        ))}
      </div>
    }
  </SidebarCardWrapper>
)

export default Component;
