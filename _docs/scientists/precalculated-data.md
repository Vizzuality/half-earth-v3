---
layout: default
title: Precalculated data
parent: Scientists 🧑‍🔬
permalink: /_docs/science/precalculated-data
---

# Precalculated data AOIs
The precalculated refers to the summary data that results from crossing a geometry with several data sources to obtain information in that area for biodiversity and other contextual layers. It uses the same steps than the AOIs, the only difference is that they are run beforehand and the data is stored in AGOL, instead of being run on the fly inside the platform. The main reason is that the size of the geometries is too big to be run in a timely way on the fly.

The precalculated data appears as part of the `Areas of Interest` (as a dropdown menu where the user can select to see data from National Boundaries, Subnational Boundaries or Protected Areas) and is also used to show the data of the `Places for a Half-Earth Future`.

Dropdown menu:

![](/public/precalc_dropdown.png)

Contextual data:

![](/public/precalc_contextual.png)

Biodiversity data:

![](/public/precalc_biodiv.png)

# Current precalculated services
All the services for the precalculated data are in AGOL in folder `#6 precalculated data`
1. ## National boundaries
   1. [GADM0 FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=349b82ad2dc04ee7975c550af9896993)
   2. [GADM0 FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=ddeb1dfe7d814321ac9bb795aa794e3b)
2. ## Subnational boundaries
   1. [GADM1 FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=fe214eeebd21493eb2782a7ce1466606)
   2. [GADM1 FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=48b13c6a7ca04cdeb31609da392aae9d)
