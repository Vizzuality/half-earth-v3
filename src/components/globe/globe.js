import { connect } from 'react-redux'
import Component from './globe-component.jsx';

const mapStateToProps = ({ sidebar }) => ({ isSidebarOpen: sidebar.open })

export default connect(mapStateToProps, null)(Component);