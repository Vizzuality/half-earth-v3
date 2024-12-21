import React from 'react';

import AmphibiansIcon from 'icons/dashboard/amphibian_icon.svg?react';
import AntIcon from 'icons/dashboard/ant_icon.svg?react';
import BirdsIcon from 'icons/dashboard/bird_icon.svg?react';
import ButterFlyIcon from 'icons/dashboard/butterfly_icon.svg?react';
import MammalsIcon from 'icons/dashboard/mammal_icon.svg?react';
import OdoanteIcon from 'icons/dashboard/odonate_icon.svg?react';
import ReptilesImage from 'icons/dashboard/reptile_icon.svg?react';
import TreeIcon from 'icons/dashboard/tree_icon.svg?react';

function TaxaImageComponent(props) {
  const { taxa } = props;

  const getTaxaIcon = () => {
    let icon = '';
    switch (taxa) {
      case 'amphibians':
        icon = <AmphibiansIcon />;
        break;
      case 'ants':
        icon = <AntIcon />;
        break;
      case 'birds':
        icon = <BirdsIcon />;
        break;
      case 'butterflies':
        icon = <ButterFlyIcon />;
        break;
      case 'mammals':
        icon = <MammalsIcon />;
        break;
      case 'odonates':
        icon = <OdoanteIcon />;
        break;
      case 'reptiles':
        icon = <ReptilesImage />;
        break;
      case 'trees':
        icon = <TreeIcon />;
        break;
      default:
        break;
    }
    return icon;
  };
  return <>{getTaxaIcon()}</>;
}

export default TaxaImageComponent;
