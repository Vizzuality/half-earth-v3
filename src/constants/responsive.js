import React from 'react';
import Responsive from 'react-responsive';

export const baseUnit = 16;
export const pixelBreakpoints = {
  mobile: 719,
  portrait: 720,
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

const { REACT_APP_FEATURE_MOBILE } = process.env;

export const useMobile = () =>
  (REACT_APP_FEATURE_MOBILE &&
    window.screen.width &&
    window.screen.width < pixelBreakpoints.mobile) ||
  (REACT_APP_FEATURE_MOBILE && navigator.maxTouchPoints);
// TODO: This doesn't work because we are not using the width meta tag. And so media queries wont work
// useMediaQuery({ maxWidth: remBreakpoints.mobile });

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
  const { children } = props;
  if (window.screen.width && window.screen.width < pixelBreakpoints.mobile) {
    return children;
  }
  if (navigator.maxTouchPoints) return children;
  return null;
  // TODO: This doesn't work because we are not using the width meta tag
  // return (
  //   <Responsive {...props} maxWidth={remBreakpoints.mobile}>
  //     {React.Children.map(children || null, (child, i) => {
  //       return (
  //         // eslint-disable-next-line react/no-array-index-key
  //         child && <child.type {...child.props} key={i} view={view} map={map} />
  //       );
  //     })}
  //   </Responsive>
  // );
}
