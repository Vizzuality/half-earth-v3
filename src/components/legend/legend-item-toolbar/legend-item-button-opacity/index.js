import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from 'vizzuality-components/dist/tooltip';
import LegendOpacityTooltip from './opacity-tooltip';
import { ReactComponent as OpacityIcon } from 'icons/opacity.svg';
import cx from 'classnames';
import styles from './legend-item-button-opacity-styles.module.scss';
import domAlign from 'dom-align';

class LegendItemButtonOpacity extends PureComponent {
  static propTypes = {
    layers: PropTypes.array,
    activeLayer: PropTypes.object,
    visibility: PropTypes.bool,
    tooltipOpened: PropTypes.bool,
    icon: PropTypes.string,
    className: PropTypes.string,
    focusStyle: PropTypes.object,
    defaultStyle: PropTypes.object,
    enabledStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    tooltipText: PropTypes.string,
    scrolling: PropTypes.bool,

    onChangeOpacity: PropTypes.func,
    onTooltipVisibilityChange: PropTypes.func
  }

  static defaultProps = {
    layers: [],
    activeLayer: {},
    visibility: true,
    icon: '',
    className: '',
    focusStyle: {},
    defaultStyle: {},
    enabledStyle: {},
    disabledStyle: {},
    tooltipOpened: false,
    tooltipText: '',
    scrolling: false,

    onChangeOpacity: () => {},
    onTooltipVisibilityChange: () => {}
  }

  state = {
    visibilityHover: false,
    visibilityClick: false
  }

  componentWillReceiveProps(nextProps) {
    const { scrolling } = nextProps;
    
    if (scrolling) {
      this.onTooltipVisibilityChange(false);
    }
  }

  onTooltipVisibilityChange = (visibility) => {
    const { onTooltipVisibilityChange } = this.props;
    
    this.setState({
      visibilityHover: false,
      visibilityClick: visibility
    });

    onTooltipVisibilityChange(visibility);
  }

  render() {
    const {
      layers,
      visibility,
      activeLayer,
      tooltipOpened,
      icon,
      className,
      enabledStyle,
      defaultStyle,
      disabledStyle,
      focusStyle,
      tooltipText,
      scrolling,
      ...rest
    } = this.props;

    const { visibilityClick, visibilityHover } = this.state;
    const { opacity } = activeLayer;
    let iconStyle = visibility ? defaultStyle : disabledStyle;
    if (visibility && (visibilityHover || visibilityClick)) {
      iconStyle = focusStyle;
    }
    if (visibility && opacity < 1) iconStyle = enabledStyle;

    return (
      <Tooltip
        overlay={
          visibility && (
          <LegendOpacityTooltip
            layers={layers}
            activeLayer={activeLayer}
            onChangeOpacity={this.props.onChangeOpacity}
            {...rest}
          />
        )}
        visible={visibility && visibilityClick}
        overlayClassName={`c-rc-tooltip ${classnames({ '-default': visibility })} ${className || ''} opacityChangeTooltip`}
        placement="topLeft"
        trigger={['click']}
        onVisibleChange={this.onTooltipVisibilityChange}
        destroyTooltipOnHide
        className={styles.opacityTooltip}
        // overlayClassName='opacityTooltip'
        // overlayStyle={{ color: 'pink' }}
      >
        <Tooltip
          visible={visibilityHover && !visibilityClick && visibility}
          overlay={tooltipText || (`Opacity ${opacity ? `(${Math.round(opacity * 100)}%)` : ''}`)}
          overlayClassName="c-rc-tooltip -default opacityTooltip"
          placement="topLeft"
          trigger={tooltipOpened ? '' : 'hover'}
          onVisibleChange={v => this.setState({ visibilityHover: v })}
          destroyTooltipOnHide

        >
          <button
            type="button"
            className={cx(styles.toolbarButton,
              { [styles.toolbarButtonVisibilityChanged]: visibility },
              { [styles.toolbarButtonActive]: visibilityClick },
            )}
            aria-label="Change opacity"
          >
            <OpacityIcon />
          </button>
        </Tooltip>

      </Tooltip>
    );
  }
}

export default LegendItemButtonOpacity;
