import { connect } from 'react-redux';
import actions from 'redux_modules/page-texts/page-texts';
import AboutModalComponent from  './about-modal-component';

const VIEW = 'partners';

const mapStateToProps = ({ pageTexts }) => ({
  textData: pageTexts.data[VIEW],
  loading: pageTexts.loading,
  error: pageTexts.error,
  VIEW
});

export default connect(mapStateToProps, actions)(AboutModalComponent);
