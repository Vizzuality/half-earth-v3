export const getKeysByValue = (object, value) => Object.keys(object).filter((key) => object[key] === value);

export const getKeyByValue = (object, value) => {
  const foundKeys = getKeysByValue(object, value);
  return foundKeys.length === 1 ? foundKeys[0] : foundKeys;
};
