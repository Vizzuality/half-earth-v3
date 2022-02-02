---
layout: default
title: Precalculated data
parent: Scientists 🧑‍🔬
permalink: /_docs/science/precalculated-data
---

# Precalculated data AOIs
The precalculated refers to the summary data that results from crossing a geometry with several data sources to obtain information in that area for biodiversity and other contextual layers. It uses the same steps than the AOIs, the only difference is that they are run beforehand and the data is stored in AGOL, instead of being run on the fly inside the platform. The main reason is that the size of the geometries is too big to be run in a timely way on the fly.

The precalculated data appears as part of the `Areas of Interest` (as a dropdown menu where the user can select to see data from National Boundaries, Subnational Boundaries or Protected Areas) and is also used to show the data of the `Places for Half Earth Future`.
Dropdown menu:
![](/public/precalc_dropdown.png)

Contextual data: 
![](/public/precalc_contextual.png)

Biodiversity data:
![](/public/precalc_biodiv.png)

# Current precalculated services
1. ## National boundaries
   1. [FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=349b82ad2dc04ee7975c550af9896993)
   2. [FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=ddeb1dfe7d814321ac9bb795aa794e3b)
2. ## Subnational boundaries
   1. [FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=fe214eeebd21493eb2782a7ce1466606)
   2. [FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=48b13c6a7ca04cdeb31609da392aae9d)
3. ## Protected Areas
   1. Not available yet
4. ## Places for Half Earth Future
   1. Not available yet


## Precalculated processing:

