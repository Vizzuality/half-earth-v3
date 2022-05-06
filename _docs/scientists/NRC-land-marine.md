---
layout: default
title: National Report Cards - Updated
parent: Scientists 🧑‍🔬
permalink: /_docs/science/NRC-land-marine
---
# New iteration of the National Report Cards (NRC): updating terrestrial data and adding marine section

## Context

Before 2022, the NRC showed only information for terrestrial vertebrates. The process to produce the first iteration of NRC was documented [here](https://vizzuality.github.io/half-earth-v3/_docs/science/nrc-services), and there is a project in ArcGIS Pro called National_report_cards in which most of the processes were carried out. The layers used in the first iteration of NRC were:
* [gadm_centroid](https://eowilson.maps.arcgis.com/home/item.html?id=46e7cb3493024df0bd978b15106dfaf9#data), a service of points that contained all the data shown in the NRC.
* [gadm_generalized](https://eowilson.maps.arcgis.com/home/item.html?id=3c7c5f75cc184a4ca89fe9c8c2154da5#data), a service of polygons that shows country boundaries. It includes Kiribati and Fiji although they show an unexpected behavior.
* [spi_data_spi_globe](https://eowilson.maps.arcgis.com/home/item.html?id=a819da088d3747b8bf2322d597661d5e), polygon layer with countries colored by SPI that was shown on the global page.
* [NRC_species_data_20200817_formatted](https://eowilson.maps.arcgis.com/home/item.html?id=44254d4f599643dea844d53d4f138dec), a hosted table that contains information about the species of terrestrial vertebrates found in each country. Although this info is used to display a table in the NRC, the original table in ArcGIS Online cannot be publicly shared, and the service has to be [whitelisted]. 



In 2022, the NRC were updated in two different ways:
1. The existing **terrestrial data** shown in the first iteration of NRC was updated.
2. A new section with **marine data** was included.


## Process:
The new iteration of NRC was made combining both ArcGIS Pro and Python. 

### **ArcGIS Pro**: 

#### Project *NRC_Marine*. 

In this project, ArcGIS Pro was used to:

* Extract population per country and EEZ: using the `Zonal Statistics as Table` tool (sum) with the gadm and EEZ layers and the population2020.crf stored in the Yale Cloud.

* Create GID_0 field for the EEZ features and dissolve them (by GID_0), so that all polygons related to the same territory were grouped together.

* Create centroids for gadm and EEZ layers. These centroids were later used in Python notebooks to create one of the filters shown on the challenges tab of the NRC. The centroids were calculated using the `Feature to Point tool`. For the gadm boundaries, the *inside* bottom was checked, forcing the centroids to fall within the geometry of the country. For EEZ, however, the *inside* bottom was unchecked. Because the EEZ can be very large and very far away from each other, it was more convinient to show the representative centroid instead of forcing it to fall within an EZZ polygon.

* Classify countries and EEZ by their corresponding SPI values and color them accordingly (using the style defined in the cartographic review): it is possible to apply a given style to a new layer by adding to the map in ArcGIS Pro a layer from ArcGIS Online that has the desired style. Then, selecting the layer we want to apply the style to on the Table of Contents, we can go to *Appearance* (on the top menu) and click on *Import*, to apply the style from one layer to the other one. 

* Clean layers: in order to have geometries that include both the area of a country and the area of its corresponding EEZ, the gadm and EEZ layers were merged and dissolved using Python. However, further cleaning to remove holes and undesired vertices on the resulting layer was done in ArcGIS Pro (*Edit*/*Edit vertices*).

* Publish layers: it is easier and quicker to publish layers in ArcGIS Online directly from Pro.

#### Project *NRC_marine_EEZ_priority_tiles*

* Rescale the [marine priority](https://eowilson.maps.arcgis.com/home/item.html?id=0023e9c6ee16456588adfe60df6473b6) layer and publish it as tiles. A color ramp was added to the [layer](https://eowilson.maps.arcgis.com/home/item.html?id=18472e63d46348c69ae09ceed130768a) sent by MOL. This is a global layer that provides priority ranked by country. In this case, the ranks were given from 0 to 255, while the [terrestrial layer](https://eowilson.maps.arcgis.com/home/item.html?id=2e599e24169d410ea9df2c9e02030490) is binned from 0 to 100 (according to [documentation](https://vizzuality.github.io/half-earth-v3/_docs/science/nrc-services)). In case we need it to be binned from 0 to 100 (to be consistents with the terrestrial) MOL needs to send a new layer. 

### **Python**:

Several notebooks were used to process the data and the layers used in the new iteration of National Report Cards:

#### [NRC_Terrestrial:](https://github.com/Vizzuality/he-scratchfolder/blob/master/NRC_Terrestrial.ipynb). This notebook updates the terrestrial NRC using these layers:

* [Old data](https://eowilson.maps.arcgis.com/home/item.html?id=46e7cb3493024df0bd978b15106dfaf9#data): The old gadm_centroid layer used in the first iteration of NRC was used here to retrieve information that doesn't need to be updated. This is the case of fields such as GNI_PPP or human modification.

* [Country boundaries](https://eowilson.maps.arcgis.com/home/item.html?id=9bb8c1c963504e029b86810db0a6a3af): because the gadm_generalized layer used in the first iteration of NRC does not include the Outer Minor Islands of the USA, we used the gadm36_level0 boundaries with a simplification made with [mapshaper](https://github.com/Vizzuality/he-scratchfolder/blob/master/Simplification_EEZ.ipynb). 

* Country centroids: generated in ArcGIS Pro, this centroids were used to calculate, for each country, the closest countries.

* [Species:](https://eowilson.maps.arcgis.com/home/item.html?id=216323470c54497fb1376fba1125e518) ([whitelisted service](https://eowilson.maps.arcgis.com/home/item.html?id=c7c4769519d04639908c36f508577ac6)).

* Population: because the previous NRC had population data from 2016, we updated this field using a new population table (generated in ArcGIS Pro).

* [SPI and protection](https://eowilson.maps.arcgis.com/home/item.html?id=25d7caecf3a3447c8b4afeda3b8ff94c): ([whitelisted](https://eowilson.maps.arcgis.com/home/item.html?id=0c379c259996454fadfc96886deda07d)). This table was used to update the national SPI and the % of protection in each country to 2021. Also, because the data is given in a time series, it was used (directly by the Front-End) to create a plot that shows the evolution of these two indicators over time. 

* [Percentage of protection needed:](): Pending from MOL

The result of this notebook is a table that has all terrestrial data needed for the new iteration of the NRC. 

#### [NRC_Marine](https://github.com/Vizzuality/he-scratchfolder/blob/master/NRC_Marine.ipynb). This notebook adds the new marine data to the NRC master table

* Terrestrial data: The table generated after running NRC_Terrestrial is imported here to generate a master table that contains all the data needed for the new implementation of the NRC.

* [Species:](https://eowilson.maps.arcgis.com/home/item.html?id=dd0c97a8a00b463d94b6ea2217541baa): ([whitelisted](https://eowilson.maps.arcgis.com/home/item.html?id=5df959008b444568836d12a3ba215a90)).

* Population: table generated in ArcGIS Pro containing population for 2020 in each EEZ.

* [SPI and protection](https://eowilson.maps.arcgis.com/home/item.html?id=7d4a463e96fc4ec1bbbea1cfd465893b): ([whitelisted](https://eowilson.maps.arcgis.com/home/item.html?id=f0493450b8b64a79b30acbd0f42c246c)). This table was used to retrieve the marine national SPI and the % of protection in each EEZ in 2021. Also, because the data is given in a time series, it was used (directly by the Front-End) to create a plot that shows the evolution of these two indicators over time.  

* [Percentage of protection needed:]() Pending from MOL

* [Human modification:]() Sent by MOL (pending to upload file)

* EEZ centroids: The centroids generated in ArcGIS Pro are used here to retrieve, for each EEZ, the closest ones.

The result of this notebook is a table that contains all the terrestrial and marine data needed for the implementation of the NRC. This [master table](https://eowilson.maps.arcgis.com/home/item.html?id=204483ae95094528b6429a35bf9e995d) was uploaded in ArcGIS Online as a point layer using the centroids of the countries. 


#### Other notebooks:

* [Simplification of EEZ and gadm geometries](https://github.com/Vizzuality/he-scratchfolder/blob/master/Simplification_EEZ.ipynb). This notebook simplifies the EEZ and gadm geometries using Mapshaper. 
* [Combine EEZ and gadm boundaries in a unique geometry](https://github.com/Vizzuality/he-scratchfolder/blob/master/EEZ_ADM_DATA.ipynb). To have a geometry that includes both the EEZ and the country boundaries of each country, we merged both layers and dissolved them by GID_O using this notebook. The [resulting layer](https://eowilson.maps.arcgis.com/home/item.html?id=ae0db76147cb49fb824d8a599b0866c3) was cleaned in ArcGIS online to remove some holes and undesired vertices.  

## Layers used in the new iteration of NRC:

As a summary, these are the layers used in the new NRC:

### Boundaries

* [EEZ boundaries](https://eowilson.maps.arcgis.com/home/item.html?id=869c9517c8714c5787d5be75c6b8276e): EEZ boundaries dissolved by GID_0 (overlapping claims excluded) and simplified. These are used on the global view to display the EEZ colored by marine SPI. 
* [Country boundaries](https://eowilson.maps.arcgis.com/home/item.html?id=9bb8c1c963504e029b86810db0a6a3af): country boundaries simplified. Used on the global view to display countries colored by terrestrial SPI.
* [Combined EEZ and country boundaries](https://eowilson.maps.arcgis.com/home/item.html?id=ae0db76147cb49fb824d8a599b0866c3). These features represent the boundaries of both countries and EEZ merged. It is used to highlight the territories in the NRC when the mouse passes over them.

### Rasters

* [Terrestrial WDPA](https://eowilson.maps.arcgis.com/home/item.html?id=df21faa26b9e429ba8efeb67f72edb47).
* [Marine WDPA](https://eowilson.maps.arcgis.com/home/item.html?id=8d24355ee8374c918e72ee8dea92910f).
* [Marine priority](https://eowilson.maps.arcgis.com/home/item.html?id=0023e9c6ee16456588adfe60df6473b6). 
* [Terrestrial priority](https://eowilson.maps.arcgis.com/home/item.html?id=2e599e24169d410ea9df2c9e02030490).

### Tables

[Master table](https://eowilson.maps.arcgis.com/home/item.html?id=204483ae95094528b6429a35bf9e995d).
[Terrestrial species:](https://eowilson.maps.arcgis.com/home/item.html?id=216323470c54497fb1376fba1125e518) ([whitelisted service](https://eowilson.maps.arcgis.com/home/item.html?id=c7c4769519d04639908c36f508577ac6)).
[Marine species:](https://eowilson.maps.arcgis.com/home/item.html?id=dd0c97a8a00b463d94b6ea2217541baa)([whitelisted service](https://eowilson.maps.arcgis.com/home/item.html?id=5df959008b444568836d12a3ba215a90)).
[Terrestrial SPI and protection](https://eowilson.maps.arcgis.com/home/item.html?id=25d7caecf3a3447c8b4afeda3b8ff94c)([whitelisted](https://eowilson.maps.arcgis.com/home/item.html?id=0c379c259996454fadfc96886deda07d)).
[Marine SPI and protection](https://eowilson.maps.arcgis.com/home/item.html?id=7d4a463e96fc4ec1bbbea1cfd465893b)([whitelisted](https://eowilson.maps.arcgis.com/home/item.html?id=f0493450b8b64a79b30acbd0f42c246c)).
Terrestrial population (`Pop2020_gadm_original` in ArcGIS Pro project and `Pop2020_gadm`in folder NRC_2022)
Marine population (`Pop2020_eez_original` in ArcGIS Pro project and `Pop2020_eez`in folder NRC_2022)
Terrestrial human modification (retrieved from old [gadm_centroid](https://eowilson.maps.arcgis.com/home/item.html?id=46e7cb3493024df0bd978b15106dfaf9#data)).
Marine human modification (saved in folder NRC_2022 as `marine_perc_human`).
Terrestrial percentage of protection needed TBD.
Marine percentage protection needed TBD.


