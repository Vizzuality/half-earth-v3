---
layout: default
title: Precalculated data
parent: Scientists 🧑‍🔬
permalink: /_docs/science/precalculated-data
---

# Precalculated data AOIs

**Note:** Some of the layers and tables here might be deprecated or inexistent due to recent updates or cleaning processes in AGOL, but the described workflow might still be useful to understand the process behind the precalculations.

## Context
The precalculated refers to the summary data that results from crossing a geometry with several data sources to obtain information in that area for biodiversity and other contextual layers. It uses the same steps than the AOIs, the only difference is that they are run beforehand and the data is stored in AGOL, instead of being run on the fly inside the platform. The main reason for this approach is that the size of these geometries is too big to be run in a timely way on the fly.

The precalculated data appears in the section `Analyze areas`section, where the user can select between the different precalculated option:

* Administrative Boundaries, which includes both national and subnational
* Places for the Half-Earth Future
* Protected Areas
* Specific Regions (only in staging for now)

Contextual data:

![](/public/precalc_contextual.png)

Biodiversity data:

![](/public/precalc_biodiv.png)

### Current precalculated services
The services for the precalculated data are hosted in AGOL in folder `#6 precalculated data`
1. #### National boundaries
   1. [GADM0 FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=25ee0339d8fc4e2ea7c8362535250b74)
   2. [GADM0 FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=628b6c66992d4216972dccbe75d95c67)

2. #### Subnational boundaries
   1. [GADM1 FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=ee196cef7e5b4d6ab504de16317723b5)
   2. [GADM1 FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=5cf6f76156e2470a825bafa329b7d388)

3. #### Up to 20 Places for Half-Earth Future
   1. [Places FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=5bffd154b48f4723976c46d87f8f6e2a)
   2. [Places FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=cf64e2655d2140d79b597ba0aa9f6332)

