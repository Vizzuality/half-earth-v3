export type SPSSliderProps = {
  title: string;
  subtitle: string;
  min: number;
  max: number;
  bucketValues: number[];
  setFunction: () => void;
};
