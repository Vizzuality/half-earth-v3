import React from 'react';
import { Loading } from 'he-components';
import { VIEW_MODE } from  'constants/google-analytics-constants';
import styles from './geo-description-widget-styles.module.scss';
import * as actions from 'actions/url-actions';
import { connect } from 'react-redux';
import FixedHeader from 'components/fixed-header'

const GeoDescriptionWidget = (props) => {
  const { data, loading, error, view, changeGlobe } = props;

  const handleBackClick = () => {
    const params = { zoom: 4 }
    view.goTo(params).then(() => changeGlobe(params));
  };

  if (loading) {
    return (
      <div className={styles.container}>
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
        <p className={styles.errorText}>
          Cannot load area information.
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={styles.container}>
      <FixedHeader closeSidebar={handleBackClick} title={data.title} view={view} viewMode={VIEW_MODE.LANDSCAPE} autoHeight={true} />
      <div className={styles.line}></div>
      <p className={styles.description}>
        {data.description}
      </p>
    </div>
  );
};

export default connect(null, actions)(GeoDescriptionWidget);
