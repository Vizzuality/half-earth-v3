import { t } from '@transifex/native';

export const NO_INTERACTION_STEPS = {
  'priority-places': ['human-pressures'],
  'national-report-cards': ['overview', 'challenges'],
};

export const ONBOARDING_TYPE_CENTER = {
  'priority-places': [-51.9, -14.2],
};

export const PRIORITY_STEPS = {
  intro: 0,
  priority: 1,
  richness: 2,
  rarity: 3,
  protection: 4,
  humanPressures: 5,
  closure: 6,
};

export const NRC_STEPS = {
  intro: 0,
  spi: 1,
  nrc: 2,
  overview: 3,
  challenges: 4,
  ranking: 5,
  fullRanking: 6,
  closure: 7,
};

export const getScripts = () => {
  return {
    'priority-places': {
      intro: [
        {
          startTime: 0,
          endTime: 11,
          text: t(
            'Species are disappearing at an alarming rate. Human activities are one of the most significant drivers of habitat degradation and other threats'
          ),
        },
        {
          startTime: 11,
          endTime: 20,
          text: t(
            'to biodiversity. The Half-Earth Project Map shows global patterns of biodiversity, human impact, and existing protected areas.'
          ),
        },
        {
          startTime: 20,
          endTime: 29,
          text: t(
            'These data layers are essential to identify areas where conservation efforts are needed the most to preserve global biodiversity.'
          ),
        },
        {
          startTime: 29,
          endTime: 42.2,
          text: t(
            'Let’s have a look at its potential by exploring the Amazon, an area of incredible biodiversity under great threat.'
          ),
        },
      ],
      priority: [
        {
          startTime: 0,
          endTime: 10,
          text: t(
            'The priority layer identifies the minimum amount of land needed to provide a sufficient amount of habitat for all species represented on the'
          ),
        },
        {
          startTime: 10,
          endTime: 18.05,
          text: t(
            'map. In this ranking of priority places, yellow areas correspond to those with higher priority for conservation,'
          ),
        },
        {
          startTime: 18.05,
          endTime: 23,
          text: t(
            'as they contribute to safeguarding habitats protecting the most species.'
          ),
        },
        {
          startTime: 23,
          endTime: 27,
          text: t('Blue tones refer to areas of lower priority values. '),
        },
        {
          startTime: 27.2,
          endTime: 35.5,
          text: t(
            'Areas with no color have not been identified as a part of the global network needed for comprehensive biodiversity protection,'
          ),
        },
        {
          startTime: 35.7,
          endTime: 42,
          text: t(
            ' but may still contain places of unique and irreplaceable value to biodiversity.'
          ),
        },
        {
          startTime: 42.1,
          endTime: 50.6,
          text: t(
            'In the Amazon, priority areas, like these in the Andes, correspond to the thick yellow stripe on the Western part of the continent,'
          ),
        },
        {
          startTime: 50.7,
          endTime: 55.3,
          text: t(
            'as well as a significant area throughout the Amazon River Basin.'
          ),
        },
        {
          startTime: 55.4,
          endTime: 63.1,
          text: t(
            'Note that our priority models are a starting point of identifying high-impact conservation protection.'
          ),
        },
        {
          startTime: 63.1,
          endTime: 68.7,
          text: t(
            'By changing parameters on the map, different conservation factors shift outcomes.'
          ),
        },
        {
          startTime: 68.8,
          endTime: 80.2,
          text: t(
            'In addition, other parameters involving various socio-economic factors must play a role in specific conservation efforts ultimately undertaken.'
          ),
        },
        {
          startTime: 80.3,
          endTime: 100,
          text: t(
            'To better understand what a priority area is, let’s explore two key concepts: Richness and Rarity. Click on the "richness" button to know more'
          ),
        },
      ],
      richness: [
        {
          startTime: 0,
          endTime: 6.9,
          text: t(
            'Richness is simply a measure of the total number of known species identified in a location.'
          ),
        },
        {
          startTime: 7,
          endTime: 13.6,
          text: t(
            'The richness layer on the map is a view of how species richness is distributed across the globe.'
          ),
        },
        {
          startTime: 13.6,
          endTime: 18.2,
          text: t(
            'Places in yellow host more species than places colored blue. '
          ),
        },
        {
          startTime: 18.3,
          endTime: 27.2,
          text: t(
            'You can see how the Amazon basin stands out as one of the richest areas in species biodiversity in the region and world.'
          ),
        },
        {
          startTime: 27.2,
          endTime: 32.8,
          text: t(
            'The information displayed in this layer is based on expert knowledge of animal species '
          ),
        },
        {
          startTime: 32.8,
          endTime: 40.9,
          text: t(
            'and on high resolution models that identify suitable habitat for species based on their known habitat associations.'
          ),
        },
        {
          startTime: 41,
          endTime: 51.8,
          text: t(
            'For now, this data is primarily provided for vertebrates and some plant species because accurate information for other taxonomic groups',
            {
              context:
                '...because accurate information for other taxonomic groups (is more difficult to gather).',
            }
          ),
        },
        {
          startTime: 51.9,
          endTime: 57.8,
          text: t(
            "is more difficult to gather. Nevertheless, we are working toward the most complete picture of the Earth's biodiversity.",
            {
              context:
                '(For now, this data is primarily provided for vertebrates and some plant species because accurate information for other taxonomic groups) is more difficult to gather. ...',
            }
          ),
        },
        {
          startTime: 57.8,
          endTime: 65.5,
          text: t(
            'More data on plant groups and some insect groups are being prepared for inclusion in future map releases.'
          ),
        },
        {
          startTime: 65.6,
          endTime: 100,
          text: t(
            'Now, let\'s explore the "rarity" layer to learn more about this variable.'
          ),
        },
      ],
      rarity: [
        {
          startTime: 0,
          endTime: 7,
          text: t(
            'Rarity is a measure of how geographically widespread species in a given region are on average.'
          ),
        },
        {
          startTime: 7.1,
          endTime: 15.2,
          text: t(
            'For example, some species are found only in very restricted areas, such as islands or mountain chains like the Andes.'
          ),
        },
        {
          startTime: 15.2,
          endTime: 25.8,
          text: t(
            'Since their geographical range is so limited, they are rare and also more vulnerable to threats, and protecting such species is a conservation priority.'
          ),
        },
        {
          startTime: 25.9,
          endTime: 32.8,
          text: t(
            'To get a view of how well places harboring high species richness and rarity are currently protected,'
          ),
        },
        {
          startTime: 32.7,
          endTime: 100,
          text: t(
            'click on the Existing Protection tab to activate that map layer.'
          ),
        },
      ],
      protection: [
        {
          startTime: 0,
          endTime: 4.4,
          text: t(
            'Although many ecologically valuable places are already protected, '
          ),
        },
        {
          startTime: 4.4,
          endTime: 11,
          text: t(
            'existing protection does not always coincide with the highest species rarity or richness.'
          ),
        },
        {
          startTime: 11,
          endTime: 20,
          text: t(
            'This gap emerges as a possible opportunity for future protection and funding allocation for conservation.'
          ),
        },
        {
          startTime: 20,
          endTime: 25.9,
          text: t(
            'In the Amazon region, observe that large parts of the ecosystems are under protection, '
          ),
        },
        {
          startTime: 25.9,
          endTime: 31.7,
          text: t(
            'including under the form of customary rights granted to indigenous or local communities, '
          ),
        },
        {
          startTime: 31.7,
          endTime: 36.7,
          text: t(
            'in addition to formal government protection such as national parks. '
          ),
        },
        {
          startTime: 36.7,
          endTime: 43,
          text: t(
            'Indigenous and local communities are strong stewards and defenders of biodiversity, '
          ),
        },
        {
          startTime: 43,
          endTime: 49.5,
          text: t(
            'and as such should be recognized as crucial participants in protecting biodiversity.'
          ),
        },
        {
          startTime: 49.5,
          endTime: 59,
          text: t(
            'Human encroachment is ongoing globally, and can even occur in protected areas. All over the planet, including the Amazon,'
          ),
        },
        {
          startTime: 59,
          endTime: 66.7,
          text: t(
            'human-related activities are causing habitat degradation and accelerating species extinction.'
          ),
        },
        {
          startTime: 66.7,
          endTime: 100,
          text: t(
            'Click on the Human Pressures tab to explore how human activities overlap with natural ecosystems.'
          ),
        },
      ],
      'human-pressures': [
        {
          startTime: 0,
          endTime: 2.8,
          text: t('The layers showing human pressures', {
            context:
              'The layers showing human pressures (illustrate how much human encroachment occurs from urbanization and other economic activities.)',
          }),
        },
        {
          startTime: 2.8,
          endTime: 10,
          text: t(
            'illustrate how much human encroachment occurs from urbanization and other economic activities.',
            {
              context:
                '(The layers showing human pressures) illustrate how much human encroachment occurs from urbanization and other economic activities.',
            }
          ),
        },
        {
          startTime: 10,
          endTime: 15.2,
          text: t(
            'In the Amazon, clear-cutting and burning forest for rangeland,'
          ),
        },
        {
          startTime: 15.2,
          endTime: 21.7,
          text: t(
            'along with mining, roads and settlements are the main factors responsible for habitat degradation.'
          ),
        },
        {
          startTime: 21.8,
          endTime: 28.9,
          text: t(
            'When planning new protected areas or managing existing ones, human pressures should be considered.'
          ),
        },
        {
          startTime: 28.9,
          endTime: 33.6,
          text: t(
            'Some species are less tolerant than others to human disturbances.'
          ),
        },
        {
          startTime: 33.6,
          endTime: 100,
          text: t(
            'However, lands that have already undergone high human modification are more costly to restore.'
          ),
        },
      ],
      closure: [
        {
          startTime: 0,
          endTime: 7.7,
          text: t(
            'There are many paths to slow down the species extinction crisis and safeguard the bulk of Earth’s biodiversity.'
          ),
        },
        {
          startTime: 7.7,
          endTime: 100,
          text: t(
            'We invite you to explore the Half-Earth Project map on your own or immerse yourself in another of our guided tours.'
          ),
        },
      ],
    },
    'national-report-cards': {
      intro: [
        {
          startTime: 0,
          endTime: 10.5,
          text: t(
            "The Half-Earth Project calls to protect half of the land and sea to safeguard the bulk of Earth's biodiversity and preserve the bulk of species."
          ),
        },
        {
          startTime: 10.5,
          endTime: 22.15,
          text: t(
            'To achieve this ambitious goal, every nation on earth has an essential role. We’re using a metric we’ve developed, the Species Protection Index or SPI,'
          ),
        },
        {
          startTime: 22.15,
          endTime: 27.5,
          text: t(
            'as the basis for a National Report Card on every country in the world.'
          ),
        },
        {
          startTime: 27.5,
          endTime: 36.8,
          text: t(
            'Report cards make it possible to see the varied conservation opportunities and challenges faced by each country in the world.'
          ),
        },
        {
          startTime: 36.8,
          endTime: 40.0,
          text: t("Let's see what a report card looks like."),
        },
      ],
      spi: [
        {
          startTime: 0,
          endTime: 8.5,
          text: t(
            'Starting at a global scale, you see a map layer of Species Protection Index values across the world,'
          ),
        },
        {
          startTime: 8.5,
          endTime: 13.1,
          text: t('a visual expression of global biodiversity protection.'),
        },
        {
          startTime: 13.1,
          endTime: 25,
          text: t(
            'The SPI provides an estimation of how well each country is meeting conservation targets by considering the amount of land or sea currently,'
          ),
        },
        {
          startTime: 25,
          endTime: 33.2,
          text: t(
            'protected, the number of rare species, as well as the total number of species found both inside and outside protected areas.'
          ),
        },
        {
          startTime: 33.2,
          endTime: 46,
          text: t(
            'Using the accumulation of this data, the National Report Cards provide an answer to the question of how well each country is doing to protect the'
          ),
        },
        {
          startTime: 46,
          endTime: 53.5,
          text: t(
            'biodiversity it has stewardship over. On the Half-Earth Project Map, each country in the world is colored by their SPI value.'
          ),
        },
        {
          startTime: 53.5,
          endTime: 61,
          text: t(
            'From no color at 100, through progressively lighter shades of purple and red to bright orange at 0.'
          ),
        },
        {
          startTime: 61,
          endTime: 70,
          text: t(
            'Generally, the SPI is higher in countries effectively managing species diversity and promoting conservation within its borders.'
          ),
        },
        {
          startTime: 70,
          endTime: 75.4,
          text: t(
            'A lower SPI score demonstrates a need for more conservation efforts.'
          ),
        },
        {
          startTime: 75.4,
          endTime: 86.7,
          text: t(
            'Conserving species in countries with a high number of rare species involves more effort and highly customized networks of protected places.'
          ),
        },
        {
          startTime: 86.7,
          endTime: 97.7,
          text: t(
            'For this reason, most biodiversity hotspots have relatively lower SPI scores when compared to countries with less biodiversity richness and'
          ),
        },
        {
          startTime: 97.7,
          endTime: 109,
          text: t(
            'rarity. In light of this, it’s important to also consider approaches for sharing the costs of saving biodiversity within nations that benefit the entire'
          ),
        },
        {
          startTime: 109,
          endTime: 115.8,
          text: t(
            'world. In the long run, conserving biodiversity pays a net economic benefit.'
          ),
        },
        {
          startTime: 115.8,
          endTime: 125.2,
          text: t(
            'To explore further, choose a country or territory you’re interested in by clicking on the map, or typing its name in the search bar.'
          ),
        },
        {
          startTime: 125.2,
          endTime: 130.2,
          text: t(
            'The report card will appear, along with some comparison tool options.'
          ),
        },
      ],
      nrc: [
        {
          startTime: 0,
          endTime: 7.4,
          text: t(
            'Each National Report Card provides a brief summary of the conservation efforts carried out in the selected country.'
          ),
        },
        {
          startTime: 7.4,
          endTime: 15.8,
          text: t(
            'The score at the top shows the national SPI score. You can view the number of rare species in the country,'
          ),
        },
        {
          startTime: 15.8,
          endTime: 27.2,
          text: t(
            'the percentage of land and waterways currently protected, and the proportion of additional protection required to meet national'
          ),
        },
        {
          startTime: 27.2,
          endTime: 33.8,
          text: t(
            'conservation goals as defined by the SPI. At this time, the national SPI values are only calculated for vertebrate species, because'
          ),
        },
        {
          startTime: 33.8,
          endTime: 42.4,
          text: t(
            'high-quality, high-resolution data is only available for approximately 40,000 such species.'
          ),
        },
        {
          startTime: 42.4,
          endTime: 54,
          text: t(
            "The Half-Earth Project aims to provide the most complete picture of the Earth's biodiversity as the advancement of species discovery"
          ),
        },
        {
          startTime: 54,
          endTime: 60,
          text: t(
            ' and documentation allows. Data on plant groups and some insect groups are being prepared for future release.'
          ),
        },
        {
          startTime: 60,
          endTime: 64.6,
          text: t('Click on “Explore” to enter the National Report Card.'),
        },
      ],
      overview: [
        {
          startTime: 0,
          endTime: 5.4,
          text: t(
            'National Report Cards provide a comprehensive overview of the selected country,',
            {
              context:
                'National Report Cards provide a comprehensive overview of the selected country,(delving into various aspects such as the Species Protection Index,...)',
            }
          ),
        },
        {
          startTime: 5.4,
          endTime: 13.9,
          text: t(
            'delving into various aspects such as the Species Protection Index, the number of endemic species, the level of protection,',
            {
              context:
                '(National Report Cards provide a comprehensive overview of the selected country,) delving into various aspects such as the Species Protection Index,the number of endemic species, the level of protection,(and the degree of human modification in the region.)',
            }
          ),
        },
        {
          startTime: 13.9,
          endTime: 17.3,
          text: t('and the degree of human modification in the region.', {
            context:
              '(National Report Cards provide a comprehensive overview of the selected country, delving into various aspects such as the Species Protection Index,...)and the degree of human modification in the region.',
          }),
        },
        {
          startTime: 17.3,
          endTime: 24.1,
          text: t(
            'By clicking on the "All vertebrates" button, you can access a list of vertebrate species found within the country,',
            {
              context:
                'By clicking on the "All vertebrates" button, you can access a list of vertebrate species found within the country,(along with relevant information. )',
            }
          ),
        },
        {
          startTime: 24.1,
          endTime: 32.2,
          text: t(
            'along with relevant information. Below, the time series chart illustrates the progression of the SPI',
            {
              context:
                '(By clicking on the "All vertebrates" button, you can access a list of vertebrate species found within the country,)along with relevant information. Below, the time series chart illustrates the progression of the SPI (and changes in the proportion of protected areas within the country over the past few decades)',
            }
          ),
        },
        {
          startTime: 32.2,
          endTime: 38.6,
          text: t(
            'and changes in the proportion of protected areas within the country over the past few decades.',
            {
              context:
                '(Below, the time series chart illustrates the progression of the SPI )and changes in the proportion of protected areas within the country over the past few decades)',
            }
          ),
        },
        {
          startTime: 38.6,
          endTime: 100,
          text: t(
            'Lastly, as you scroll down, you will come across the challenges chart.'
          ),
        },
      ],
      challenges: [
        {
          startTime: 0,
          endTime: 5.4,
          text: t(
            'To better understand the challenges countries face when planning conservation action, in this section'
          ),
        },
        {
          startTime: 5.4,
          endTime: 15.8,
          text: t(
            'you can explore relationships between the Species Protection Index and some simple socio-political and biodiversity indicators. '
          ),
        },
        {
          startTime: 15.8,
          endTime: 27.4,
          text: t(
            'On this plot, the vertical y-axis represents the SPI values, while the horizontal x-axis can represent different variables of your choice;'
          ),
        },
        {
          startTime: 27.4,
          endTime: 32.6,
          text: t(
            'such as the number of species present in the country or the human population.'
          ),
        },
        {
          startTime: 32.6,
          endTime: 42,
          text: t(
            'The drop down menu at the top makes it possible to filter countries by key similarities to illuminate critical differences between nations,'
          ),
        },
        {
          startTime: 42,
          endTime: 49,
          text: t(
            'and explore social challenges to consider for achieving equitable conservation goals and results. '
          ),
        },
        {
          startTime: 49,
          endTime: 58.5,
          text: t(
            'Each country is represented by a circle color-coded by continent, with a diameter proportional to the country’s area. '
          ),
        },
        {
          startTime: 58.5,
          endTime: 69.6,
          text: t(
            'A blinking halo marks your selected country. The default view shows countries with shared stewardship over many of the same species,'
          ),
        },
        {
          startTime: 69.6,
          endTime: 74.5,
          text: t(
            'often with shared borders. These countries could work together to maximize species protection.'
          ),
        },
        {
          startTime: 74.5,
          endTime: 85,
          text: t(
            'Use the top drop down menu to modify the grouping of countries. Use the right and left arrows at the bottom to change the horizontal x-axis to '
          ),
        },
        {
          startTime: 85,
          endTime: 89,
          text: t('explore relationships between various indicators.', {
            _comment:
              'Use the top drop down menu to modify the grouping of countries. Use the right and left arrows at the bottom to change the horizontal x-axis to (explore relationships between various indicators.)',
          }),
        },
        {
          startTime: 89,
          endTime: 96.3,
          text: t(
            'Clicking the "Analyze area" button in the lower right corner will direct you to our "Analyze areas" section',
            {
              _comment:
                '(Clicking the "Analyze area" button in the lower right corner will direct you to our "Analyze areas" section) for further exploration of your specific area of interest.',
            }
          ),
        },
        {
          startTime: 96.3,
          endTime: 110,
          text: t(
            'for further exploration of your specific area of interest. But before that, take a moment to check out the ranking feature situated on the left side panel.',
            {
              _comment:
                '(Clicking the "Analyze area" button in the lower right corner will direct you to our "Analyze areas" section) for further exploration of your specific area of interest. ...',
            }
          ),
        },
      ],
      ranking: [
        {
          startTime: 0,
          endTime: 8,
          text: t(
            'This ranking sorts countries and territories included in the National Report Cards according to different variables.'
          ),
        },
        {
          startTime: 8,
          endTime: 18.3,
          text: t(
            'By default, the ranking is ordered by SPI values, revealing that countries with the highest SPI scores tend to host very few endemic species.'
          ),
        },
        {
          startTime: 18.3,
          endTime: 27,
          text: t(
            'They earn a higher score because it is easier to build protected area networks when richness is the primary factor to consider.'
          ),
        },
        {
          startTime: 27,
          endTime: 34.5,
          text: t(
            'Click on the “full ranking” button to get an overview of the species composition, human modification, ',
            {
              context:
                'Click on the “full ranking” button to get an overview of the species composition, human modification, (and the protection status for each of those regions.)',
            }
          ),
        },
        {
          startTime: 34.5,
          endTime: 40,
          text: t('and the protection status for each of those regions.', {
            context:
              '(Click on the “full ranking” button to get an overview of the species composition, human modification,) and the protection status for each of those regions.',
          }),
        },
      ],
      fullRanking: [
        {
          startTime: 0,
          endTime: 7,
          text: t(
            'Countries and territories can also be sorted according to these variables using the sorting bottoms at the top. '
          ),
        },
        {
          startTime: 7,
          endTime: 17.2,
          text: t(
            'The resulting rankings, which are ordered from highest to lowest, help to identify, for example, countries with a high proportion of endemic species, ',
            {
              context:
                'The resulting rankings, which are ordered from highest to lowest, help to identify, for example, countries with a high proportion of endemic species, (countries under high human modification, or those with a high level of additional protection needed.)',
            }
          ),
        },
        {
          startTime: 17.2,
          endTime: 23.5,
          text: t(
            'countries under high human modification, or those with a high level of additional protection needed.',
            {
              context:
                '(The resulting rankings, which are ordered from highest to lowest, help to identify, for example, countries with a high proportion of endemic species,) countries under high human modification, or those with a high level of additional protection needed.',
            }
          ),
        },
        {
          startTime: 23.5,
          endTime: 29.3,
          text: t(
            'Have a look at how the country you’re interested in scores in each of the available rankings, ',
            {
              context:
                'Have a look at how the country you’re interested in scores in each of the available rankings, (or explore other National Report Cards by selecting a different territory.)',
            }
          ),
        },
        {
          startTime: 29.3,
          endTime: 34,
          text: t(
            'or explore other National Report Cards by selecting a different territory.',
            {
              context:
                '(Have a look at how the country you’re interested in scores in each of the available rankings,) or explore other National Report Cards by selecting a different territory.',
            }
          ),
        },
        {
          startTime: 34,
          endTime: 100,
          text: t(
            'To exit from the current National Report Card, click on the cross on the top right of the screen.'
          ),
        },
      ],
      closure: [
        {
          startTime: 0,
          endTime: 8.4,
          text: t(
            'We hope that you will explore other countries, and dive into some comparisons. Check out our other tours for more information.'
          ),
        },
      ],
    },
  };
};
