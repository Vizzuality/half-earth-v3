import { connect } from 'react-redux'
import Component from './globe-data-view-component.jsx';

const mapStateToProps = ({ sidebar }) => ({ isSidebarOpen: sidebar.open })

export default connect(mapStateToProps, null)(Component);