import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useT } from '@transifex/react';

import cx from 'classnames';

import useEventListener from 'hooks/use-event-listener';

import MaskAndOutlineGraphicLayer from 'containers/layers/mask-and-outline-graphic-layer';

import Button from 'components/button';

import { ReactComponent as CheckIcon } from 'icons/check.svg';

import styles from './sketch-widget.styles.module.scss';

function SketchWidget({
  sketchTool,
  setSketchWidgetMode,
  sketchWidgetMode,
  setSketchTooltipType,
  setUpdatedGeometry,
  view,
  updatedGeometry,
}) {
  if (!sketchTool) return null;
  const t = useT();
  const [selectedTool, setSelectedTool] = useState('polygon');
  useEffect(() => {
    sketchTool.create('polygon');
  }, []);

  const handleCancel = () => {
    if (sketchTool.layer) {
      // Remove geometry for 'Esc' press
      sketchTool.layer.remove(sketchTool.layer.graphics.items[0]);
    }
    // Remove mask
    setUpdatedGeometry(null);
    sketchTool.delete();
    sketchTool.cancel();
    setSketchWidgetMode('create');
    if (selectedTool) {
      setSketchTooltipType(selectedTool);
      sketchTool.create(selectedTool);
    }
  };

  // Override default esc press to reselect the tool when canceling
  const keyEscapeEventListener = (evt) => {
    const event = evt;
    if (event.keyCode === 27) handleCancel();
  };
  useEventListener('keydown', keyEscapeEventListener);

  const createButtons = [
    { type: 'polygon', label: t('polygon'), icon: 'polygon' },
    { type: 'rectangle', label: t('rectangle'), icon: 'checkbox-unchecked' },
    { type: 'circle', label: t('circle'), icon: 'radio-unchecked' },
  ];
  const modifyButtons = [
    { type: 'undo', label: t('undo'), icon: 'undo' },
    { type: 'redo', label: t('redo'), icon: 'redo' },
  ];

  const renderCreateButton = (buttonType, buttonLabel, icon) => (
    <button
      key={`button-${buttonLabel}`}
      aria-label={`Draw a ${buttonLabel}`}
      title={`Draw a ${buttonLabel}`}
      className={cx(
        'esri-sketch__button',
        `esri-icon-${icon}`,
        styles.sketchButton,
        styles.sketchButtonCreate,
        {
          [styles['esri-sketch__button--selected']]:
            selectedTool === buttonType,
        }
      )}
      data-tool-name={buttonType}
      role="menuitemradio"
      aria-checked={selectedTool === buttonType}
      type="button"
      onClick={() => {
        setSelectedTool(buttonType);
        setSketchTooltipType(buttonType);
        sketchTool.delete();
        setSketchWidgetMode('create');
        sketchTool.create(buttonType);
      }}
    />
  );

  const renderModifyButton = (
    buttonType,
    buttonLabel,
    icon,
    text,
    className
  ) => (
    <button
      key={`button-${buttonLabel}`}
      aria-label={`${buttonLabel} selection`}
      className={cx(
        'esri-sketch__button',
        `esri-icon-${icon}`,
        styles.sketchButton,
        className
      )}
      data-tool-name={buttonType}
      type="button"
      onClick={() => {
        if (buttonType === 'delete') {
          handleCancel();
        } else if (buttonType === 'undo') {
          sketchTool.undo();
        } else if (buttonType === 'redo') {
          sketchTool.redo();
        }
      }}
    >
      {text}
    </button>
  );

  const renderPanel = (
    <div
      className={cx(styles.sketchWidget, {
        [styles.edit]: sketchWidgetMode === 'edit',
      })}
    >
      {updatedGeometry && (
        <MaskAndOutlineGraphicLayer geometry={updatedGeometry} view={view} />
      )}
      {sketchWidgetMode === 'create' ? (
        <>
          <div
            role="menu"
            className="esri-sketch__section esri-sketch__tool-section"
          >
            {createButtons.map((button) =>
              renderCreateButton(button.type, button.label, button.icon)
            )}
          </div>
          <div
            role="menu"
            className="esri-sketch__section esri-sketch__tool-section"
          >
            {modifyButtons.map((button) =>
              renderModifyButton(button.type, button.label, button.icon)
            )}
          </div>
          <div
            role="menu"
            className="esri-sketch__section esri-sketch__tool-section"
          >
            {renderModifyButton('delete', t('delete'), 'trash')}
          </div>
        </>
      ) : (
        <div
          role="menu"
          className="esri-sketch__section esri-sketch__tool-section"
        >
          {renderModifyButton(
            'delete',
            t('delete'),
            'trash',
            <span className={styles.buttonTitle}>{t('DELETE AREA')}</span>,
            styles.editDelete
          )}
          <Button
            type="rectangular"
            Icon={CheckIcon}
            className={styles.editAnalyzeButton}
            handleClick={() => {
              setSketchWidgetMode('finished');
              sketchTool.complete();
            }}
            label={t('ANALYZE AREA')}
          />
        </div>
      )}
    </div>
  );

  return ReactDOM.createPortal(
    renderPanel,
    // eslint-disable-next-line no-undef
    document.getElementById('root')
  );
}

export default SketchWidget;
