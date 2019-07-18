import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'vizzuality-components/dist/tooltip';
import '../styles-button.scss';
// import { ReactComponent as OpacityIcon } from 'icons/opacity.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';

import cx from 'classnames';
import styles from './legend-button-styles.module.scss';

class LegendItemButtonInfo extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    icon: PropTypes.string,
    focusStyle: PropTypes.object,
    defaultStyle: PropTypes.object,
    tooltipOpened: PropTypes.bool,
    tooltipText: PropTypes.string,
    scrolling: PropTypes.bool,

    // ACTIONS
    onChangeInfo: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    icon: '',
    focusStyle: {},
    defaultStyle: {},
    tooltipOpened: false,
    tooltipText: '',
    scrolling: false,

    onChangeInfo: () => {}
  }

  state = {
    visible: false
  }

  componentWillReceiveProps(nextProps) {
    const { scrolling } = nextProps;

    if (scrolling) {
      this.setState({ visible: false });
    }
  }

  render() {
    const { activeLayer, tooltipOpened, icon, focusStyle, defaultStyle, tooltipText } = this.props;
    const { visible } = this.state;

    return (
      <Tooltip
        overlay={tooltipText || 'Layer info'}
        overlayClassName="c-rc-tooltip -default"
        placement="topRight"
        trigger={tooltipOpened ? '' : 'hover'}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
        onVisibleChange={v => this.setState({ visible: v })}
        visible={visible}
      >
        <button
          type="button"
          styleName={cx(styles.toolbarButton, { [styles.toolbarButtonActive]: visible })}
          aria-label="More information"
          onClick={() => this.props.onChangeInfo(activeLayer)}
        >
          <InfoIcon />
        </button>
      </Tooltip>
    );
  }
}

export default LegendItemButtonInfo;
