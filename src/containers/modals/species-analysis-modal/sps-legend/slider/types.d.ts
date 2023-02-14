import { ReactElement } from 'react';

export type SPSSliderProps = {
  title: ReactElement;
  subtitle: ReactElement;
  min: number;
  max: number;
  bucketValues: number[];
  setFunction: ({ min: number, max: number }) => void;
};
