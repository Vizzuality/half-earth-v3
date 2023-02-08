import React from 'react';

export type SPSLegendProps = {
  isMin: boolean;
  constraintsRef: React.Ref<React.ElementRef<HTMLInputElement>>;
  setFunction: () => void;
  min: number;
  max: number;
  valuesLength: number;
};
