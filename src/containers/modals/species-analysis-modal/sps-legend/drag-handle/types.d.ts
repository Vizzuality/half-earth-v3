import Range from '../../types';

export type SPSHandleProps = {
  isMin?: boolean;
  setFunction: ({ min: number, max: number }: Range) => void;
  min: number;
  max: number;
  valuesLength: number;
};
