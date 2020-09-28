import React from 'react';

const HighlightedSpeciesListComponent = ({
  highlightedSpecies
}) => (
  <div>
    {highlightedSpecies && highlightedSpecies.map(species => (
      <div>
        <section>image</section>
        <section>
          <span>Name</span>
          <span>{species.attributes.species}</span>
          <span>Global range protected</span>
          <span>{species.attributes.percentprotectedglobal}</span>
        </section>
      </div>
    ))}
  </div>
)

export default HighlightedSpeciesListComponent;