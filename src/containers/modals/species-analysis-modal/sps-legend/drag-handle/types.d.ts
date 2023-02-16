export type SPSHandleProps = {
  isMin?: boolean;
  setFunction: ({ min: number, max: number }) => void;
  min: number;
  max: number;
  valuesLength: number;
  handleDragStart: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
};
