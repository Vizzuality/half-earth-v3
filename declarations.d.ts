declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg';
declare module '*.svg?sprite';
declare module '*.png';
declare module '*.jpg';
