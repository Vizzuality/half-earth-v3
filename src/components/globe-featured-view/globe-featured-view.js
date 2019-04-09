import { connect } from 'react-redux'
import Component from './globe-featured-view-component.jsx';

const mapStateToProps = ({ sidebar }) => ({ isSidebarOpen: sidebar.open })

export default connect(mapStateToProps, null)(Component);