import { useEffect, useState, Children } from 'react';
import Responsive from 'react-responsive';

export const baseUnit = 16;
export const pixelBreakpoints = {
  mobile: 719,
  portrait: 720,
  landscape: 900,
  desktop: 1200,
};
export const getRems = (size, base = baseUnit) => `${size / base}rem`;
export const useMobile = () => {
  const [value, set] = useState(false);

  useEffect(() => {
    if (
      window.screen.width < pixelBreakpoints.mobile ||
      (window.screen.height < pixelBreakpoints.mobile &&
        window.matchMedia('(orientation: landscape)').matches)
    )
      set(true);
  });

  return value;
};

export const useLandscape = () => {
  const match = () => {
    if (!window.matchMedia) {
      return false;
    }
    return window.matchMedia('(orientation: landscape)').matches;
  };

  const [value, set] = useState(match);

  useEffect(() => {
    const handler = () => set(match);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  });

  return value;
};

export function Desktop(props) {
  return <Responsive {...props} minWidth={pixelBreakpoints.desktop} />;
}
export function TabletLandscape(props) {
  return <Responsive {...props} minWidth={pixelBreakpoints.landscape} />;
}
export function TabletPortrait(props) {
  return <Responsive {...props} minWidth={pixelBreakpoints.portrait} />;
}
export function TabletPortraitOnly(props) {
  return <Responsive {...props} maxWidth={pixelBreakpoints.landscape} />;
}
export function TabletLandscapeOnly(props) {
  return <Responsive {...props} maxWidth={pixelBreakpoints.desktop} />;
}
const isChromebook = navigator.userAgent.indexOf('CrOS') !== -1;
export function MobileOnly(props) {
  const { children, view, map } = props;
  if (
    window.screen.width &&
    window.screen.width < pixelBreakpoints.mobile &&
    !isChromebook
  ) {
    return children;
  }

  return (
    <Responsive {...props} maxWidth={pixelBreakpoints.mobile}>
      {Children.map(children || null, (child, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          child && <child.type {...child.props} key={i} view={view} map={map} />
        );
      })}
    </Responsive>
  );
}
