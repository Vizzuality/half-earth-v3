import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';
import Select from 'components/select';

import styles from './styles.module.scss';

function BiodiversityLayerToggle({
  title,
  variant,
  onChange,
  isChecked,
  onInfoClick,
  activeLayers,
  onOpacityClick,
  onBringToBackClick,
  onBringToFrontClick,
  layers,
}) {
  // const [selectedLayer, setSelectedLayer] = useState(layers[0]);
  // const key = `radio-button-${title}-${layer.value}-${variant}`;
  const key = `radio-button-${title}-test-${variant}`;
  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];

  const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  ];
  const groupedOptions = [
    {
      label: 'Colours',
      options: colourOptions,
    },
    {
      label: 'Flavours',
      options: flavourOptions,
    },
  ];
  return (

    <div className={cx(
      styles.container,
      { [styles.checked]: isChecked },
    )}
    >
      <div className={styles.radioOption}>
        <RadioButton
          id={key}
          name={title}
          option="test"
          checked={isChecked}
          onChange={onChange}
        />
        <Select
          options={layers}
          groupedOptions={groupedOptions}
          onSelect={(e) => console.info(e)}
        />
      </div>
      {isChecked && (
        <LayerTools
          option="test"
          onInfoClick={onInfoClick}
          activeLayers={activeLayers}
          onOpacityClick={onOpacityClick}
          onBringToBackClick={onBringToBackClick}
          onBringToFrontClick={onBringToFrontClick}
        />
      )}
    </div>
  );
}

BiodiversityLayerToggle.propTypes = {
  options: PropTypes.arrayOf({}),
};

BiodiversityLayerToggle.defaultProps = {
  options: [],
};

export default BiodiversityLayerToggle;
