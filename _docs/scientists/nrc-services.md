---
layout: default
title: National Report Cards
parent: Scientists 🧑‍🔬
permalink: /_docs/science/nrc-services
---

# The services behind the National Report Cards
## Generalised polygon
`gadm_generalised` contains the generalised shapes of the countries. This service only has the name of the country and it GID code (similar to ISO code). Currently it is missing Fiji and Kiribati. The shapes for these two countries are missing because when using the local scenes these countries, as they are divided by the 24h meridian, had an unwanted behaviour. Their shapes are in [this other service](https://eowilson.maps.arcgis.com/home/item.html?id=5b8b69ce64e54b84b8731568679b9506).


## Points and country data
`Gadm_centroid` is a service of points and contains the data shown on the side bar of the national report cards. This is the service that has to be updated when a new SPI is calculated.

## Rescaled Priority layer
Within a country the priority layer has been rescaled so the highest value within a country takes the highest colour in the colour ramp. The rescaled values have been done using R and arcpy. The process is described in [this notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/arcpyNotebooks/Classification_of_raster_putatitve_pa_by_country.ipynb).


## Derived data of the National Report Cards.
The challenge plot has derived data that has been calculated as shown in [this notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/above_below_countries.ipynb). Previously, the stewardship data has been calculated in [this other notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/shared_stewardship.ipynb).
