import variables from './styles.module.scss';

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
    fontWeight: FONT_WEIGHTS['font-weight-bold'],
    marginLeft: '10px',
    textTransform: 'capitalize',
  }),
  input: (styles) => ({
    ...styles,
    boxSizing: 'border-box',
    marginTop: 0,
    caretColor: 'transparent',
  }),
  menu: (provided) => ({
    ...provided,
    margin: 0,
    top: '38px',
    maxWidth: '154px',
    overflowX: 'hidden',
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: '6px',
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: '182px',
    overflowX: 'hidden',
  }),
  option: (styles, { isDisabled, isSelected, selectProps: { menuIsOpen } }) => ({
    ...styles,
    alignItems: 'center',
    backgroundColor: isSelected && 'transparent',
    borderRadius: menuIsOpen && '6px',
    color: COLORS.black,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    height: '30px',
    fontFamily: FONT_FAMILIES['font-family-1'],
    marginLeft: '6px',
    ':last-of-type': {
      borderBottom: 'none',
    },
    textTransform: 'capitalize',
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
