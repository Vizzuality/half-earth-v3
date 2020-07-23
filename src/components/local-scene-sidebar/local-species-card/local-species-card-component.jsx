import React from 'react';
import LocalSceneCard from 'components/local-scene-card';
import PieChart from 'components/charts/pie-chart';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import styles from './local-species-card-styles.module.scss';

const mammalscolor = '#92EB58';
const amphibianscolor = '#9873EF';
const birdscolor = '#34BD92';
const reptilescolor = '#3AA8EE';
const rawData = { 
  amphibiansEndemic: 2,
  amphibians: 5,
  birdsEndemic: 11,
  birds: 21,
  mammalsEndemic: 4,
  mammals: 9,
  reptilesEndemic: 17,
  reptiles: 31,
}
const colors = { 
  birds: birdscolor,
  mammals: mammalscolor,
  reptiles: reptilescolor,
  amphibians: amphibianscolor,
  birdsEndemic: birdscolor,
  mammalsEndemic: mammalscolor,
  reptilesEndemic: reptilescolor,
  amphibiansEndemic: amphibianscolor
}
const explodedSlices = { 
  birds: false,
  mammals: false,
  reptiles: false,
  amphibians: false,
  birdsEndemic: true,
  mammalsEndemic: true,
  reptilesEndemic: true,
  amphibiansEndemic: true
}
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
      <section className={styles.chartContainer}>
        <h3 className={styles.title}>Species composition</h3>
        <PieChart
          width={280}
          height={280}
          id="local-species-composition"
          data={rawData}
          explodedSlices={explodedSlices}
          colors={colors}
          explodingSliceStroke='none'
          regularSliceR={110}
          explodingSliceR={130}
        />
        <div className={styles.chartLegend}>
          <p>species</p>
          <p>endemic</p>
        </div>
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