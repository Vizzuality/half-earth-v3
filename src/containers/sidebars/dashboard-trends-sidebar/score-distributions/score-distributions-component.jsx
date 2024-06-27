import React from 'react';

import Button from 'components/button';

import styles from '../dashboard-trends-sidebar-styles.module.scss';

import ScoreDistributionChartContainer from './score-distributions-chart';

function ScoreDistributionsComponent(props) {
  const lowAvg = 'Amphibians';
  const highAvg = 'birds';

  // const value = 0.56;

  const spsSpecies = [
    {
      name: 'Black-collared Apalis',
      scientificname: 'Oreolais puncher',
    },
    {
      name: 'Lomami Red Colobus',
      scientificname: 'Piliocolobus parmentieri',
    },
    {
      name: 'Grey-Winged Robin-Chat',
      scientificname: 'Cossypha polioptera',
    },
    {
      name: 'Palm Egg-Eater',
      scientificname: 'Dasypeltis palmarum',
    },
  ];

  return (
    <div className={styles.trends}>
      <div className={styles.info}>
        <span className={styles.title}>Score Distributions</span>

        <p className={styles.description}>
          View the distribution of the individual Species Protection Scores for
          all terrestrial vertebrates. <b>{lowAvg}</b> have the lowest average
          protection score while <b>{highAvg}</b> have the highest.
        </p>

        <span className={styles.spsSpeciesTitle}>
          Species with SPS between <b>0.5:</b>
        </span>
        <ul className={styles.spsSpecies}>
          {spsSpecies.map((species) => {
            return (
              <li>
                <img src="https://place-hold.it/50x50" alt="species" />
                <div className={styles.spsInfo}>
                  <span className={styles.name}>{species.name}</span>
                  <span className={styles.scientificname}>
                    {species.scientificname}
                  </span>
                  <button className={styles.addToMap} type="button">
                    Add to map
                  </button>
                </div>
                <span className={styles.spsScore}>SPS: 0.04</span>
              </li>
            );
          })}
        </ul>
        <div className={styles.options}>
          <Button
            type="rectangular"
            className={styles.saveButton}
            label="view full table"
          />
          <span className={styles.helpText}>
            Open and download a full table of species SPS and relevant traits at
            national and province levels for a selected year.
          </span>
        </div>
      </div>

      <ScoreDistributionChartContainer {...props} />
    </div>
  );
}

export default ScoreDistributionsComponent;
