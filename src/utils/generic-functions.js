export const getKeysByValue = (object, value) => Object.keys(object).filter(key => object[key] === value);

export const getKeyByValue = (object, value) => {
  const foundKeys = getKeysByValue(object, value);
  return foundKeys.length === 1 ? foundKeys[0] : foundKeys;
}

export const setCSSvariable = (variableName, value) => {
  const root = document.documentElement;
  root.style.setProperty(variableName, value);
}