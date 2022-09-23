import React, { useEffect, useMemo, useState } from 'react';

import { useLocale } from '@transifex/react';

import cx from 'classnames';

import Dropdown from 'components/dropdown';
import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';

import {
  getResolutions,
  TERRESTRIAL,
  GROUPED_OPTIONS,
} from 'constants/biodiversity-layers-constants';

import theme from 'styles/themes/checkboxes-theme.module.scss';

import styles from './styles.module.scss';

function BiodiversityLayerToggle({
  activeLayers,
  handleInfoClick,
  layers,
  layerToggleAnalytics,
  onBringToBackClick,
  onBringToFrontClick,
  onOpacityClick,
  onChange,
  resolutionOptions,
  selectedResolution,
  setSelectedResolution,
  themeCategorySlug,
  title,
  variant,
}) {
  console.log({ themeToggle: theme });
  const locale = useLocale();
  const resolutions = useMemo(() => getResolutions(), [locale]);

  const [selectedLayer, setSelectedLayer] = useState(layers[0]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const newChecked = activeLayers.some((layer) => layer.title === selectedLayer.value);
    setIsChecked(newChecked);
    if (newChecked) { layerToggleAnalytics(selectedLayer.value); }
  }, [activeLayers]);

  const key = `radio-button-${title}-${selectedLayer.value}-${variant}`;

  return (
    <div
      className={cx(
        styles.wrapper,
        {
          [styles[variant]]: variant,
          [theme[themeCategorySlug]]: themeCategorySlug,
          [styles.checked]: isChecked,
        },
      )}
    >
      <div className={cx(
        styles.container,
        { [styles.checked]: isChecked },
      )}
      >
        <div className={styles.radioOption}>
          <RadioButton
            id={key}
            theme={theme.biodiversity}
            name={title}
            option={selectedLayer}
            checked={isChecked}
            onChange={onChange}
            biodiversityToggle
            groupedOptions={GROUPED_OPTIONS(layers)}
            setSelectedLayer={setSelectedLayer}
          />
        </div>
        <div style={{
          height: '38px',
          paddingLeft: '4px',
        }}
        >
          <Dropdown
            theme="dark"
            parentWidth="170px"
            options={resolutionOptions}
            selectedOption={resolutions[selectedResolution[TERRESTRIAL]]}
            handleOptionSelection={(op) => setSelectedResolution({
              ...selectedResolution,
              [TERRESTRIAL]: op.slug,
            })}
            disabled={
          resolutionOptions.length < 2
            }
          />
        </div>

        <LayerTools
          option={selectedLayer}
          onInfoClick={handleInfoClick}
          activeLayers={activeLayers}
          onOpacityClick={onOpacityClick}
          onBringToBackClick={onBringToBackClick}
          onBringToFrontClick={onBringToFrontClick}
        />

      </div>
    </div>
  );
}

export default BiodiversityLayerToggle;
