import React, { useState } from 'react';
import cx from 'classnames';
import CategoryBox from 'components/category-box';
import {ReactComponent as AnalyzeAreasIcon} from "icons/analyze_areas.svg";
import styles from './styles.module.scss';

const AnalyzeAreasCardComponent = ({}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  return (
    <div className={cx(
      styles.sidebarCardContainer,
      { [styles.open]: isOpen }
    )}>
      <CategoryBox
        title="Analyze areas"
        Icon={AnalyzeAreasIcon}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
    </div>
  )

}

export default AnalyzeAreasCardComponent;