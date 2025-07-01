import React from 'react';

import { TAXA_NAMES } from 'constants/dashboard-constants';

import AmphibiansIcon from 'icons/dashboard/amphibian_icon.svg?react';
import AntIcon from 'icons/dashboard/ant_icon.svg?react';
import BirdsIcon from 'icons/dashboard/bird_icon.svg?react';
import ButterFlyIcon from 'icons/dashboard/butterfly_icon.svg?react';
import CactusIcon from 'icons/dashboard/cactus_icon.svg?react';
import ConiferIcon from 'icons/dashboard/conifer_icon.svg?react';
import FishesIcon from 'icons/dashboard/fish_icon.svg?react';
import InsectIcon from 'icons/dashboard/insect_icon.svg?react';
import MammalsIcon from 'icons/dashboard/mammal_icon.svg?react';
import MothIcon from 'icons/dashboard/moth_icon.svg?react';
import OdoanteIcon from 'icons/dashboard/odonate_icon.svg?react';
import PalmIcon from 'icons/dashboard/palm_icon.svg?react';
import ReptilesIcon from 'icons/dashboard/reptile_icon.svg?react';
import TreeIcon from 'icons/dashboard/tree_icon.svg?react';

function TaxaImageComponent(props) {
  const { taxa } = props;

  const getTaxaIcon = () => {
    let icon = '';
    if (taxa) {
      switch (taxa.toUpperCase()) {
        case TAXA_NAMES.AMPHIBIANS:
          icon = <AmphibiansIcon />;
          break;
        case TAXA_NAMES.ANTS:
          icon = <AntIcon />;
          break;
        case TAXA_NAMES.BIRDS:
          icon = <BirdsIcon />;
          break;
        case TAXA_NAMES.BUTTERFLIES:
          icon = <ButterFlyIcon />;
          break;
        case TAXA_NAMES.CACTI:
          icon = <CactusIcon />;
          break;
        case TAXA_NAMES.CONIFERS:
          icon = <ConiferIcon />;
          break;
        case TAXA_NAMES.FISHES:
          icon = <FishesIcon />;
          break;
        case TAXA_NAMES.INSECTS:
          icon = <InsectIcon />;
          break;
        case TAXA_NAMES.MAMMALS:
          icon = <MammalsIcon />;
          break;
        case TAXA_NAMES.MOTHS:
          icon = <MothIcon />;
          break;
        case TAXA_NAMES.ODONATES:
          icon = <OdoanteIcon />;
          break;
        case TAXA_NAMES.PALMS:
          icon = <PalmIcon />;
          break;
        case TAXA_NAMES.REPTILES:
          icon = <ReptilesIcon />;
          break;
        case 'PLANTS':
        case TAXA_NAMES.TREES:
          icon = <TreeIcon />;
          break;
        default:
          break;
      }
    }
    return icon;
  };
  return <>{getTaxaIcon()}</>;
}

export default TaxaImageComponent;
