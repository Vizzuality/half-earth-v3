import COLORS from 'styles/settings';

export const getBarStyles = ({
  color1,
  value1,
  color2,
  value2,
  variant = 'dark',
}) => {
  const backgroundColor =
    variant === 'dark' ? COLORS['white-opacity'] : COLORS['athens-gray'];
  const str = color2
    ? `linear-gradient(to right,
    ${color1},
    ${color1} ${value1}%,
    ${color2} ${value1}%,
    ${color2} ${value2}%,
    ${backgroundColor} ${value2}%,
    ${backgroundColor} 100%`
    : `linear-gradient(to right,
      ${color1},
      ${color1} ${value1}%,
      ${backgroundColor} ${value1}%,
      ${backgroundColor} 100%`;
  return str;
};
