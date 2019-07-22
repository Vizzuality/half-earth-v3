import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from 'icons/closeWhite.svg';
import { Tooltip } from 'vizzuality-components';
import styles from './legend-item-button-remove.module.scss';
import cx from 'classnames';

class LegendItemButtonRemove extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    icon: PropTypes.string,
    focusStyle: PropTypes.object,
    defaultStyle: PropTypes.object,
    tooltipOpened: PropTypes.bool,
    tooltipText: PropTypes.string,
    scrolling: PropTypes.bool,

    // ACTIONS
    onRemoveLayer: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    icon: '',
    focusStyle: {},
    defaultStyle: {},
    tooltipOpened: false,
    tooltipText: '',
    scrolling: false,

    // ACTIONS
    onRemoveLayer: () => {}
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
        overlay={tooltipText || 'Remove layer'}
        overlayClassName="c-rc-tooltip -default legendCloseButtonTooltip"
        placement="topRight"
        trigger={tooltipOpened ? '' : 'hover'}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
        onVisibleChange={v => this.setState({ visible: v })}
        visible={visible}
      >
        <button
          type="button"
          className={cx(styles.toolbarButton, { [styles.toolbarButtonActive]: visible })}
          onClick={() => this.props.onRemoveLayer(activeLayer)}
          aria-label="Remove"
        >
          <CloseIcon />
        </button>
      </Tooltip>
    );
  }
}

export default LegendItemButtonRemove;
