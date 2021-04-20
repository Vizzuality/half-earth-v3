import React from 'react';
import styles from './national-report-pdf.module.scss';
import HighLightedSpeciesList from 'components/highlighted-species-list';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';

const NationalReportPdf = ({
  SPI,
  birds,
  mammals,
  reptiles,
  shortLink,
  amphibians,
  countryISO,
  countryName,
  birdsEndemic,
  indexStatement,
  mammalsEndemic,
  reptilesEndemic,
  vertebratesCount,
  protectionNeeded,
  amphibiansEndemic,
  currentProtection,
  priorityAreasSentence,
  sceneScreenshotUrl,
  endemicVertebratesCount,
  highlightedSpeciesSentence,
  highlightedSpeciesRandomNumber,
}) => {

  return (
    <div className={styles.container}>
      <section className={styles.nameWrapper}>
        <img className={styles.flag} src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`} alt="" />
        <span className={styles.countryName}>{countryName}</span>
      </section>
      <section className={styles.date}>
        <span>
          {Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric'}).format(new Date())}
        </span>
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
      <section className={styles.speciesSentence}>
        <span>{highlightedSpeciesSentence}</span>
        <p className={styles.datasetSource}><a href="https://mol.org/">Source: Map of Life</a></p>
      </section>
      <section className={styles.speciesComposition}>
        <p className={styles.title}>species composition:</p>
        <p className={styles.speciesCount}><span className={styles.amphibiansIcon}><AmphibiansIcon /></span> {`${amphibians} amphibians (${amphibiansEndemic} endemic)`}</p>
        <p className={styles.speciesCount}><span className={styles.birdsIcon}><BirdsIcon /></span> {`${birds} birds (${birdsEndemic} endemic)`}</p>
        <p className={styles.speciesCount}><span className={styles.mammalsIcon}><MammalsIcon /></span> {`${mammals} mammals (${mammalsEndemic} endemic)`}</p>
        <p className={styles.speciesCount}><span className={styles.reptilesIcon}><ReptilesIcon /></span> {`${reptiles} reptiles (${reptilesEndemic} endemic)`}</p>
      </section>
      <section className={styles.protectionLegend}>
        <h3 className={styles.legendTitle}>{`The current protection: ${currentProtection}%`}</h3>
        <div className={styles.datasetWrapper}>
          <div className={styles.wdpaIcon}/>
          <div className={styles.datasetMetadata}>
            <span className={styles.datasetExplanation}>
            The green areas on the map represent 
            regions that are currently recognized 
            as being managed for the long-term conservation of nature.
            </span>
            <p className={styles.datasetSource} >Source: WDPA (Jan 2020), OECM (Jan 2020) & RAISG (2019).</p>
          </div>
        </div>
      </section>
      <section className={styles.priorityLegend}>
        <h3 className={styles.legendTitle}>{`Additional protection needed: ${protectionNeeded}%`}</h3>
        <p className={styles.legendTag}>higher priority</p>
        <div className={styles.datasetWrapper}>
          <div className={styles.priorityIcon}/>
          <div className={styles.datasetMetadata}>
            <span className={styles.datasetExplanation}>
              {priorityAreasSentence}
            </span>
            <p className={styles.datasetSource} >
              <a href="https://www.biorxiv.org/content/10.1101/2020.02.05.936047v1.abstract" >
                Source: Rinnan DS and Jetz W, (2020).
              </a>
            </p>
          </div>
        </div>
        <p className={styles.legendTag}>lower priority</p>
      </section>
      <section className={styles.species}>
        <HighLightedSpeciesList
          countryISO={countryISO}
          highlightedSpeciesRandomNumber={highlightedSpeciesRandomNumber}
        />
      </section>
      <section className={styles.mapWrapper}>
        {sceneScreenshotUrl && <img src={sceneScreenshotUrl} alt={`${countryName} map`}/>}
      </section>
      <section className={styles.urlWrapper} >
        <a href={shortLink}>{shortLink}</a>
      </section>
    </div>
  )
}

export default NationalReportPdf;