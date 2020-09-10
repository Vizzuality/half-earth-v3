import React from 'react';
import Scene from 'components/scene';
import CountryMaskLayer from 'components/country-mask-layer';
import { LIGHT_MASK_STYLES } from 'constants/graphic-styles';
import LocalSceneViewManager from 'components/local-scene-view-manager';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
import styles from './national-report-pdf.module.scss';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';import {
  FIREFLY_BASEMAP_LAYER,
  GRAPHIC_LAYER,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  COUNTRY_PRIORITY_LAYER,
} from 'constants/layers-slugs';

const NationalReportPdf = ({
  SPI,
  birds,
  mammals,
  reptiles,
  amphibians,
  countryISO,
  countryName,
  birdsEndemic,
  countryBorder,
  indexStatement,
  mammalsEndemic,
  reptilesEndemic,
  vertebratesCount,
  protectionNeeded,
  amphibiansEndemic,
  currentProtection,
  endemicVertebratesCount,
  onMapLoad
}) => {

  return (
    <div className={styles.container}>
      <section className={styles.nameWrapper}>
        <img className={styles.flag} src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`} alt="" />
        <span className={styles.countryName}>{countryName}</span>
      </section>
      <section className={styles.indexWrapper}>
        <p className={styles.overviewText}>{`The national species protection index is: ${SPI}`}</p>
        <p className={styles.indexStatement}>{indexStatement}</p>
      </section>
      <p className={styles.indexIntro}>This index is based on:</p>
      <section className={styles.indexExplanation}>
        <div className={styles.indexBaseNumbersWrapper}>
          <div className={styles.indexBaseDataElement}>
            <p className={styles.baseNumber}>{`${currentProtection || 25}`}</p>
            <p className={styles.numberText}>% of land</p>
            <p className={styles.numberText}>currently</p>
            <p className={styles.numberText}>protected</p>
          </div>
          <div className={styles.indexBaseDataElement}>
            <p className={styles.baseNumber}>{`${vertebratesCount || 234}`}</p>
            <p className={styles.numberText}>total land</p>
            <p className={styles.numberText}>vertebrate</p>
            <p className={styles.numberText}>species</p>
          </div>
          <div className={styles.indexBaseDataElement}>
            <p className={styles.baseNumber}>{`${endemicVertebratesCount || 7}`}</p>
            <p className={styles.numberText}>endemic land</p>
            <p className={styles.numberText}>vertebrated</p>
            <p className={styles.numberText}>species</p>
          </div>
        </div>
      </section>
      <span className={styles.speciesSentence}>{`These are the four species in ${countryName} with the smallest global range (one per taxonomic group).`}</span>
      <section className={styles.speciesComposition}>
        <p className={styles.title}>species composition</p>
        <p className={styles.speciesCount}><span className={styles.amphibiansIcon}><AmphibiansIcon /></span> {`${amphibians} amphibians (${amphibiansEndemic} endemic)`}</p>
        <p className={styles.speciesCount}><span className={styles.birdsIcon}><BirdsIcon /></span> {`${birds} birds (${birdsEndemic} endemic)`}</p>
        <p className={styles.speciesCount}><span className={styles.mammalsIcon}><MammalsIcon /></span> {`${mammals} mammals (${mammalsEndemic} endemic)`}</p>
        <p className={styles.speciesCount}><span className={styles.reptilesIcon}><ReptilesIcon /></span> {`${reptiles} reptiles (${reptilesEndemic} endemic)`}</p>
      </section>
      <section className={styles.protectionLegend}>
        <h3 className={styles.legendTitle}>{`The current protection ${currentProtection}%`}</h3>
        <div className={styles.datasetWrapper}>
          <div className={styles.wdpaIcon}/>
          <div className={styles.datasetMetadata}>
            <span className={styles.datasetExplanation}>
            The green areas on the map represent 
            regions that are currently recognized 
            as being managed for the long-term conservation of nature.
            </span>
            <p className={styles.datasetSource} >Source:
              <a href="https://www.biorxiv.org/content/10.1101/2020.02.05.936047v1.abstract" >
                WDPA, OECM
              </a>
              <a href="https://www.biorxiv.org/content/10.1101/2020.02.05.936047v1.abstract" >
              & RAISG.
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className={styles.priorityLegend}>
        <h3 className={styles.legendTitle}>{`Additional protection needed ${protectionNeeded}%`}</h3>
        <p className={styles.legendTag}>higher priority</p>
        <div className={styles.datasetWrapper}>
          <div className={styles.priorityIcon}/>
          <div className={styles.datasetMetadata}>
            <span className={styles.datasetExplanation}>{
              `The brightly colored map layer indicates the minimum amount of 
              additional conservation area needed for ${countryName} to achieve 
              a National SPI of 100, and presents one possible pathway toward the 
              Half-Earth goal of comprehensive terrestrial biodiversity conservation. 
              Higher values indicate locations within the country that contribute 
              more to the conservation of species habitat.`
            }
            </span>
            <p className={styles.datasetSource} >
              Source: Rinnan DS and Jetz W, (2020).
            </p>
          </div>
        </div>
        <p className={styles.legendTag}>lower priority</p>
      </section>
      <section className={styles.species}>
        <span>coming soon</span>
      </section>
      <section className={styles.mapWrapper}/>
    </div>
  )
}

export default NationalReportPdf;