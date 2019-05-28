import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { hierarchy, treemap } from 'd3-hierarchy';

import styles from './treemap-styles.module.scss';

// data needs to be a hierarchical object
// const data = {
//   name: 'Human Pressures',
//   children: [
//     {
//       name: 'Irrigated agriculture',
//       value: 0.57
//     },
//     {
//       name: 'Rainfed agriculture',
//       value: 0.57
//     },
//     {
//       name: 'Urban pressures',
//       value: 0.57
//     },
//     {
//       name: 'Not under pressure',
//       value: 0.57
//     }
//   ]
// }

const TreeMapComponent = ({ data, handleOnClick }) => {

  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    const root = hierarchy(data).sum(function(d){ return d.value})
    const tree = treemap()
    .size([400, 400])
    .padding(2)
    tree(root)
    const leaves = root.leaves();
    setLeaves(leaves);
  }, [data])

  return (
    <svg className={styles.container}>
      {leaves.map(d => (
        <rect
          x={d.x0}
          y={d.y0}
          width={d.x1 - d.x0}
          height={d.theme.stroke}
          fill={d.theme.fill}
          onClick={d => handleOnClick(d)}
          classNAme={styles.square}
        />
      ))}
    </svg>
  )
}

TreeMapComponent.propTypes = {
  handleOnClick: PropTypes.func,
  data: PropTypes.shape({
    x0: PropTypes.number,
    x1: PropTypes.number,
    y0: PropTypes.number,
    y1: PropTypes.number,
    theme: PropTypes.shape({
      stroke: PropTypes.string,
      fill: PropTypes.string
    })
  })
};

TreeMapComponent.defaultProps = {
  handleOnClick: () => {},
  data: {}
};

export default TreeMapComponent;