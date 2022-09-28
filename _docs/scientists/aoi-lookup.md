---
layout: default
title: AOI lookup table
parent: Scientists 🧑‍🔬
permalink: /_docs/science/aoi-lookup
---

# Improving the search functionality of AOIs: the AOI lookup table

The Areas of Interest (AOI) section is crucial within the Half-Earth map. The possibility of exploring the state of biodiversity at a local/regional level not only enriches the user experience, but can also improve the information used to inform decision-making in biodiversity conservation. Even though the first version of the AOIs was very well received by the users, extensive user research analysis revealed the need to improve some flows within this section. The **AOI lookup table** emerges as a solution to address one of the most important user cases detected during this research. 

## Some context

Before the implementation of the new search functionalities, the users had to choose a boundary type to be able to visualize the geometries of that category and click on them or search among them. The need to select the AOI category before being able to look for the desired area of interest could lead to strange situations in which a user looked for an area that, despite having precalculated data, was not displayed because the boundary type chosen was incorrect. 

>> **Example:**
>> The user types "California" while the `National boundaries`option is selected. The app returns no results. If the user switches to `Subnational boundaries`, the app returns the precalculated data for the desired region.

The reason for this behaviour lies in the fact that the precalculated data is saved in different feature services: one for national boundaries, one for subnational boundaries, and so on. 

## The AOI lookup table

To solve this problem, we decided to create a lookup table containing the names of all the geometries included in the AOIs. The purpose of this AOI lookup table is to change the search functionality and allow the user to retrive information about any of the geometries with precalculated data, without the need to change the boundary type.  

By September 2022, the AOI lookup table contains data from the layers with precalculated data currently hosted in AGOL:
* [National boundaries](https://eowilson.maps.arcgis.com/home/item.html?id=7b940493af104f7e86f1844b432bf5d3) 

 >> This section includes country names in English with some alternative names, and country names in Spanish, French and Portuguese.

* [Subnational boundaries](https://eowilson.maps.arcgis.com/home/item.html?id=b963d3abc00245ccbd986fb9534e8b6a)
* [Protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=3be5742afc35421b85cc2030c5079f84). 

**Note**: the [Places for the Half-Earth Future](https://eowilson.maps.arcgis.com/home/item.html?id=50b9d98566de457080f0c951f43b45c5) were not included in the lookup table, as they do not have proper names. 


### Creation of the AOI lookup table

The AOI lookup table was created using [this notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/AOI_lookup_table.ipynb). The resulting table was published in ArcGIS Online and is hosted [here](https://eowilson.maps.arcgis.com/home/item.html?id=39475c2b03784ac5bcc3181dc563aa74). It contains four fields:

* **NAME**: the name that each geometry has in its corresponding table
* **MOL_ID**: the ID that each geometry has in its corresponding table. 
>> This ID is unique in each feature service, but not in the AOI lookup table. For instance, there will be as many `MOL_ID==1` as geometries with that ID in their corresponding feature services. Also, the *alternative names* given in the [gadm0_precalculated](https://eowilson.maps.arcgis.com/home/item.html?id=7b940493af104f7e86f1844b432bf5d3) layer or the names of the countries in different languages are included in the AOI lookup table as new entries, but they keep the MOL_ID of the original geometry.
* **LANGUAGES**: the language in which the name can be used. 
>> It can be "en" (English), "es" (Spanish), "fr" (French) or "pt" (Portuguese). This only applies to country names. Subnational boundaries and protected areas keep their original name in all languages, so the value of this field for those geometries would be "en, es, fr, pt".
* **LAYERSLUG**: the name used by the frontend to refer to each feature service. This field is used to link each NAME and MOL_ID to their corresponding table with precalculated data. 

### Updating the AOI lookup table

To integrate changes in the AOI feature services or add new precalculated geometries to the AOI lookup table, the table needs to be updated. The most efficient way to update the AOI lookup table is using a [notebook](https://eowilson.maps.arcgis.com/home/notebook/notebook.html?id=ff695ca1b2dc48e7a0b6a9ab79614924) hosted in ArcGIS Online. This can be set to run automatically every month (or any desired period of time), so **the AOI lookup gets updated periodically**. The update is made overwriting the table, to integrate both changes to current features and new entries.

>>**ATTENTION:** If new feature services with precalculated data are published, they will need to be included in the hosted notebook to be integrated in the AOI lookup table during the next update. 

For more information about the updating process, the [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/AOI_lookup_table.ipynb) used to create the AOI lookup table includes a section in which the updating process is explained with an example. Note that this part of the notebook was tested using a duplicated service for gadm0. Make sure that you also create a cloned service to test this part of the notebook. Guidance to create cloned services is included in that notebook, or [here](https://github.com/Vizzuality/he-scratchfolder/blob/master/duplicate_services.ipynb).