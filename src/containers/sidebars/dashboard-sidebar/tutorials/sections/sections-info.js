import React, { useEffect } from 'react';

import { useT } from '@transifex/react';

function Blah() {
  const t = useT();

  useEffect(() => {
    t(
      'Hand-drawn maps from species experts as compiled in books or for a threat assessment. These maps estimate the extent of occurrence of a species over an extensive period (e.g. 10-30 years) and usually are not reliable for inferring presence for areas smaller than 100-200km in width.'
    );
    t(
      'From museum specimen or field observations. They identify places were observer activity coincided with species occurrence and lack of point data alone is usually not useful for inferring the absence of a species. Note that these are not true points, but often carry a large spatial uncertainty (i.e. species found in 10km radius around here). Point data is often temporally specific and accurate.'
    );
    t('Filter amphibians');
    t('Filter ants');
    t('Filter birds');
    t('Filter butterflies');
    t('Filter cacti');
    t('Filter conifers');
    t('Filter fishes');
    t('Filter insects');
    t('Filter mammals');
    t('Filter moths');
    t('Filter odonates');
    t('Filter palms');
    t('Filter reptiles');
    t('Not Evaluated');
    t('Inscribed');
    t('Proposed');
    t(
      'A real-time, online checklist program, eBird has revolutionized the way that the birding community reports and accesses information about birds. Launched in 2002 by the Cornell Lab of Ornithology and National Audubon Society, eBird provides rich data sources for basic information on bird abundance and distribution at a variety of spatial and temporal scales.'
    );
    t(
      'On the species page, you can search for any bird, mammal, reptile, or amphibian species (with more taxonomic groups being added soon) and visit their page. Here, you can view the Data Layers tab and the Indicator Scores tab.'
    );
    t(
      "Here, all available spatial datasets are listed for the selected species. They are divided between publicly available data sourced from Map of Life and private data sourced from your organization's ArcGIS Online database. Additionally, there are a set of regional layers, including administrative boundaries and protected areas. These layers can be enabled to display on the map and further explored."
    );
    t(
      'Here, you can view and explore the selected species Protection and Habitat Scores. A graph of change over time in the score value is displayed along with a table. The table displays information about the species protection or habitat scores in all countries that species lives in. In the drop down menu, you can select which country you want to compare the conservation status of the species with the RDC. In the screenshot below, we see that the species has a protection score of 95 in the RDC, whereas in Guinea it has a score of 75, and globally, the species has a score of 100. Changing the comparison country will also update the graph, so you can view how the protection score of the species has changed over time in a different country compared to the RDC.'
    );
    t(
      "On the Regions page, you can select specific areas within the RDC to automatically generate a list of species that are likely to be found in the area. Currently, you can choose to display on the map Protected Areas, Provinces, or Forest Titles, then you can select the specific area you're interested in on the map. In the near future, there will be an additional ability to directly draw a custom area on the map or upload the shapefile, and any other region types that are of interest to your organization can be uploaded to your ArcGIS Online database and added to the list here."
    );
    t(
      'After selecting an area, you will see a list of species along with a set of filters. Clicking on the “Expected Sources” filter will show you only those species whose range maps overlap with the selected area. Clicking on the “Recorded Sources” filter will show you only those species who have a recorded occurrence point or park inventory data within the selected area. This means that Recorded species have, at some point, been observed inside the selected area, while Expected species are predicted to live inside the area based on the range map. Some species can be both Recorded and Expected if their range map overlaps the area and they have an occurrence point in the area. You can also filter by IUCN RedList status.'
    );
    t(
      'The Species Protection Index (SPI) measures how well protected areas in the country cover species habitat. It assesses not simply how much area is protected, but if those areas conserve the habitats that species need most.'
    );
    t(
      'For all bird, mammal, amphibian, and reptile species, we set a target of how much of their range area should ideally be protected, and each species gets an individual protection score from 0 to 100 based on how close they are to meeting this target. A frog that lives only in the Itombwe Massif, for example, has a small range, so we set a high target for what percent of its habitat should be protected – 80 or 90 or even 100% if the total range area is very small. On the other hand, species like the Okapi have larger range areas, so they have a lower target of what percent of their range should be protected – 20 or 30%, perhaps.'
    );
    t(
      'All these species protection scores, across all species that live in the country, are averaged to get the overall Species Protection Index for the RDC – in 2024, that number was 62. So, this number tells us that on average, the species of the RDC are 62% of the way toward meeting their protection goals.'
    );
    t(
      "A new protected area that doesn't cover the habitats of many species might not increase the country's index very much, whereas a new protected area that includes many species habitats – especially species that have very small range areas or who don't yet have any protected areas covering their habitat – may increase the index substantially."
    );
    t(
      "The data you're seeing currently on the Indicators page on the SPI is calculated using established protected areas documented in the WDPA (protectedplanet.net)."
    );
    t(
      'The Temporal Trends section shows the change in the National SPI and total percent of area protected over time. '
    );
    t(
      "In addition to exploring the National SPI, you can also view the province-level breakdown. Each province's SPI is calculated the same way the National SPI is calculated: each species in that province gets a protection score, and all the scores are averaged. Switch between province and national views using the labelled icons in the left-hand sidebar."
    );
    t(
      'In both the national and province level views, we can explore the breakdown of the individual protection scores across species. This analysis is visualized as a histogram, where each bar represents a range of protection score values and shows how many species have protection scores in that range, along with the breakdown by taxonomic group'
    );
    t(
      'The Species Habitat Index (SHI) measures change in species habitats over time. It assesses changes in both the area of a species habitat and the connectivity between different patches of a species habitat. The final SHI is therefore the average of these area and connectivity components.'
    );
    t(
      'For most bird, mammal, reptile, and amphibian species, we calculate how much of their habitat has been lost or gained since the year 2001. This calculation is based on the species range map. We use habitat preferences of each species – things such as the types of land cover the species prefers, what percent of tree cover it prefers, and so on – and a set of environmental remote sensing and land cover layers applied to the range map to determine what areas of the range are actually suitable habitat for that species. The year 2001 provides the base calculation of suitable habitat area, and for every year after, we measure how much previously suitable area is lost or how much previously unsuitable area is gained. The resulting species habitat score can therefore be 100 (there has been no change in total suitable habitat since 2001), less than 100 (the species has less suitable habitat now than it did in 2001), or greater than 100 (the species has more suitable habitat now than it did in 2001). '
    );
    t(
      'The habitat scores across all the species that live in the country are averaged to get the overall Species Habitat Index for the RDC – in 2021, that number was 98.6. So, this number tells us that on average, the species of the RDC have lost 1.4% of their suitable habitat since 2001. '
    );
    t(
      'Generally, habitat restoration efforts may increase the National Species Habitat Index, while habitat destruction, such as deforestation, may decrease the index. At the species level, effects can get more complicated – for example, a bird that lives in open fields might increase its habitat score if nearby forest is converted to agricultural land, while at the same time, forest dependent species would lose habitat and therefore decrease their habitat scores. '
    );
    t(
      'The Temporal Trends section shows the change in the National SHI along with the Area and Connectivity components over time. '
    );
    t(
      "In addition to exploring the National SHI, you can also view the province-level breakdown. Each province's SHI is calculated the same way the National SHI is calculated: each species in that province gets a habitat score, and all the scores are averaged to get the habitat index. Switch between province and national views using the labelled icons in the left-hand sidebar."
    );
    t(
      'In both the national and province level views, we can explore the breakdown of the habitat, area, and connectivity scores across species. This analysis is visualized as a histogram, where each bar represents a range of score values and shows how many species have scores in that range, along with the breakdown by taxonomic group.'
    );
    t(
      "The Species Information Index (SII) measures the completeness of species data coverage in terms of publicly available occurrence records. Like the Species Protection Index, the Information Index doesn't just measure how many data points there are, but whether those data points are being gathered across species' ranges."
    );
    t(
      'For all birds, mammals, amphibians, and reptiles, we divide their range maps into a grid of equal-sized squares. We then overlap occurrence records of that species on the grid and determine how many of the total grid squares have a documented occurrence record. This simple proportion gives us the information score for that species – so, for example, if a species range is divided into ten equal grid squares and 4 of those squares contain at least one occurrence record, then that species will have an information score of 4/10 or 40%. This analysis is done annually, so each year, a species will have a new information score based on the occurrence records that were gathered in that year. '
    );
    t(
      'The information scores across all the species that live in the country are averaged to get the overall Species Information Index for the RDC – in 2023, that number was 0.4%. So, this number tells us that on average, the species of the RDC had a documented occurrence point in 0.4% of their range area in 2023.'
    );
    t(
      "The data you're currently seeing on the Indicators page about the SII is calculated using occurrence records downloaded from GBIF."
    );
    t(
      'The Temporal Trends section shows the change in the National SII over time.'
    );
    t('Global Biodiversity Information Facility');
    t('Title');
    t('Source type');
    t('Data type');
    t('Online Database');
    t('citation reference');
    t('Description');
    t('Categories');
    t('Date when study began');
    t('Date when study ended');
    t('Scientific Paper');
    t('Seasons');
    t(
      'The Global Biodiversity Information Facility (GBIF) is an international open data infrastructure, funded by governments. It allows anyone, anywhere to access data about all types of life on Earth, shared across national boundaries via the Internet. By encouraging and helping institutions to publish data according to common standards, GBIF enables research not possible before, and informs better decisions to conserve and sustainably use the biological resources of the planet. GBIF operates through a network of nodes, coordinating the biodiversity information facilities of Participant countries and organizations, collaborating with each other and the Secretariat to share skills, experiences and technical capacity.'
    );
    t('Provider');
    t('Class');
    t('Citation of the taxonomy');
    t('Contact details');
    t('Group of species');
    t(
      'Birds, Mammals, Amphibians, Reptiles, Turtles, Moths, Butterflies, Dragonflies, Plants, Conifers, Trees, Palms'
    );
    t('Countries');
    t('Geographic scope');
    t('World');
    t('Processing of geometries');
    t(
      'Points with invalid or missing latitude and longitude values were filtered out. In addition, reports from datasets already in MOL were filtered out, including eBird.'
    );
    t('Notes');
  }, []);

  return <div>Blah</div>;
}

