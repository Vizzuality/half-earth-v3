import React from 'react';

import { ReactComponent as Logo } from 'icons/icon_half-earth.svg';
import { ReactComponent as LogoColour } from 'icons/icon_half-earth_colour.svg';
import { ReactComponent as LogoPDF } from 'icons/pdf-logo.svg';

function HalfEarthLogo({ withBackground, className, pdf, linkClassName }) {
  const logo = withBackground ? (
    <LogoColour className={className} />
  ) : (
    <Logo className={className} />
  );

  return (
    <a
      href="https://www.half-earthproject.org"
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
    >
      {pdf ? <LogoPDF className={className} /> : logo}
    </a>
  );
}

export default HalfEarthLogo;
