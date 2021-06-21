import React from 'react';
import { ReactComponent as Logo } from 'icons/icon_half-earth.svg';

const HalfEarthLogo = props => (
  <a
    href="https://www.half-earthproject.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Logo {...props}/>
  </a>
)

export default HalfEarthLogo;