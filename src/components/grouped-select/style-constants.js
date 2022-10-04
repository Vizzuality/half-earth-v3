import variables from './grouped-select-styles.module.scss';

const getColorsFromSettings = (prefix, isArray) => {
  const colors = {};
  Object.keys(variables).forEach((v) => {
    if (v.startsWith(prefix)) {
      const colorKey = v.replace(`${prefix}-`, '');
      colors[colorKey] = isArray ? variables[v].split(',') : variables[v];
    }
  });
  return colors;
};

const COLORS = getColorsFromSettings('colors');
const FONT_SIZES = getColorsFromSettings('fontSizes');
const FONT_WEIGHTS = getColorsFromSettings('fontWeights');
const FONT_FAMILIES = getColorsFromSettings('fontFamily');

export const customStyles = {
  container: () => ({
    width: '100%',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255, 0.1)',
    borderRadius: '6px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: '38px',
    fontSize: FONT_SIZES['font-size-sm'],
    width: '100%',
    outline: 'none',
    paddingLeft: '6px',
    paddingTop: 0,
    pointerEvents: state.selectProps.disabled && 'none',
    transition: 'all .2s ease-in-out',
    ':hover': {
      border: (state.isFocused || state.selectProps.error) && '1px solid transparent',
    },
  }),
  groupHeading: () => ({
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['font-family-1'],
    fontWeight: FONT_WEIGHTS['font-weight-bold'],
    padding: '10px 0 10px 10px',
    textTransform: 'capitalize',
  }),
  group: () => ({
    padding: 0,
  }),
  input: (styles) => ({
    ...styles,
    boxSizing: 'border-box',
    marginTop: 0,
    caretColor: 'transparent',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '0 0 6px 6px',
    margin: 0,
    top: 0,
    maxWidth: '154px',
    overflowX: 'hidden',
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: '182px',
    overflowX: 'hidden',
  }),
  option: (styles, { isDisabled, isSelected }) => ({
    ...styles,
    alignItems: 'center',
    backgroundColor: isSelected && COLORS.alto,
    color: COLORS.black,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    height: '36px',
    margin: 0,
    fontFamily: FONT_FAMILIES['font-family-1'],
    fontSize: '14px',
    paddingLeft: '18px',
    ':last-of-type': {
      borderBottom: 'none',
    },
    textTransform: 'capitalize',
    ':hover': {
      backgroundColor: COLORS.alto,
    },
  }),
  placeholder: (styles, state) => ({
    ...styles,
    color: COLORS.white,
    fontFamily: FONT_FAMILIES['font-family-1'],
    opacity: state.selectProps.disabled && 0.4,
    transition: 'transform 0.3s ease-out',
  }),
  valueContainer: (styles) => ({
    ...styles,
    display: 'flex',
  }),
};