export default Blah;
export const SECTION_INFO = {
  SPECIES:
    'On the species page, you can search for any bird, mammal, reptile, or amphibian species (with more taxonomic groups being added soon) and visit their page. Here, you can view the Data Layers tab and the Indicator Scores tab.',
  DATA_LAYER:
    "Here, all available spatial datasets are listed for the selected species. They are divided between publicly available data sourced from Map of Life and private data sourced from your organization's ArcGIS Online database. Additionally, there are a set of regional layers, including administrative boundaries and protected areas. These layers can be enabled to display on the map and further explored.",
  INDICATOR_SCORES:
    'Here, you can view and explore the selected species Protection and Habitat Scores. A graph of change over time in the score value is displayed along with a table. The table displays information about the species protection or habitat scores in all countries that species lives in. In the drop down menu, you can select which country you want to compare the conservation status of the species with the RDC. In the screenshot below, we see that the species has a protection score of 95 in the RDC, whereas in Guinea it has a score of 75, and globally, the species has a score of 100. Changing the comparison country will also update the graph, so you can view how the protection score of the species has changed over time in a different country compared to the RDC.',
  REGIONS:
    "On the Regions page, you can select specific areas within the RDC to automatically generate a list of species that are likely to be found in the area. Currently, you can choose to display on the map Protected Areas, Provinces, or Forest Titles, then you can select the specific area you're interested in on the map. In the near future, there will be an additional ability to directly draw a custom area on the map or upload the shapefile, and any other region types that are of interest to your organization can be uploaded to your ArcGIS Online database and added to the list here.",
  REGIONS_TWO:
    'After selecting an area, you will see a list of species along with a set of filters. Clicking on the “Expected Sources” filter will show you only those species whose range maps overlap with the selected area. Clicking on the “Recorded Sources” filter will show you only those species who have a recorded occurrence point or park inventory data within the selected area. This means that Recorded species have, at some point, been observed inside the selected area, while Expected species are predicted to live inside the area based on the range map. Some species can be both Recorded and Expected if their range map overlaps the area and they have an occurrence point in the area. You can also filter by IUCN RedList status.',
  SPI: 'The Species Protection Index (SPI) measures how well protected areas in the country cover species habitat. It assesses not simply how much area is protected, but if those areas conserve the habitats that species need most.',
  SPI_TWO:
    'For all bird, mammal, amphibian, and reptile species, we set a target of how much of their range area should ideally be protected, and each species gets an individual protection score from 0 to 100 based on how close they are to meeting this target. A frog that lives only in the Itombwe Massif, for example, has a small range, so we set a high target for what percent of its habitat should be protected – 80 or 90 or even 100% if the total range area is very small. On the other hand, species like the Okapi have larger range areas, so they have a lower target of what percent of their range should be protected – 20 or 30%, perhaps.',
  SPI_THREE:
    'All these species protection scores, across all species that live in the country, are averaged to get the overall Species Protection Index for the RDC – in 2024, that number was 62. So, this number tells us that on average, the species of the RDC are 62% of the way toward meeting their protection goals.',
  SPI_FOUR:
    "A new protected area that doesn't cover the habitats of many species might not increase the country's index very much, whereas a new protected area that includes many species habitats – especially species that have very small range areas or who don't yet have any protected areas covering their habitat – may increase the index substantially.",
  SPI_FIVE:
    "The data you're seeing currently on the Indicators page on the SPI is calculated using established protected areas documented in the WDPA (protectedplanet.net).",
  SPI_TEMPORAL_TREND:
    'The Temporal Trends section shows the change in the National SPI and total percent of area protected over time. ',
  SPI_PROVINCE_VIEW:
    "In addition to exploring the National SPI, you can also view the province-level breakdown. Each province's SPI is calculated the same way the National SPI is calculated: each species in that province gets a protection score, and all the scores are averaged. Switch between province and national views using the labelled icons in the left-hand sidebar.",
  SPI_SCORE_DISTRIBUTIONS:
    'In both the national and province level views, we can explore the breakdown of the individual protection scores across species. This analysis is visualized as a histogram, where each bar represents a range of protection score values and shows how many species have protection scores in that range, along with the breakdown by taxonomic group',
  SHI: 'The Species Habitat Index (SHI) measures change in species habitats over time. It assesses changes in both the area of a species habitat and the connectivity between different patches of a species habitat. The final SHI is therefore the average of these area and connectivity components.',
  SHI_TWO:
    'For most bird, mammal, reptile, and amphibian species, we calculate how much of their habitat has been lost or gained since the year 2001. This calculation is based on the species range map. We use habitat preferences of each species – things such as the types of land cover the species prefers, what percent of tree cover it prefers, and so on – and a set of environmental remote sensing and land cover layers applied to the range map to determine what areas of the range are actually suitable habitat for that species. The year 2001 provides the base calculation of suitable habitat area, and for every year after, we measure how much previously suitable area is lost or how much previously unsuitable area is gained. The resulting species habitat score can therefore be 100 (there has been no change in total suitable habitat since 2001), less than 100 (the species has less suitable habitat now than it did in 2001), or greater than 100 (the species has more suitable habitat now than it did in 2001). ',
  SHI_THREE:
    'The habitat scores across all the species that live in the country are averaged to get the overall Species Habitat Index for the RDC – in 2021, that number was 98.6. So, this number tells us that on average, the species of the RDC have lost 1.4% of their suitable habitat since 2001. ',
  SHI_FOUR:
    'Generally, habitat restoration efforts may increase the National Species Habitat Index, while habitat destruction, such as deforestation, may decrease the index. At the species level, effects can get more complicated – for example, a bird that lives in open fields might increase its habitat score if nearby forest is converted to agricultural land, while at the same time, forest dependent species would lose habitat and therefore decrease their habitat scores. ',
  SHI_TEMPORAL_TREND:
    'The Temporal Trends section shows the change in the National SHI along with the Area and Connectivity components over time. ',
  SHI_PROVINCE_VIEW:
    "In addition to exploring the National SHI, you can also view the province-level breakdown. Each province's SHI is calculated the same way the National SHI is calculated: each species in that province gets a habitat score, and all the scores are averaged to get the habitat index. Switch between province and national views using the labelled icons in the left-hand sidebar.",
  SHI_SCORE_DISTRIBUTIONS:
    'In both the national and province level views, we can explore the breakdown of the habitat, area, and connectivity scores across species. This analysis is visualized as a histogram, where each bar represents a range of score values and shows how many species have scores in that range, along with the breakdown by taxonomic group.',
  SII: "The Species Information Index (SII) measures the completeness of species data coverage in terms of publicly available occurrence records. Like the Species Protection Index, the Information Index doesn't just measure how many data points there are, but whether those data points are being gathered across species' ranges.",
  SII_TWO:
    'For all birds, mammals, amphibians, and reptiles, we divide their range maps into a grid of equal-sized squares. We then overlap occurrence records of that species on the grid and determine how many of the total grid squares have a documented occurrence record. This simple proportion gives us the information score for that species – so, for example, if a species range is divided into ten equal grid squares and 4 of those squares contain at least one occurrence record, then that species will have an information score of 4/10 or 40%. This analysis is done annually, so each year, a species will have a new information score based on the occurrence records that were gathered in that year. ',
  SII_THREE:
    'The information scores across all the species that live in the country are averaged to get the overall Species Information Index for the RDC – in 2023, that number was 0.4%. So, this number tells us that on average, the species of the RDC had a documented occurrence point in 0.4% of their range area in 2023.',
  SII_FOUR:
    "The data you're currently seeing on the Indicators page about the SII is calculated using occurrence records downloaded from GBIF.",
  SII_TEMPORAL_TREND:
    'The Temporal Trends section shows the change in the National SII over time.',
};
