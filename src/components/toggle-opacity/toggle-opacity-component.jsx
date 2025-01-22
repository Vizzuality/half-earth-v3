import React from 'react';

import { useT } from '@transifex/react';

import DropIcon from 'icons/drop.svg?react';

function ToggleOpacityComponent({ layer }) {
  const t = useT();
  const displayOpacity = (item) => {
    console.log(item);
  };
  return (
    <button
      type="button"
      onClick={() => displayOpacity(layer)}
      aria-label="Toggle opacity"
      title={t('Change layer opacity')}
    >
      <DropIcon />
    </button>
  );
}

export default ToggleOpacityComponent;
