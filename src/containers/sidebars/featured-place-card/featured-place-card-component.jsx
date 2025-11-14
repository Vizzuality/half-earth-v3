/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import CloseButton from 'components/close-button';
import ShareModalButton from 'components/share-button';
import ShareModal from 'components/share-modal';

import animationStyles from 'styles/common-animations.module.scss';

import ChevronIcon from 'icons/arrow_right.svg?react';

import styles from './featured-place-card-styles.module';

function FeaturePlaceLinks({ slug, hepmLinks, t }) {
  if(slug === 'eoWilson'){
    return (
        <a
          key={hepmLinks[0].id}
          href={hepmLinks[0].link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {t(`Preserve`)}
      </a>
    );
  }
  return hepmLinks.map((link, index) => (
    <a
      key={link.id}
      href={link.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {index === 0 && t(`Priority Place #${link.id}`)}
      {index > 0 && t(`, ${link.id}`)}
    </a>
  ));
}

function FeaturedPlaceCardComponent({
  selectedFeaturedPlace,
  selectedFeaturedMap,
  isFullscreenActive,
  featuredMap,
  featuredPlace,
  handleNextPlaceClick,
  handlePrevPlaceClick,
  handleClose,
  hotspotsNumbers,
}) {
  const t = useT();

  const isOnScreen = selectedFeaturedPlace && !isFullscreenActive;
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const contentWrapper = useRef();
  useEffect(() => {
    contentWrapper.current.scrollTop = 0;
  }, [featuredPlace]);

  return (
    <div className={styles.container}>
      <div
        className={cx(
          styles.content,
          animationStyles.transformOpacityWithDelay,
          { [animationStyles.bottomUp]: !isOnScreen }
        )}
      >
        <section className={styles.cardGrid}>
          <div className={styles.breadcrumb}>
            {hotspotsNumbers && selectedFeaturedMap !== 'discoverPlaces' &&
              `${hotspotsNumbers.position} / ${hotspotsNumbers.size} ${t(
                'Hotspots'
              )}`}
              {selectedFeaturedMap === 'discoverPlaces' && t('Places for a Half-Earth Future')}
          </div>
          <nav className={styles.navigation}>
            <div className={styles.placesNavigator}>
              <div
                role="button"
                aria-label="Previous place"
                tabIndex={0}
                className={styles.arrowWrapper}
                onClick={() => handlePrevPlaceClick(selectedFeaturedPlace)}
              >
                <ChevronIcon className={styles.leftArrow} />
              </div>
              <div className={styles.separator} />
              <div
                role="button"
                aria-label="Next place"
                tabIndex={0}
                className={styles.arrowWrapper}
                onClick={() => handleNextPlaceClick(selectedFeaturedPlace)}
              >
                <ChevronIcon className={styles.rightArrow} />
              </div>
            </div>
          </nav>
          {featuredPlace && (
            <>
              <div className={styles.pictureContainer}>
                <ShareModalButton
                  theme={{ shareButton: styles.shareButton }}
                  setShareModalOpen={setShareModalOpen}
                />
                <ShareModal
                  isOpen={isShareModalOpen}
                  setShareModalOpen={setShareModalOpen}
                />
                {featuredPlace.imageUrl && (
                  <img
                    src={featuredPlace.imageUrl}
                    className={styles.picture}
                    alt={featuredPlace.title}
                  />
                )}
                {featuredPlace.link && (
                  <a
                    href={featuredPlace.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {t('Read the full story')}
                  </a>
                )}
              </div>
              <div className={styles.contentContainer} ref={contentWrapper}>
                <h2 className={styles.title}>
                  {featuredPlace.title}
                </h2>

                {featuredPlace.hepmLink?.links?.length > 0 && (
                  <div className={styles.hepmLinks}>
                    <FeaturePlaceLinks slug={featuredPlace.slug} hepmLinks={featuredPlace.hepmLink.links} t={t} />
                    {/* {featuredPlace.hepmLink.links.map((link, index) => (<a
                      key={link.id}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {index === 0 && t(`Priority Place #${link.id}`)}
                      {index > 0 && t(`, #${link.id}`)}
                    </a>))} */}
                  </div>
                )}
                <div className={styles.description}>
                  <p
                    className={styles.text}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: featuredPlace.description,
                    }}
                  />
                  {featuredMap && featuredMap.sourceText && (
                    <span className={styles.sourceText}>
                      ({t('Source:')} <i>{featuredMap.sourceText}</i>)
                    </span>
                  )}
                  {featuredPlace.dateTime && (
                    <span className={styles.sourceText}>
                      {featuredPlace.dateTime}
                    </span>
                  )}
                  </div>
              </div>
            </>
          )}
          <CloseButton
            handleClose={handleClose}
            className={styles.backButton}
            tooltipText={t('Go back to the globe')}
          />
        </section>
      </div>
    </div>
  );
}

export default FeaturedPlaceCardComponent;
