import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { format } from 'd3-format';

import styles from './treemap-styles.module.scss';

const TreeMapComponent = ({ data, handleOnClick, activeRect }) => {
  const padding = 3;
  const width = 250;
  const height = 250;

  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    const root = hierarchy(data).sum(function(d){ return d.value})
    const tree = treemap()
      .size([width, height])
      .padding(padding)
    tree.tile(treemapBinary)
    tree(root)
    const leaves = root.leaves();
    setLeaves(leaves);
  }, [data])

  const isSelected = (array, element) => {
    return array.some(current => current === element)
  }

  return (
    <div>
      <svg className={styles.container} width={`${width}px`} height={`${height}px`}>
        {leaves.map((d, index) => (
          <g
            className={styles.treemap}
            key={d.x1 + d.y1 + Date.now()}
            data-for='treemap'
            data-tip={((d.x1 - d.x0) < 30 || (d.y1 - d.y0) < 30) ? `${d.data.name} ${Math.floor(d.data.value)}%` : ''}
            >
            <rect
              x={d.x0}
              y={d.y0}
              width={d.x1 - d.x0}
              height={d.y1 - d.y0}
              onClick={() => handleOnClick(d)}
              className={cx(
                styles.square,
                {[styles.pressureFree] : d.data.name === 'Pressure free',
                 [styles.selected] : isSelected(activeRect, d.data.rasterId)}
                )}
            />
            <foreignObject
              className={cx(styles.foreignObject)}
              x={d.x0}
              y={d.y0}
              width={d.x1 - d.x0}
              height={d.y1 - d.y0}
            >
              <p
                className={cx(styles.text,{
                  [styles.removeText] : (d.x1 - d.x0) < 15 || (d.y1 - d.y0) < 15,
                  [styles.ellipsis] : (d.x1 - d.x0) < 60 || (d.y1 - d.y0) < 25
                })}
              >
                {`${d.data.name} ${format(".2%")(d.data.value / 100)}`}
              </p>
            </foreignObject>
          </g>
        ))}
      </svg>
      <ReactTooltip id='treemap' getContent={dataTip => `${dataTip}`}/>
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