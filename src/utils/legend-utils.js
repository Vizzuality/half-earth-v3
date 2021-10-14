export const getLegendGradient = (gradientSteps, lowValue, highValue) => {
  const stepsLength = gradientSteps.length;
  return gradientSteps.map((color, stepIndex) => ({
    color,
    value: getStepValue(stepsLength, stepIndex, lowValue, highValue)
  }))
}
  
export const getStepValue = (stepsLength, stepIndex, lowValue, highValue) => {
  if (stepIndex === 0) {
      return lowValue;
  } else if (stepIndex === stepsLength -1) {
      return highValue;
  } else {
      return '';
  }
}
