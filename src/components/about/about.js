import { connect } from 'react-redux';
import AboutComponent from  './about-component';
import { openAboutPageAnalyticsEvent } from 'actions/google-analytics-actions';

export default connect(null, openAboutPageAnalyticsEvent)(AboutComponent);
