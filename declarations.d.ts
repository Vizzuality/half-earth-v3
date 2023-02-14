declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg';
declare module '*.svg?sprite';
declare module '*.png';
declare module '*.jpg';

declare module '@transifex/react' {
  import { FunctionComponent } from 'react';

  import { useT, T } from '@transifex/react';

  const useT: () => (key: string) => string;

  // TODO: TS-TODO Better define T return type
  const T: FunctionComponent<params> = (
    _str: string,
    _comment?: string,
    ..._params
  ) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    FunctionComponent;

  export { useT, T };
}
