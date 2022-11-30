import React from 'react';

import { ReactComponent as Logo } from 'icons/icon_half-earth.svg';
import { ReactComponent as LogoColour } from 'icons/icon_half-earth_colour.svg';

function HalfEarthLogo({ withBackground, className }) {
  return (
    <a
      href="https://www.half-earthproject.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      {withBackground ? (
        <LogoColour className={className} />
      ) : (
        <Logo className={className} />
      )}
    </a>
  );
}

export default HalfEarthLogo;
