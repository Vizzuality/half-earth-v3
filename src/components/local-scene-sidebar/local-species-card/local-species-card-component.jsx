import React from 'react';
import LocalSceneCard from 'components/local-scene-card';

const LocalSpeciesCardComponent = () => {
  return (
    <LocalSceneCard>
      <section>
        <h3>Species composition</h3>
      </section>
      <section>
        <p>These are the four species in Peru with the smallest global range (one per taxonomic group).</p>
      </section>
    </LocalSceneCard>
  )
}

export default LocalSpeciesCardComponent;