3. ## Protected Areas
   1. [WDPA FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=00520b68c2af41d39a3dfec82a27ebf6)
   2. [WDPA FS geometries](https://eowilson.maps.arcgis.com/home/item.html?id=a032522cc9024af99c15429d56a23de6)

\* The WDPAs are a special case where the data and the geometries are separate in different tables. This is because the WDPA layer is so big it would take too long to load. Even now just the simplified geometries are very heavy and we are in the process of finding solutions to fix this.
1. ## Up to 20 Places for Half-Earth Future
   1. [Places FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=67861ba776e044e4a8084e69bca50d78)
   2. [Places FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=ec40de8083304b279d416685a5b98209)


# Precalculated processing:
**NOTE** The precalculated data for the first (current) version of the AOIs was done mostly manually, going step by step with the Geoprocessing Tools in ArcGis Pro. But, now that we have created the models for the on the fly calculations, they could be used to precalculated the data as well.

The final tables for precalculated data combine data from several sources, and each follow several steps, all detailed below.

## Data sources
### 1. **Geometries**
The original files and simplified versions are available on ArcGis Online. Original versions are used to calculate the zonal statistics while the simplified versions are used to display the data online.
These tables have a unique field names `MOL_ID` that will be used throughout the analysis to match data from the different sources.

* [**GADM 0 raw**](https://eowilson.maps.arcgis.com/home/item.html?id=8659cb1de990461f9b2ffc56a955c049) (layer not available on AGOL anymore)
* [**GADM 0 simplified**](https://eowilson.maps.arcgis.com/home/item.html?id=a3b0b3ef65ae463693679978d698e1c8)
* [**GADM 1 raw**](https://eowilson.maps.arcgis.com/home/item.html?id=122082293e614e06bddbe532063accc9)
* [**GADM 1 simplified**](https://eowilson.maps.arcgis.com/home/item.html?id=4afeb2c82e8a45e98f9c698cb2259dc0)
* [**Terrestrial WDPA raw**](https://eowilson.maps.arcgis.com/home/item.html?id=ba1e71b5d83548808ee02d1108221cae)
* [**Terrestrial + Marine WDPA raw**](https://eowilson.maps.arcgis.com/home/item.html?id=17659b62323646b8ae622680dab49952)
* [**Terrestrial + Marine WDPA simplified**](https://eowilson.maps.arcgis.com/home/item.html?id=1a617eaeaf77458cb569f683366e3920)
* [**Places for a Half-Earth Future raw**](https://eowilson.maps.arcgis.com/home/item.html?id=358f2419c967453195ec72e4d910fd6e)
* [**Terrestrial WDPA raster Equal Area**](https://eowilson.maps.arcgis.com/home/item.html?id=d7d548156ff24c7e98096b37c5401ecf)


### 2. **Biodiversity CRFs**
There is one biodiversity data cube per terrestrial taxa (in the future there will also be marine taxa: fish and mammals).

The crfs are stored in an Azure bucket owned by MOL. The connection is already established inside the Virtual Machine Viz2.  To be able to access the data in the Azure bucket, the file `YaleFinal.acs` (in Documents > ArcGIS > Projects) has to be added to any new ArcGIS Pro project via the `Insert` tab in the top menu, `+Connection`, `Add Cloud Storage Connection`.

![](/public/precalc_cloud_connection.png)

Inside the Azure bucket, in the folder `species` are all the crfs created. Beware that not all of them are useful. The "good" crfs have been created in Equal Area Projection.
All the terrestrial taxa have a resolution of 1km x 1km. We can assume that every pixel represents 1 km2 for all calculations.

* amphibians: `amphibians_equal_area_20211003.crf`
* birds:`birds_equal_area_20211003.crf`
* mammals:`mammals_equal_area_20211003.crf`
* reptiles:`reptiles_equal_area_20211003.crf`

### 3. **Contextual layers CRFs**
The contextual layers are also stored in the Azure bucket. Currently there is only terrestrial contextual data.
* Land cover and climate regime: `ELU.crf`
* Land encroachment: `land_encroachment.crf`
* Population: `population2020.crf`

## Data processing:
This is the summary of steps (explained in more detail below):

1. Table of precalculated data:
- Precalculate Biodiversity data in ArcGIS Pro
- Precalculate Contextual data in ArcGIS Pro
- Merge in Python: original notebooks. Because the data has to be shared in a particular format, it is necessary to carry out the process in Python. The ([notebook for AOI](https://github.com/Vizzuality/he-scratchfolder/blob/main/Precalculated_AOI_tables.ipynb) and the [notebook for HE Places](https://github.com/Vizzuality/he-scratchfolder/blob/main/Places_HE_Future.ipynb)) were used for gadm0, gadm1 and 20 places. However, this method is not efficient, especially when dealing with large databases like the WDPAs.
- Merge in Python: **efficient method**. To overcome this problem, this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/main/Precalculated_WDPA.ipynb) was used to merge the precalculated data for WDPAs. This method is extremely quicker, simpler and cleaner so it is very much recommended if these calculations need to be run again.

2. Table of protected areas by country
- Create Protected Areas table ([notebook for PA table](https://github.com/Vizzuality/he-scratchfolder/blob/main/WDPA_gadm1.ipynb))


### **Steps to process Biodiversity precalculated data:**
There are example projects in Viz2 VM where the steps can be followed in the history as well as the data that has been used and the output tables generated. ArcGIS Pro Projects gadm0 = `gadm0_amphibians_sample_20211003` & gadm1 = `gadm1_reptiles_sample_20211003`


 1. **Sample**: Use the Sample tool with the feature layer (geometry) against a crf. Process as multidimensional, use `MOL_ID` as unique identifier and use the statistic `SUM`
![](/public/precalc_sample.png)

2. **Table to Table**: Keep only the values where the species field is above 0
![](/public/precalc_table_to_table.png)
![](/public/precalc_output_table.png)

3. **Summary Statistics**: Sum together all the values that match `MOL_ID` and `SliceNumber`. This step is only needed in the geometries have been subdivided previously.
![](/public/precalc_summary_stats.png)
![](/public/precalc_output_summary.png)

4. **Table to Table**: Export the results. Change the extension to and the location of the file to be able to access it later. It can be sent via email or uploaded to AGOL. The files can also be uploaded to AGOL directly from the VM.
![](/public/precalc_export_csv.png)

### **Steps to process Contextual precalculated data:**
In this case we are using models created with Model Builder to process the data. The models are available in the ArcGIS Pro Project `Contextual_precalculations`. The models used can be accessed from the Catalog panel, Toolboxes > Contextual_precalculations.tbx. The idea is the same, we need to input 2 parameters (a feature layer and a crf) and do Zonal Stats to get the summary values of each crf inside each geometry. The field `MOL_ID` identifies each unique geometry. Once we have the output tables of each type of data, we export them as csvs and process them in [python](https://github.com/Vizzuality/he-scratchfolder/blob/main/Precalculated_AOI_tables.ipynb).


**NOTE** In this version, each type of data has been run with a separate Model, but the general model develoed for on the fly calculations `ContextualLayersProdRange` could be used in future iterations.

| **Variable**| **Model Name** | **Input 1** |**Input 2**| **Output** | **Lookup table** |
|--|--|--|--|--|--|
|Land Encroachment|`LandEncroachmentMOLIDjoin`| feature layer with geometries (gadm0, gadm1 or wdpa)|`land_encroachment.crf`|`ZonalSt_LE_MOLID`|[encroachment lookup](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer)|
|Population|`ZstatSumMOLID`|feature layer with geometries (gadm0, gadm1 or wdpa)|`population2020.crf`|`ZonaSt_sum_pop`|none|
|Climate regime and Land cover|`ZstatMajorityMOLID`|feature layer with geometries (gadm0, gadm1 or wdpa)|`ELU.crf`|`ZonalSt_Majority_ELU`|[elu lookup](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer)|

### **Steps to process Protected Areas table:**
Each precalculated area has a table that shows all the protected areas present in that area. There are separate tables with the needed information for the national boundaries ([gadm 0]()) and subnational boundaries ([gadm 1](https://eowilson.maps.arcgis.com/home/item.html?id=48b13c6a7ca04cdeb31609da392aae9d)). The data was processed using this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/main/WDPA_gadm1.ipynb)
![](/public/precalc_All_protected_areas.png)


### **Steps to process Precalculated data 20 Places for a Half-Earth Future:**
Project in ArcGIS Pro: `Places_HE_Future`
1. Access the data from AGOL and download into ArcGIS Pro as a shapefile (the [current layer](https://eowilson.maps.arcgis.com/home/item.html?id=4848c6b08fac4fa5bff40e9331b6d291) is not final and will most probably change, but the processing steps will be the same)
2. Convert shapefile to geojson with the tool Feature to json. This will allow uploading the file in AGOL as a geojson instead of a shapefile (shapefiles have character limitations that will truncate the string it'll be create later)
3. Add a numeric field named `MOL_ID`. Using the Calculate Field tool give a unique number to each geometry, starting from 1 to n features. Make sure the type is set to `Long`.
4. For Biodiversity data:
  - Add the taxa crf to the Current Map from the Catalog (the Azure connection should be added previously as explained above in the section `Biodiversity CRFs`)
  - Run Sample the same way as with the Precalculated AOIs
  - Run Table to Table to keep only the values > 0
  - Run Table to Table to export a csv
  **NOTE** There were 4 geometries in this layer  (MOL_IDs = 62, 69, 73, 194) that caused the ArcGIS Pro tools to fail when calculating the biodiversity data. They were removed from the analysis.
5. For Contextual data
  - Load Contextual Data Models from the toolbox
  - Load from Azure connection:
    - ELU.crf
    - land_encroachment.crf
    - population.crf
    - WDPA_Terrestrial_CEA_June2021.crf
  - Add the WDPA_Mercator layer (only terrestrial) (in the Catalog panel, Add to Database: ArcGIS > Projects > Contextual precalculations.gdb and select the layer `WDPA_Mercator`)
6. Format and merge data in python ([notebook for HE Places](https://github.com/Vizzuality/he-scratchfolder/blob/main/Places_HE_Future.ipynb)). Export file as geojson and upload it in AGOL.
7. For Protected Areas data
   - In ArcGIS Pro perform a spatial join between the layer containing the original geometries of the [WDPAs](https://eowilson.maps.arcgis.com/home/item.html?id=abfea4a91726464baca51a07ac2cd486) and the geometries for the [Places for a Half-Earth Future](https://eowilson.maps.arcgis.com/home/item.html?id=4848c6b08fac4fa5bff40e9331b6d291). (Remember to remove those 4 geometries that caused errors).
   - Create a csv with only the relevant fields (exclude geometry) using the Table to Table tool.
   - Upload the table in AGOL as a [hosted table](https://eowilson.maps.arcgis.com/home/item.html?id=ec40de8083304b279d416685a5b98209). The resulting table contains only WDPAs that intersect the geometries for the 20 places for Half-Earth Future.


# Lookup Tables:
Because the species data cannot be shared publicly, the precalculated data generated in the steps described above only contain a special type of ID called SliceNumber. Each SliceNumber is related to a unique species. MOL generates a series of lookup tables (one for each taxa) from where it is possible to retrieve information using the SliceNumber. The fields available in these tables are: Name, SliceNumber, scientific_name, range_area_km2, wdpa_km2, percent_protected, conservation_target, is_flagship, conservation_concern, has_image, common_name.

#### IMPORTANT:
1. Lookup tables are created by MOL and should only be manipulated (updated, deleted etc.) by them.
2. Lookup tables need to be published in AGOL as Hosted Tables, so the front end can use them (not csv format).
3. Because these tables contain private information, Vizzuality needs to perform a whitelisting process. Here you can find how to make tables whitelisted.

Currently, there are 4 lookup tables in AGOL:
- [Amphibians](https://eowilson.maps.arcgis.com/home/item.html?id=c20121cd88754247bbbeac5da6b26be1)
- [Birds](https://eowilson.maps.arcgis.com/home/item.html?id=fb93f4475cc84fd7b0eec712d701e46d)
- [Mammals](https://eowilson.maps.arcgis.com/home/item.html?id=7c7e6649a44e423ab52083b65823c310)
- [Reptiles](https://eowilson.maps.arcgis.com/home/item.html?id=f0b987e051844fd78b05c813ba251548)
