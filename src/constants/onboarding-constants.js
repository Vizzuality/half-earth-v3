export const NO_INTERACTION_STEPS = {
  'priority-places': ['human-pressures'],
  'national-report-cards': ['intro']
};

export const SCRIPTS = {
  'priority-places': {
    intro: [
      { startTime: 0, endTime: 12.8, text: 'Species are disappearing at an alarming rate. Human activities are one of the most significant drivers of habitat degradation and other threats' },
      { startTime: 12.8, endTime: 24.5, text: 'to biodiversity. The Half-Earth Project Map shows global patterns of biodiversity, human impact, and existing protected areas.' },
      { startTime: 24.5, endTime: 33, text: 'These data layers are essential to identify areas where conservation efforts are needed the most to preserve global biodiversity. Let’s have a look at its' },
      { startTime: 33, endTime: 42.2, text: 'potential by exploring the Amazon, an area of incredible biodiversity under great threat.' }
    ],
    priority: [
      { startTime: 0, endTime: 13.2, text: 'The priority layer identifies the minimum amount of land needed to provide a sufficient amount of habitat for all species represented on the' },
      { startTime: 13.2, endTime: 25.2, text: 'map. In this ranking of priority places, yellow areas correspond to those with higher priority for conservation, as they contribute to safeguarding' },
      { startTime: 25.2, endTime: 37.3, text: 'habitats protecting the most species. Blue tones refer to areas of lower priority values. Areas with no color have not been identified as a part of' },
      { startTime: 37.3, endTime: 42.2, text: 'the global network needed for comprehensive biodiversity protection, but may still contain places of unique and irreplaceable value to biodiversity. In the Amazon, priority areas, like these in the Andes, correspond to the thick yellow stripe on the Western part of the continent, as well as a significant area throughout the Amazon River Basin. Note that our priority models are a starting point of identifying high-impact conservation protection. By changing parameters on the map, different conservation factors shift outcomes. In addition, other parameters involving various socio-economic factors must play a role in specific conservation efforts ultimately undertaken. To better understand what a priority area is, let’s explore two key concepts: Richness and Rarity. Click on the "richness" button to know more' },
    ],
    richness: [
      { startTime: 0, endTime: 12.8, text: 'Richness is simply a measure of the total number of known species identified in a location. The richness layer on the map is a view of how species richness is distributed across the globe. Places in yellow host more species than places colored blue. You can see how the Amazon basin stands out as one of the richest areas in species biodiversity in the region and world.' },
      { startTime: 12.8, endTime: 20, text: ` The information displayed in this layer is based on expert knowledge of animal species and on high resolution models that identify suitable habitat for species based on their known habitat associations.` },
      { startTime: 20, endTime: 25, text: `For now, this data is only provided for vertebrate species because accurate information for other taxonomic groups is more difficult to gather. Nevertheless, we are working toward the most complete picture of the Earth's biodiversity. Data on plant groups and some insect groups are being prepared for inclusion in future map releases. Now, let's explore the "rarity" layer to learn more about this variable.` },
    ],
    rarity: [
      { startTime: 0, endTime: 12.8, text: 'Rarity is a measure of how geographically widespread species in a given region are on average. For example, some species are found only in very restricted areas, such as islands or mountain chains like the Andes. Since their geographical range is so limited, they are rare and also more vulnerable to threats, and protecting such species is a conservation priority.' },
      { startTime: 10.8, endTime: 15, text: 'To get a view of how well places harboring high species richness and rarity are currently protected, click on the Existing Protection tab to activate that map layer.' },
    ],
    protection: [
      { startTime: 0, endTime: 12.8, text: 'Although many ecologically valuable places are already protected, existing protection does not always coincide with the highest species rarity or' },
      { startTime: 12.8, endTime: 20, text: 'richness. This gap emerges as a possible opportunity for future protection and funding allocation for conservation.In the Amazon region,' },
      { startTime: 25.2, endTime: 37.3, text: 'observe that large parts of the ecosystems are under protection, including under the form of customary rights granted to indigenous or' },
      { startTime: 37.3, endTime: 42.2, text: 'local communities, in addition to formal government protection such as national parks. Indigenous and local communities are strong stewards' },
      { startTime: 42.2, endTime: 50.8, text: 'and defenders of biodiversity, and as such should be recognized as crucial participants in protecting biodiversity. Human encroachment is ongoing' },
      { startTime: 50.8, endTime: 60, text: 'globally, and can even occur in protected areas. All over the planet, including the Amazon, human-related activities are causing habitat degradation' },
      { startTime: 50.8, endTime: 52, text: 'and accelerating species extinction. Click on the Human Pressures tab to explore how human activities overlap with natural ecosystems.' },
    ],
    'human-pressures': [
      { startTime: 0, endTime: 12.8, text: 'The layer showing human pressures illustrates how much human encroachment occurs from urbanization and other economic activities. In the Amazon,' },
      { startTime: 12.8, endTime: 20, text: 'clear-cutting and burning forest for rangeland, along with mining, roads and settlements are the main factors responsible for habitat degradation.' },
      { startTime: 25.2, endTime: 37.3, text: 'When planning new protected areas or managing existing ones, human pressures should be considered. Some species are less tolerant than others to' },
      { startTime: 37.3, endTime: 42.2, text: 'human disturbances. However, lands that have already undergone high human modification are more costly to restore.' },
    ],
    closure: [
      { startTime: 0, endTime: 12.8, text: 'There are many paths to slow down the species extinction crisis and safeguard the bulk of Earth’s biodiversity. We invite you to explore' },
      { startTime: 12.8, endTime: 20, text: 'the Half-Earth Project map on your own or immerse yourself in another of our guided tours.' },
    ],
  },
  'national-report-cards': {
    intro: [
      { startTime: 0, endTime: 12.8, text: `The Half-Earth Project calls to protect half of the land and sea to safeguard the bulk of Earth's biodiversity and preserve the bulk of species. To achieve this ambitious goal, every nation on earth has an essential role. We’re using a metric we’ve developed, the Species Protection Index or SPI, as the basis for a National Report Card on every country in the world.` },
      { startTime: 12.8, endTime: 15, text: `Report cards make it possible to see the varied conservation opportunities and challenges faced by each country in the world. Let's see what a report card looks like.` }
    ],
    spi: [
      { startTime: 0, endTime: 12.8, text: `Starting at a global scale, you see a map layer of Species Protection Index values across the world, a visual expression of global biodiversity protection. The SPI provides an estimation of how well each country is meeting conservation targets by considering the amount of land or sea currently protected, the number of rare species, as well as the total number of species found both inside and outside protected areas. Using the accumulation of this data, the National Report Cards provide an answer to the question of how well each country is doing to protect the biodiversity it has stewardship over. On the Half-Earth Project Map, each country in the world is colored by their SPI value. From no color at 100, through progressively lighter shades of purple and red to bright orange at 0. Generally, the SPI is higher in countries effectively managing species diversity and promoting conservation within its borders. A lower SPI score demonstrates a need for more conservation efforts.` },
      { startTime: 12.8, endTime: 14, text: `Conserving species in countries with a high number of rare species involves more effort and highly customized networks of protected places. For this reason, most biodiversity hotspots have relatively lower SPI scores when compared to countries with less biodiversity richness and rarity. In light of this, it’s important to also consider approaches for sharing the costs of saving biodiversity within nations that benefit the entire world. In the long run, conserving biodiversity pays a net economic benefit. ` },
      { startTime: 14, endTime: 24, text: `To explore further, choose a country or territory you’re interested in by clicking on the map, or typing its name in the search bar. The report card will appear, along with some comparison tool options.` }
    ],
    nrc: [
      { startTime: 0, endTime: 12.8, text: `Each National Report Card provides a brief summary of the conservation efforts carried out in the selected country. The score at the top shows the national SPI score.` },
      { startTime: 12.8, endTime: 14, text: `You can view the number of rare species in the country, the percentage of land and waterways currently protected, and the proportion of additional protection required to meet national conservation goals as defined by the SPI. ` },
      { startTime: 14, endTime: 24, text: `At this time, the national SPI values are only calculated for vertebrate species, because high-quality, high-resolution data is only available for approximately 40,000 such species.` },
      { startTime: 24, endTime: 32, text: `The Half-Earth Project aims to provide the most complete picture of the Earth's biodiversity as the advancement of species discovery and documentation allows. Data on plant groups and some insect groups are being prepared for future release. Click on “Explore” to enter the National Report Card.` }
    ],
    overview: [
      { startTime: 0, endTime: 12.8, text: `The first section of the National Report Cards describes the current conservation status of the nation. On the map, you can see 2 layers, one showing locations of currently protected areas, and the other highlighting one possible configuration of where new conservation areas could be added in the country in pursuit of the Half-Earth goal. ` },
      { startTime: 12.8, endTime: 14, text: `Lighter colors correspond to areas that would contribute more to the conservation of species habitat, while darker shades represent locations with lower priority for conservation. Areas that are not colored harbor important species, but do not achieve species richness and rarity levels that denote a high conservation priority score.` },
      { startTime: 14, endTime: 24, text: `In some cases the map may be colored gray, light yellow or green because the area has adequate protection. If you scroll down on the left-side panel you can find more information about these layers.` },
      { startTime: 24, endTime: 32, text: `You can also find photos of representative species of concern and more information about the key species present in the country, as well as get an overview of the species distribution by taxonomic group. Now, click on the "Challenges" tab.` }
    ],
    challenges: [
      { startTime: 24, endTime: 37, text: `You can also find photos of representative species of concern and more information about the key species present in the country, as well as get an overview of the species distribution by taxonomic group. Now, click on the "Challenges" tab.` }
    ],
    ranking: [
      { startTime: 24, endTime: 37, text: `You can also find photos of representative species of concern and more information about the key species present in the country, as well as get an overview of the species distribution by taxonomic group. Now, click on the "Challenges" tab.` }
    ],
    closure: [
      { startTime: 24, endTime: 37, text: `You can also find photos of representative species of concern and more information about the key species present in the country, as well as get an overview of the species distribution by taxonomic group. Now, click on the "Challenges" tab.` }
    ],
  }
}