4. #### Protected Areas
\* The WDPAs are a special case where the data and the geometries are separate in different tables. This is because the WDPA layer is so big it would take too long to load. Even simplified geometries can very heavy and, if they are too simplified, some geometries are too distorted and lose resolution. To solve this we have created three simplifications, each with a greater level of simplification. In this way, the global view shows a very simplified layer and, as the user zooms in, the geometries are more and more detailed. The simplifications of the WDPA were made in this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/WDPA_Simplification.ipynb).
   1. [WDPA FS geometries: simplification 1 (detailed)](https://eowilson.maps.arcgis.com/home/item.html?id=ae74d5017b8548319bcf5833600be8c4)
   2. [WDPA FS geometries: simplification 2 (medium)](https://eowilson.maps.arcgis.com/home/item.html?id=c834268ff5cf4ea599f46571867ab603)
   3. [WDPA FS geometries: simplification 3 (global)](https://eowilson.maps.arcgis.com/home/item.html?id=5bb791abf2704da491be78eeba3ec354)
   4. [WDPA FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=f866e163361d4160bb96742186709db7)

5. #### Special Areas
   1. [Areas FS precalculated data](https://eowilson.maps.arcgis.com/home/item.html?id=5bffd154b48f4723976c46d87f8f6e2a)
   2. [Areas FS protected areas](https://eowilson.maps.arcgis.com/home/item.html?id=5af0af4ae1974c00b778689b486b8803)


## Precalculated processing:
**NOTE** The precalculated biodiversity data for these AOIs was done mostly manually, going step by step with the Geoprocessing Tools in ArcGis Pro. Note that since the geometries are very big, it's necessary to subdivide the polygons before running the sample tool. For precalculated contextual data, we used specific models to retrieve information from each contextual layer. The project SpecificRegions in saved in the Virtual Machine Viz2 provides an example of the steps that need to be followed to precalculate both biodiversity and contextual data.

The on-the-fly calculations, however, use models that were published as a geoprocessing services. There are four models for the biodiversity data, one for each taxonomic group, and one general model that retrieves data from all the contextual layers together. This model could be used for future precalculations, but have in mind that it was created to deal only with one geometry (either drawn by the user or uploaded in a shapefile). Therefore, there are parts of this general contextual model (particularly the calculation of the protection percentage or the land encroachment percentage) that require some modification to be used with layers that have more than one geometry.

The final tables for precalculated data combine data from several sources, and each follow several steps, all detailed below.

### Data sources
#### 1. **Geometries**
The original files and simplified versions are available on ArcGis Online. Original versions are used to calculate the zonal statistics while the simplified versions are used to display the data online.
These tables have a unique field names `MOL_ID` that will be used throughout the analysis to match data from the different sources.

* **GADM 0 raw**: not available in AGOL anymore
* [**GADM 0 simplified**](https://eowilson.maps.arcgis.com/home/item.html?id=a3b0b3ef65ae463693679978d698e1c8)
* [**GADM 1 raw**](https://eowilson.maps.arcgis.com/home/item.html?id=122082293e614e06bddbe532063accc9)
* **GADM 1 simplified**: no longer hosted in AGOL
* [**Terrestrial WDPA raw MOL**](https://eowilson.maps.arcgis.com/home/item.html?id=ba1e71b5d83548808ee02d1108221cae)
* [**Terrestrial WDPA raw hosted**](https://eowilson.maps.arcgis.com/home/item.html?id=852a88b71d0846e79979ac541c526b33)
* [**Terrestrial WDPA simplified 1**](https://eowilson.maps.arcgis.com/home/item.html?id=94463f9e1d644b979bcad4a56f9f73df)
* [**Terrestrial WDPA simplified 2**)](https://eowilson.maps.arcgis.com/home/item.html?id=01830ac50a864fe08fc31c2491d3333b)
* [**Terrestrial WDPA simplified 3**](https://eowilson.maps.arcgis.com/home/item.html?id=f238cff91e974b85ab834a2cd5efba08)
* [**Terrestrial + Marine WDPA raw**](https://eowilson.maps.arcgis.com/home/item.html?id=17659b62323646b8ae622680dab49952)
* [**Places for a Half-Earth Future raw**](https://eowilson.maps.arcgis.com/home/item.html?id=358f2419c967453195ec72e4d910fd6e)

#### 2. **Biodiversity CRFs**
There is one biodiversity data cube per terrestrial taxa (in the future there will also be marine taxa: fish and mammals).

The crfs are stored in an Azure bucket owned by MOL. The connection is already established inside the Virtual Machine Viz2. To be able to access the data in the Azure bucket, the file `YaleFinal.acs` (in Documents > ArcGIS > Projects) has to be added to any new ArcGIS Pro project via the `Insert` tab in the top menu, `+Connection`, `Add Cloud Storage Connection`.

![](/public/precalc_cloud_connection.png)

Inside the Azure bucket, in the folder `species`, we can find all the crfs created. Beware that not all of them are useful. The "good" crfs have been created in Equal Area Projection.

All the terrestrial taxa have a resolution of 1km x 1km, so we can assume that every pixel represents 1 km2 for all calculations.

* amphibians: `amphibians_equal_area_20211003.crf`
* birds:`birds_equal_area_20211003.crf`
* mammals:`mammals_equal_area_20211003.crf`
* reptiles:`reptiles_equal_area_20211003.crf`

#### 3. **Contextual layers CRFs**
The contextual layers are also stored in the Azure bucket. Currently there is only terrestrial contextual data.
* Land cover and climate regime: `ELU.crf`
* Population: `population2020.crf`
* Land encroachment: `land_encroachment.crf` (Deprecated!)

**Note:** In 2023, the land encroachment crf was substituted by new human pressure layers (see AOI_Summaries entry for more information). The new crfs are:
* Agriculture: `Agriculture_TimeSeries_Reclassify_20230501.crf`
* Extraction: `Extraction_TimeSeries_Reclassify_20230501.crf`
* Transportation: `Transportation_TimeSeries_Reclassify_20230515.crf`
* Human intrusion: `HumanIntrusion_TimeSeries_Reclassify_20230501.crf`
* Builtup: `Builtup_TimeSeries_Reclassify_20230501.crf`


### Data processing:
This is the summary of the general steps that we need to follow to precalculate data:

1. Create table of precalculated data:
- Precalculate Biodiversity data in ArcGIS Pro (explained in more detail below)
- Precalculate Contextual data in ArcGIS Pro (explained in more detail below)
- Merge in Python: the biodiversity data needs to be stored in a particular format to be used by the front-end, so this process needs to be carried out in Python using the following notebooks.

   1. **Original notebook**.  This [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_AOI_tables.ipynb) was originally used for gadm0 and gadm1. However, the method used here is not efficient, especially when dealing with large databases like the WDPAs. Therefore, the next precalculations were done following a more efficient method, and gadm0 and gadm1 were also rerun using the new script to solve errores detected in the previous precalculations. **This process is therefore deprecated**

   2. **Efficient method**. The new method was used in different notebooks, one for each of the layers with precalculated data:
   * [WDPA](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_WDPA_SPS.ipynb)
   * [Future Places](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_Future_Places_SPS.ipynb)
   * [Specific Regions](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_SpecificRegions_SPS.ipynb)
   * [National boundaries](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_gadm0_SPS.ipynb)
   * [Subnational boundaries](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_gadm1_SPS.ipynb)


2. Table of protected areas by country
For each of these layers, except in the case of the WDPAs, a table with the protected areas that intersect each geometry needs to be provided separately. To identify the WDPAs that fall within each polygon, we can either perform a spatial join between the geometries we are precalculating the data for and the WDPA layer in ArcGIS Pro or use Python. The [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/main/WDPA_gadm1.ipynb) provides an example of how to do this.

**NOTE:** In ArcGIS Pro (Viz2 VM), the history tab of the project `SpecificRegions` shows all the steps followed to calculate both biodiversity and contextual data, as well as to generate the table of protected areas for those geometries.


#### **Steps to precalculate biodiversity data in ArcGIS Pro:**
There are two example projects for this in Viz2 VM that show the input and output data of this process and the steps followed (history tab). ArcGIS Pro Projects: `gadm0_amphibians_sample_20211003` and `gadm1_reptiles_sample_20211003` show a examples for gadm0 and gadm1 respectively.

Basically, the steps to follow are the following:

 1. **Sample**: Use the Sample tool with the feature layer (geometry) against each species crf. Process as multidimensional and use `MOL_ID` as unique identifier. Select the statistic `SUM`. If the geometries are too big (such a country or a regions), the sample tool might fail. Thus, it's necessary to break the geometries in smaller pieces, using the `Subdivide Polygon` tool.
![](/public/precalc_sample.png)

2. **Table to Table**: To keep only the values where the species field is above 0
![](/public/precalc_table_to_table.png)
![](/public/precalc_output_table.png)

3. **Summary Statistics**: Sum together all the values that match `MOL_ID` and `SliceNumber`. This step is only needed when the geometries have been subdivided (gadm0, specific regions...).
![](/public/precalc_summary_stats.png)
![](/public/precalc_output_summary.png)

4. **Table to Table**: Export the results. Change the extension (.csv) and the location of the file (to the folder instead of the database) to be able to access it later. It can be sent via email or uploaded to AGOL. The files can also be uploaded to AGOL directly from the VM.
![](/public/precalc_export_csv.png)

#### **Steps precalculate contextual data:**
In this case we are using models created with Model Builder to process the data. The models are available in the ArcGIS Pro Project `Contextual_precalculations`. For more clarity, the toolbox in the project `SpecifiRegions` provides a better understanding of the models that we used for the contextual precalculations. The models used can be accessed from the Catalog panel, Toolboxes > Contextual_precalculations.tbx.
As in the biodiversity precalculations, we need to input two parameters: a feature layer containing the geometries and a crf with the contextual data (population, land encroachment, climate regime).

To get the contextual data, we perform Zonal Statistics to get the summary values of each crf inside each geometry. The field `MOL_ID` identifies each unique geometry. Once we have the output tables of each type of data, we export them as csvs and process them in python using any of the notebooks that follow the [efficient method](https://github.com/Vizzuality/he-scratchfolder/blob/master/SpecificRegions_Precalculation.ipynb) mentioned above.


The models used in the contextual precalculations are:

| **Variable**| **Model Name** | **Input 1** |**Input 2**| **Output** | **Lookup table** |
|--|--|--|--|--|--|
|Land Encroachment|`LandEncroachmentMOLIDjoin`| feature layer with geometries (gadm0, gadm1, wdpa...)|`land_encroachment.crf`|`ZonalSt_LE_MOLID`|[encroachment lookup](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer)|
|Population|`ZstatSumMOLID`|feature layer with geometries (gadm0, gadm1 or wdpa)|`population2020.crf`|`ZonaSt_sum_pop`|none|
|Climate regime and Land cover|`ZstatMajorityMOLID`|feature layer with geometries (gadm0, gadm1 or wdpa)|`ELU.crf`|`ZonalSt_Majority_ELU`|[elu lookup](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer)|
|WDPA percentage|`WDPA_percentage`|feature layer with geometries (gadm0, gadm1 or wdpa)|`WDPA_Terrestrial_CEA_June2021.crf`|`wdpa_percentage`|none|

**Note:** Some of these changed during the AOI updates to incorporate new human pressure data (see AOI_Summaries)

#### **Steps to process Protected Areas table:**
Each precalculated area should have a table that shows all the protected areas present in that area. They are given to the frontend as separate tables. For instance, the national boundaries ([gadm 0](https://eowilson.maps.arcgis.com/home/item.html?id=628b6c66992d4216972dccbe75d95c67)) and subnational boundaries ([gadm 1](https://eowilson.maps.arcgis.com/home/item.html?id=5cf6f76156e2470a825bafa329b7d388)) tables provide an example of the kind of table we need to create. The data can be processed using the code in this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/main/WDPA_gadm1.ipynb) or directly in ArcGIS online using the `WDPA_Percentage` model (as in the `SpecificRegions` project) or a spatial join.
![](/public/precalc_All_protected_areas.png)

## Special considerations when precalculating data: **the lookup tables**
Because the species data cannot be shared publicly, the precalculated data generated in the steps described above only contain a special type of ID called SliceNumber. Each SliceNumber is related to a unique species. MOL generates a series of lookup tables (one for each taxa) from where it is possible to retrieve information of the species using their SliceNumber. The fields available in these tables are: Name, SliceNumber, scientific_name, range_area_km2, wdpa_km2, percent_protected, conservation_target, is_flagship, conservation_concern, has_image, common_name.

**NOTE:**
   1. Lookup tables are created by MOL and should only be manipulated (updated, deleted etc.) by them.
   2. Lookup tables need to be published in AGOL as Hosted Tables, so the front end can use them (not csv format).
   3. Because these tables contain private information, Vizzuality needs to perform a [whitelisting process](https://vizzuality.github.io/half-earth-v3/_docs/science/whitelisting)using this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/update_whitelisted_urls.ipynb).

Currently, there are 4 lookup tables in AGOL:
* [amphibians](https://eowilson.maps.arcgis.com/home/item.html?id=de2309ec6aa64223a8bea682c0200d34) 
* [birds](https://eowilson.maps.arcgis.com/home/item.html?id=b5f5c8d693b74abd9b0d236915d8e739) 
* [mammals](https://eowilson.maps.arcgis.com/home/item.html?id=1d3b50e3b8544730ae0e2a80f00b4119) 
* [reptiles](https://eowilson.maps.arcgis.com/home/item.html?id=bc6de8b9b8df4fffb6aa4208f4bf1467) 


## Examples of precalculations:

### **20 Places for a Half-Earth future: detailed explanation**
In this section we provide a summary of how the data for the Places for the HE Future was precalculated. The Project in ArcGIS Pro: `Places_HE_Future`.

1. Access the data from AGOL and download into ArcGIS Pro as a shapefile (the [current layer](https://eowilson.maps.arcgis.com/home/item.html?id=4848c6b08fac4fa5bff40e9331b6d291) is not final and will most probably change, but the processing steps will be the same)
2. Convert shapefile to geojson with the tool Feature to json. This will allow uploading the file in AGOL as a geojson instead of a shapefile (shapefiles have character limitations that will truncate the string that will be created later)
3. Add a numeric field named `MOL_ID`. Using the Calculate Field tool give a unique number to each geometry, starting from 1 to n features. Make sure the type is set to `Long`.
4. For Biodiversity data:
  - Add the taxa crf to the Current Map from the Catalog (the Azure connection should be added previously as explained above in the section `Biodiversity CRFs`)
  - Run Sample the same way as with the Precalculated AOIs
  - Run Table to Table to keep only the values > 0
  - Run Table to Table to export a csv
  **NOTE** There were 4 geometries in this layer  (MOL_IDs = 62, 69, 73, 194) that caused the ArcGIS Pro tools to fail (for unkown reasons) when calculating the biodiversity data. They were removed from the analysis.
5. For Contextual data
  - Load Contextual Data Models from the toolbox
  - Load from Azure connection:
    - ELU.crf
    - land_encroachment.crf
    - population.crf
    - WDPA_Terrestrial_CEA_June2021.crf
  - Add the WDPA_Mercator layer (only terrestrial) (in the Catalog panel, Add to Database: ArcGIS > Projects > Contextual precalculations.gdb and select the layer `WDPA_Mercator`)
6. Format and merge data in python ([notebook for HE Places](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_Future_Places_SPS.ipynb)). Export file as geojson and upload it in AGOL. Remember to create a [whitelisted service](https://eowilson.maps.arcgis.com/home/item.html?id=5bffd154b48f4723976c46d87f8f6e2a) from the original layer. 
7. For Protected Areas data
   - In ArcGIS Pro perform a spatial join between the layer containing the original geometries of the [WDPAs](https://eowilson.maps.arcgis.com/home/item.html?id=abfea4a91726464baca51a07ac2cd486) and the geometries for the [Places for a Half-Earth Future](https://eowilson.maps.arcgis.com/home/item.html?id=4848c6b08fac4fa5bff40e9331b6d291). (Remember to remove those 4 geometries that caused errors).
   - Create a csv with only the relevant fields (exclude geometry) using the Table to Table tool.
   - Upload the table in AGOL as a [hosted table](https://eowilson.maps.arcgis.com/home/item.html?id=cf64e2655d2140d79b597ba0aa9f6332). The resulting table contains only WDPAs that intersect the geometries for the 20 places for Half-Earth Future.

### **Specific Regions: detailed explanation**
Project in ArcGIS Pro: `SpecificRegions`
1. Download the required geometries:
   * [Mississippi River Basin](https://www.sciencebase.gov/catalog/item/55de04d5e4b0518e354dfcf8)
   * [Driftless Area Restoration Effort](https://www.sciencebase.gov/catalog/item/52274d4ce4b01904cf5a81e0)
2. Merge them on the same dataframe and add a new field called `MOL_ID` to identify each geometry.
3. Calculate biodiversity data:
  - Add the four taxa crf to the Current Map from the Catalog (the Azure connection should be added previously as explained above in the section `Biodiversity CRFs`)
  - Run Sample the same way as with the Precalculated AOIs
  - Run Table to Table to keep only the values > 0
  - Run Table to Table to export a csv
4. Calculate contextual data
  - Load Contextual Data Models from the toolbox
      - Load from Azure connection:
         - ELU.crf
         - land_encroachment.crf
         - population.crf
         - WDPA_Terrestrial_CEA_June2021.crf
      - Add the WDPA_Mercator layer (only terrestrial) (in the Catalog panel, Add to Database: ArcGIS > Projects > Contextual precalculations.gdb and select the layer `WDPA_Mercator`)
   - Use the 4 models available in the SpecificRegions toolbox to generate the corresponding contextual tables.
6. Import the biodiversity and contextual data (except for the table containing the WDPA intersecting each geometry) and format them in python with the ([notebook for Specific Regions](https://github.com/Vizzuality/he-scratchfolder/blob/master/SpecificRegions_Precalculation.ipynb)).
7. Export file as geojson and upload it in AGOL. Remember to create a whitelisted service for this layer.[This layer](https://eowilson.maps.arcgis.com/home/item.html?id=49fdcffd842f4b8a8b1a919ba843a932) contains both the geometries and the precalculated data. 
7. Upload the WDPA table generated in AGOL as a [hosted table](https://eowilson.maps.arcgis.com/home/item.html?id=5af0af4ae1974c00b778689b486b8803). The resulting table contains only WDPAs that intersect the geometries for the 20 places for Half-Earth Future.
