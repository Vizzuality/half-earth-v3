import COLORS from 'styles/settings';

export const getBarStyles = (color1, value1, color2, value2) => {
  const str = color2
    ? `linear-gradient(to right,
    ${color1},
    ${color1} ${value1}%,
    ${color2} ${value1}%,
    ${color2} ${value2}%,
    ${COLORS['white-opacity']} ${value2}%,
    ${COLORS['white-opacity']} 100%`
    : `linear-gradient(to right,
      ${color1},
      ${color1} ${value1}%,
      ${COLORS['white-opacity']} ${value1}%,
      ${COLORS['white-opacity']} 100%`;
  return str;
};
