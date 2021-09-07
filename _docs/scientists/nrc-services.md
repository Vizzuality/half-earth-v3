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
