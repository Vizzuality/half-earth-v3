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
    .size([220, 220])
    .padding(2)
    tree(root)
    const leaves = root.leaves();
    setLeaves(leaves);
  }, [data])


  return (
    <svg className={styles.container} width='220px' height='220px'>
      {leaves.map((d, index) => (
        <g>
          <rect
            x={d.x0}
            y={d.y0}
            width={d.x1 - d.x0}
            height={d.y1 - d.y0}
            stroke='white'
            fill={d.data.name === 'Not under pressure' ? '#0E2B3B' : '#3F3576'}
            opacity={d.data.name === 'Not under pressure' ? '0.5' : '1'}
            onClick={() => { handleOnClick(leaves[index]) }}
            className={styles.square}
          />
          <text x={d.x0+5} y={d.y0+20} fontSize='12px' fill='white'>{`${d.data.name}`}</text>
          <text x={d.x0+5} y={d.y0+35} fontSize='12px' fill='white'>{`${d.data.value}%`}</text>
        </g>
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