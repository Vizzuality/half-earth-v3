import React from 'react';
import { Loading } from 'he-components';
import { VIEW_MODE } from  'constants/google-analytics-constants';
import styles from './geo-description-widget-styles.module.scss';
import FixedHeader from 'components/fixed-header'
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import { isMobile } from 'constants/responsive';
import errorGif from 'icons/error.gif'

const GeoDescriptionWidget = (props) => {
  const { data, loading, error, view, handleBackClick, toggleCollapsedLandscapeSidebar, isLandscapeSidebarCollapsed } = props;
  const isOnMobile = isMobile();
  
  if (loading) {
    return (
      <div className={styles.container}>
        <DummyBlurWorkaround />
        <div className={styles.loading}>
          <Loading />
          <span className={styles.loadingText}>Loading area information...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <DummyBlurWorkaround />
        <FixedHeader
          noBackClick={isOnMobile}
          toggleCollapsedLandscapeSidebar={toggleCollapsedLandscapeSidebar}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          closeSidebar={handleBackClick}
          view={view}
          viewMode={VIEW_MODE.LANDSCAPE}
          autoHeight
        />
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>
            Cannot load area information…
          </p>
          <img className={styles.errorGif} src={errorGif} alt="error" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={styles.container}>
      <DummyBlurWorkaround />
      <FixedHeader 
        noBackClick={isOnMobile}
        isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
        toggleCollapsedLandscapeSidebar={toggleCollapsedLandscapeSidebar}
        closeSidebar={handleBackClick}
        title={data.title}
        view={view}
        viewMode={VIEW_MODE.LANDSCAPE}
        autoHeight 
      />
      <p className={styles.description}>
        {data.description}
      </p>
    </div>
  );
};

export default GeoDescriptionWidget;