The final tables for precalculated data follow several steps (detailed below):
- Precalculate Biodiversity data
- Precalculate Contextual data
- Merge in python ([notebook for AOI](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_AOI_tables.ipynb), [notebook for HE Places](https://github.com/Vizzuality/he-scratchfolder/blob/master/Places_HE_Future.ipynb))
- Create Protected Areas table 

## Data needed
## 1. **Geometries**
The original files and simplified versions are available on ArcGis Online. Original versions are used to calculate the zonal statistics while the simplified versions are used to display the data online.
These tables have a unique field names `MOL_ID` that will be used throughout the analysis to match.

* [**GADM 0 raw**](https://eowilson.maps.arcgis.com/home/item.html?id=8659cb1de990461f9b2ffc56a955c049) (layer not available on AGOL anymore)
* [**GADM 0 simplified**](https://eowilson.maps.arcgis.com/home/item.html?id=a3b0b3ef65ae463693679978d698e1c8)
* [**GADM 1 raw**](https://eowilson.maps.arcgis.com/home/item.html?id=122082293e614e06bddbe532063accc9)
* [**GADM 1 simplified**](https://eowilson.maps.arcgis.com/home/item.html?id=4afeb2c82e8a45e98f9c698cb2259dc0)
* [**Terrestrial WDPA raw **](https://eowilson.maps.arcgis.com/home/item.html?id=ba1e71b5d83548808ee02d1108221cae)
* [**Terrestrial + Marine WDPA raw**](https://eowilson.maps.arcgis.com/home/item.html?id=17659b62323646b8ae622680dab49952)
* [**Terrestrial + Marine WDPA simplified**](https://eowilson.maps.arcgis.com/home/item.html?id=1a617eaeaf77458cb569f683366e3920)
* [**Places for HE future raw**](https://eowilson.maps.arcgis.com/home/item.html?id=358f2419c967453195ec72e4d910fd6e)
* [**Terrestrial WDPA raster Equal Area**](https://eowilson.maps.arcgis.com/home/item.html?id=d7d548156ff24c7e98096b37c5401ecf)


## 2. **Biodiversity CRFs**
There is one biodiversity data cube per terrestrial taxa (in the future there will also be marine taxa: fish and mammals).

The crfs are stored in an Azure bucket owned by MOL. The connection is already established inside the Virtual Machine Viz2.  To be able to access the data in the Azure bucket, the file `YaleFinal.acs` (in Documents > ArcGIS > Projects) has to be added to any new ArcGIS Pro project via the `Insert` tab in the top menu, `+Connection`, `Add Cloud Storage Connection`.

![](/public/precalc_cloud_connection.png)

Inside the Azure bucket, in the folder `species` are all the crfs created. Beware that not all of them are useful. The "good" crfs have been created in Equal Area Projection.
All the terrestrial taxa have a resolution of 1km x 1km. We can assume that every pixel represents 1 km2 for all calculations.

* amphibians: `amphibians_equal_area_20211003.crf`
* birds:`birds_equal_area_20211003.crf`
* mammals:`mammals_equal_area_20211003.crf`
* reptiles:`reptiles_equal_area_20211003.crf`

## 3. **Contextual layers CRFs**
The contextual layers are also stored in the Azure bucket. Currently there is only terrestrial contextual data.
* Land cover and climate regime: `ELU.crf`
* Land encroachment: `land_encroachment.crf`
* Population: `population2020.crf`


## Steps to process Biodiversity precalculated data:
 1. **Sample**: Use the Sample tool with the feature layer (geometry) against a crf. Process as multidimensional, use `MOL_ID` as unique identifier and use the statistic `SUM`
![](/public/precalc_sample.png) 

2. **Table to Table**: Keep only the values where the species field is above 0
![](/public/precalc_table_to_table.png)
![](/public/precalc_output_table.png)

3. **Summary Statistics**: Sum together all the values that match `MOL_ID` and `SliceNumber`
![](/public/precalc_summary_stats.png)
![](/public/precalc_output_summary.png)

4.**Table to Table**: Change the extension to and the location of the file to be able to access it later. It can be sent via email or uploaded to AGOL.
![](/public/precalc_export_csv.png)

## Steps to process Contextual precalculated data:
In this case we are using models created with Model Builder to process the data. The models are available in the ArcGIS Pro Project `Contextual_precalculations`. The models used can be accessed from the Catalog panel, Toolboxes > Contextual_precalculations.tbx. The idea is the same, we need to input 2 parameters (a feature layer and a crf) and do Zonal Stats to get the summary values of each crf inside each geometry. The field `MOL_ID` identifies each unique geometry. Once we have the output tables of each type of data, we export them as csvs and process them in [python](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_AOI_tables.ipynb)

| **Variable**| **Model Name** | **Input 1** |**Input 2**| **Output** | **Lookup table** |
|--|--|--|--|--|--|
|Land Encroachment|`LandEncroachmentMOLIDjoin`| feature layer with geometries (gadm0, gadm1 or wdpa)|`land_encroachment.crf`|table|[encroachment lookup](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer)|
|Population|`ZstatSumMOLID`|feature layer with geometries (gadm0, gadm1 or wdpa)|`population2020.crf`|table|none|
|Climate regime and Land cover|`ZstatMajorityMOLID`|feature layer with geometries (gadm0, gadm1 or wdpa)|`ELU.crf`|table|[elu lookup](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer)|

## Steps to process Protected Areas table
Each precalculated area has a table that shows all the protected areas present in that area. There are separate tables with the needed information for the national boundaries ([gadm 0]()) and subnational boundaries ([gadm 1](https://eowilson.maps.arcgis.com/home/item.html?id=48b13c6a7ca04cdeb31609da392aae9d)). The data was processed using this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/WDPA_gadm1.ipynb)
![](/public/precalc_All_protected_areas.png)


## Steps to process Precalculated data 20 Places for HE Future
Project in ArcGIS Pro: `Places_HE_Future`
- Access the data from AGOL and download into ArcGIS Pro as a shapefile (the [current layer](https://eowilson.maps.arcgis.com/home/item.html?id=4848c6b08fac4fa5bff40e9331b6d291) is not final and will most probably change, but the processing steps will be the same) 
- Add a numeric field named `MOL_ID`. Using the Calculate Field tool give a unique number to each geometry, starting from 1 to n features. Make sure the type is set to `Long`.
- For Biodiversity data:
  - Add the taxa crf to the Current Map from the Catalog (the Azure connection should be added previously as explained in Step 2 of the Precalculated AOIs)
  - Run Sample the same way as with the Precalculated AOIs
  - Run Table to Table to keep only the values > 0
  - Run Table to Table to export a csv
- For Contextual data
  - Load Contextual Data Layers model
  - Load from Azure connection:
    - ELU.crf
    - land_encroachment.crf
    - population.crf
    - WDPA_Terrestrial_CEA_June2021.crf
  - Add the WDPA_Mercator layer (only terrestrial) (in the Catalog panel, Add to Database: ArcGIS > Projects > Contextual precalculations.gdb and select the layer `WDPA_Mercator`)
- Format and merge data in python ([notebook for HE Places](https://github.com/Vizzuality/he-scratchfolder/blob/master/Places_HE_Future.ipynb))