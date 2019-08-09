import React from 'react';
import cx from 'classnames';
import { useSpring, animated } from 'react-spring';


const FeaturedMapsListComponent = ({ 
  className,
  featuredMapsList,
  selectedSidebar,
  isLandscapeMode,
  isFullscreenActive,
  handleFeaturedMapClick
}) => {
  const isOpen = selectedSidebar === 'featuredMapsList';
  const slide = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isOpen && !isLandscapeMode && !isFullscreenActive ? 0 : -400,
    delay: isOpen && !isLandscapeMode && !isFullscreenActive ? 400 : 0
  })
  return (
    <animated.div className={cx(className)} style={slide}>
      {featuredMapsList.map(map => <p key={map.title} onClick={() => handleFeaturedMapClick(map.slug)}style={{ color: 'white'}}>{map.title}</p>)}
    </animated.div>
  )
}

export default FeaturedMapsListComponent;