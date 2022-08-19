import React from 'react';
import Responsive, { useMediaQuery } from 'react-responsive';

export const baseUnit = 16;
export const pixelBreakpoints = {
  mobile: 599,
  portrait: 600,
  landscape: 900,
  desktop: 1200,
};
export const getRems = (size, base = baseUnit) => `${size / base}rem`;
export const remBreakpoints = {
  mobile: getRems(pixelBreakpoints.mobile),
  portrait: getRems(pixelBreakpoints.portrait),
  landscape: getRems(pixelBreakpoints.landscape),
  desktop: getRems(pixelBreakpoints.desktop),
};
export const useMobile = () => useMediaQuery({ maxWidth: remBreakpoints.mobile });

export function Desktop(props) {
  return <Responsive {...props} minWidth={remBreakpoints.desktop} />;
}
export function TabletLandscape(props) {
  return <Responsive {...props} minWidth={remBreakpoints.landscape} />;
}
export function TabletPortrait(props) {
  return <Responsive {...props} minWidth={remBreakpoints.portrait} />;
}
export function TabletPortraitOnly(props) {
  return <Responsive {...props} maxWidth={remBreakpoints.landscape} />;
}
export function TabletLandscapeOnly(props) {
  return <Responsive {...props} maxWidth={remBreakpoints.desktop} />;
}
export function MobileOnly(props) {
  return (
    <Responsive {...props} maxWidth={remBreakpoints.mobile}>
      {React.Children.map(props.children || null, (child, i) => {
        return child && <child.type {...child.props} key={i} view={props.view} map={props.map} />;
      })}
    </Responsive>
  );
}
