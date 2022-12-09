import { createStructuredSelector } from 'reselect';

import {
  getCurrentProtection,
  getCurrentMarineProtection,
  getProtectionNeeded,
  getMarineProtectionNeeded,
} from 'containers/sidebars/national-report-sidebar/national-report-sidebar-selectors';

const mapStateToProps = createStructuredSelector({
  currentProtection: getCurrentProtection,
  currentMarineProtection: getCurrentMarineProtection,
  protectionNeeded: getProtectionNeeded,
  marineProtectionNeeded: getMarineProtectionNeeded,
});

export default mapStateToProps;
