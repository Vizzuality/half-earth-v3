import { arc } from 'd3-shape';

function Slice({
  value,
  fill,
  innerRadius = 0,
  outerRadius = 50,
  stroke,
  strokeWidth,
}) {
  const arcGenerator = arc().innerRadius(innerRadius).outerRadius(outerRadius);

  return (
    <path
      id={fill}
      d={arcGenerator(value)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}

export default Slice;
