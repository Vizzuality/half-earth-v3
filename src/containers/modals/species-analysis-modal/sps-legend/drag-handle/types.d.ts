export type SPSHandleProps = {
  isMin?: boolean;
  setFunction: ({ min: number, max: number }) => void;
  min: number;
  max: number;
  valuesLength: number;
};
