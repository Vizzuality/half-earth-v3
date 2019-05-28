import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import { hierarchy, treemap } from 'd3-hierarchy';

import styles from './treemap-styles.module.scss';

const TreeMapComponent = ({ data, handleOnClick }) => {

  const padding = 3;

  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    const root = hierarchy(data).sum(function(d){ return d.value})
    const tree = treemap()
    .size([220, 220])
    .padding(padding)
    tree(root)
    const leaves = root.leaves();
    setLeaves(leaves);
    ReactTooltip.rebuild()
  }, [data])


  return (
    <div>
      <svg className={styles.container} width='220px' height='220px'>
        {leaves.map((d, index) => (
          <g
            className={styles.treemap}
            key={d.x1 + d.y1}
            data-for='treemap'
            data-tip={`${d.data.name} ${Math.floor(d.data.value)}%`}
          >
            <rect
              x={d.x0}
              y={d.y0}
              width={d.x1 - d.x0}
              height={d.y1 - d.y0}
              onClick={() => { handleOnClick(leaves[index]) }}
              className={cx(
                styles.square,
                {[styles.pressureFree] : d.data.name === 'Not under pressure'}
                )}
            />
            <foreignObject
              className={styles.text}
              x={d.x0+5}
              y={d.y0+5}
              width={d.x1 - d.x0 - (2 * padding)}
              height={d.y1 - d.y0 }
            >
              <span>{`${d.data.name} ${Math.floor(d.data.value)}%`}</span>
            </foreignObject>
          </g>
        ))}
      </svg>
      <ReactTooltip id='treemap' getContent={(dataTip) => `${dataTip}`}/>
    </div>
  )
}

TreeMapComponent.propTypes = {
  handleOnClick: PropTypes.func,
  data: PropTypes.shape({
    name: PropTypes.string,
    children: PropTypes.array
  })
};

TreeMapComponent.defaultProps = {
  handleOnClick: () => {},
  data: {}
};

export default TreeMapComponent;