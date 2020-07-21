import React from 'react';
import LocalSceneCard from 'components/local-scene-card';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import styles from './local-species-card-styles.module.scss';

const LocalSpeciesCardComponent = ({
  birds,
  mammals,
  reptiles,
  amphibians,
  countryName,
  birdsEndemic,
  mammalsEndemic,
  reptilesEndemic,
  amphibiansEndemic
}) => {
  return (
    <LocalSceneCard>
      <section>
        <h3>Species composition</h3>
        <div>
          <p><span className={styles.amphibiansIcon}><AmphibiansIcon /></span> {`${amphibians} amphibians (${amphibiansEndemic} endemic)`}</p>
          <p><span className={styles.birdsIcon}><BirdsIcon /></span> {`${birds} birds (${birdsEndemic} endemic)`}</p>
          <p><span className={styles.mammalsIcon}><MammalsIcon /></span> {`${mammals} mammals (${mammalsEndemic} endemic)`}</p>
          <p><span className={styles.reptilesIcon}><ReptilesIcon /></span> {`${reptiles} reptiles (${reptilesEndemic} endemic)`}</p>
        </div>
      </section>
      <section>
        <p>{`These are the four species in ${countryName} with the smallest global range (one per taxonomic group).`}</p>
      </section>
    </LocalSceneCard>
  )
}

export default LocalSpeciesCardComponent;