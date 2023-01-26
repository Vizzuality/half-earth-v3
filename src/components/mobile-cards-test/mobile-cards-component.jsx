import React, { useState } from 'react';

import { T } from '@transifex/react';

import cx from 'classnames';
import { Page } from 'framer';
import ReactMarkdown from 'react-markdown/with-html';

import SidebarLegend from 'containers/sidebars/sidebar-legend';

import styles from './mobile-cards-styles.module.scss';

function CardsComponent({ cardsContent }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.container}>
      <Page
        width="100%"
        height="100%"
        radius={3}
        center
        currentPage={current}
        onChangePage={(e) => setCurrent(e)}
        className={styles.cardPage}
      >
        {cardsContent.map((card, index) => {
          const { title, description, legendItem, legendColor, legendTitle } =
            card;
          const isSingleLegend = !!legendColor;

          return (
            <div key={title} className={styles.card}>
              <div>
                <div className={styles.indicatorBg} />
                <p className={styles.progress}>
                  {index + 1} / {cardsContent.length}
                </p>
                <h5 className={styles.title}>{title}</h5>
                <p className={styles.description}>{description}</p>
              </div>
              {legendTitle && (
                <div className={styles.legendContainer}>
                  <div
                    className={cx({
                      [styles.withLegend]: legendColor,
                    })}
                  >
                    {isSingleLegend && (
                      <span
                        className={styles.singleLegend}
                        style={{ backgroundColor: legendColor }}
                      />
                    )}
                    <p className={styles.legendTitle}>{legendTitle}</p>
                    {!isSingleLegend && (
                      <SidebarLegend
                        className={styles.legend}
                        legendItem={legendItem}
                      />
                    )}
                  </div>
                  <p className={styles.source}>
                    <span className={styles.sourceIntro}>
                      <T _str="Source:" />{' '}
                    </span>
                    <ReactMarkdown
                      key={`source-${index + 1}`}
                      source={card.source}
                      escapeHtml={false}
                    />
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </Page>
    </div>
  );
}

export default CardsComponent;
