export const getCSSVariable = (varName) =>
  getComputedStyle(document.documentElement).getPropertyValue(varName)?.trim();
