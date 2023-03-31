---
layout: default
title: AOI summaries
parent: Scientists 🧑‍🔬
permalink: /_docs/science/aoi-summaries
---

# AOI richer summaries

## Context
The AOI section of the Half-Earth Map provides species and contextual data for custom geometries in two different ways: On-The-Fly analysis and Precalculations. In this document, we provide information about the second iteration of AOIs, created during the implementation of the "AOI Richer Summaries" (March 2023). But because these updated AOI also include some information generated in the previous iteration, we also provide links to documentation written during the implementation of the first version of the AOI (2021). Be aware that some of that previous documentation might be deprecated. Still, we consider it to be useful if/when the entire process needs to be carried out again.


- On-The-Fly (OTF) analysis: 

The data for user-defined geometries is calculated OTF, using Geoprocessing Services that are published in the [ArcGIS Enterprise Portal](https://heportal.esri.com/portal/home). These webtools are called directly from the Half-Earth Application to extract the biodiversity (related to species) and contextual data that is displayed on the platform. 

The section [AOIs and CRFs](https://vizzuality.github.io/half-earth-v3/_docs/science/aois-crfs) of this documentation provides more information about how these services are created, including links to the current webtools (published in March 2023) and information about the previous services (published in 2021 and no longer active). 

The python code used to generate the first version of the Geoprocessing services can be found in the `he-scratchfolder` [repo](https://github.com/Vizzuality/he-scratchfolder/tree/master/ModelBuilderGPs). Also, the lookup tables used in the first process were created with this [notebook](https://eowilson.maps.arcgis.com/home/item.html?id=ea3b17b950114b909a62c5a791cfe539).


- Precalculated data: 

OTF analysis is not efficient for geometries over 35,000 sq. kilometers. For that reason, we have precalculated data for some relevant geometries that are too big or complex to use the GP services. That is the case of `countries`, `subnational boundaries`, `protected areas`, `places for the Half-Earth future` and some `specific regions`. 

The process followed to precalculate data for the first iteration of the AOIs is described in the section [Precalculated data](https://vizzuality.github.io/half-earth-v3/_docs/science/precalculated-data). Although it is very likely that some of the tables generated during the first iteration of the AOI are no longer available in AGOL (deprecated layers must be periodically removed), the explanations provided here might be useful for future iterations of the precalculated AOIs.
   

## AOI Richer Summaries
The AOI Richer Summaries were implemented in March 2023 to offer users some visualization improvements and add new calculations to the section "Analyze Areas" of the Half-Earth Map. The new AOIs still use most of the data generated in 2021 during the first iteration of the AOIs, but we have included some updates. The following sections describe the changes and processes carried out during the implementation of this second iteration of the AOIs.

### **On-The-Fly (OTF) calculations**

The new Geoprocessing services in charge of the OTF calculations are much more complex than they were before, especially those that extract the biodiversity data. This is because the AOI richer summaries include additional calculations, such as the SPS and the link to Half-Earth goal, that require the use of additional tools. For that reason, the new biodiversity GP services are considerably more time-consuming than they were before. The model for contextual data has also increased in complexity with the incorporation of five new human pressure layers containing time series. 

Furthermore, all the new GP services incorporate a new step to ensure that these calculations are only made for the terrestrial parts of the custom AOI. Thus, when a user defines a geometry that intersects both land and ocean, the new webtools operate only with the terrestrial portion of the area of interest. 

#### **- Biodiversity GP Services**

The new biodiversity GP services were created in ArcGIS Pro (Project AOI_summaries in the Virtual Machine Viz2) and published on the [Half-Earth Portal](https://heportal.esri.com/portal/home/content.html?view=grid&sortOrder=desc&sortField=modified#organization). The following table provides links to the current services, as well as some information about the CRF used and the output fields needed by the FE to display biodiversity information on the platform:

| **GP Service** | **Crf name** | **Output table** | **Fields** |
|--|--|--|--|
|[AmphibiansProd_SPS](https://heportal.esri.com/portal/home/item.html?id=7063ab2d8bc9477bb72f640f2c3b4108)|amphibians_equal_area_20211003.crf|output_table|`SliceNumber`: code of the species; `per_global`: portion of global range in the AOI; `SPS_global`: SPS of the species globally; `SPS_aoi`: SPS of the species in the AOI; `meet_target`: species meeting conservation targets if AOI is protected; `SPS_increase`: species increasing SPS is AOI is protected.|
|[BirdsProd_SPS](https://heportal.esri.com/portal/home/item.html?id=13c50ba2eca34926bd7fad29942d3d43)|birds_equal_area_20211003.crf|output_table|`SliceNumber`: code of the species; `per_global`: portion of global range in the AOI; `SPS_global`: SPS of the species globally; `SPS_aoi`: SPS of the species in the AOI; `meet_target`: species meeting conservation targets if AOI is protected; `SPS_increase`: species increasing SPS is AOI is protected.|
|[MammalsProd_SPS](https://heportal.esri.com/portal/home/item.html?id=7a2b896ed91d47f8975df88650316273)|mammals_equal_area_20211003.crf|output_table|`SliceNumber`: code of the species; `per_global`: portion of global range in the AOI; `SPS_global`: SPS of the species globally; `SPS_aoi`: SPS of the species in the AOI; `meet_target`: species meeting conservation targets if AOI is protected; `SPS_increase`: species increasing SPS is AOI is protected.|
|[ReptilesProd_SPS](https://heportal.esri.com/portal/home/item.html?id=a5c9ec0b277d432b8d6ed99ed6925c65)|reptiles_equal_area_20211003.crf|output_table|`SliceNumber`: code of the species; `per_global`: portion of global range in the AOI; `SPS_global`: SPS of the species globally; `SPS_aoi`: SPS of the species in the AOI; `meet_target`: species meeting conservation targets if AOI is protected; `SPS_increase`: species increasing SPS is AOI is protected.|

The new calculations included in these biodiversity are:

**1. Species Protection Score (SPS):** 
For each species, the AOI richer summaries provide information about the Species Protection Score, or SPS. Specifically, they include both the Global SPS (SPS_global), and the Area SPS (SPS_aoi). 

- The **global SPS** of each species is retrieved from the species lookup tables: 

    * [amphibians](https://eowilson.maps.arcgis.com/home/item.html?id=de2309ec6aa64223a8bea682c0200d34) 
    * [birds](https://eowilson.maps.arcgis.com/home/item.html?id=b5f5c8d693b74abd9b0d236915d8e739) 
    * [mammals](https://eowilson.maps.arcgis.com/home/item.html?id=1d3b50e3b8544730ae0e2a80f00b4119) 
    * [reptiles](https://eowilson.maps.arcgis.com/home/item.html?id=bc6de8b9b8df4fffb6aa4208f4bf1467) 

This field was calculated according to the equation:

`SPS = (((wdpa_km2/range_area_km2)*100)/conservation_target)*100`, 

where _wdpa km2_ refers to the total global area of refined range currently protected (derived from June 2021 WDPA), _range area km2_ is the total global area of refined range, and _conservation target_ is the percent of global refined range needing protection.

- The **Area SPS** refers to the SPS value for that specific AOI. The calculation is done directly by the GP service, using both information retrieved from the lookup tables and data extracted by the model tools for that specific AOI. The equation used to calculate the SPS_aoi field is the following:

`SPS_aoi = ((range_species_protected_aoi/range_species_aoi)*100/conservation_target)*100`, 

where _range species protected aoi_ refers to the range of the species in the AOI that that is currently under protection, _range species aoi_ refers to the range of the species in the AOI, and _conservation target_ is the percent of global range needing protection. 

**2. Link to the Half-Earth goal:**

For custom AOIs (only those calculated OTF), we include a message estimating how much the chosen AOI would contribute to the Half-Earth goal if its entire extent was protected. This calculation is done by the GP services and, depending on the results, the platform will display one of these two sentences:

* _“Protecting the appropriate habitats in this area would help satisfy the conservation targets of X species, representing X% of species found here.”_

This is related to the field called `meet_target`, found on the output table generated by the webtool. It refers to the number of species that would meet their conservation targets if the entire AOI was protected. To get that information, the GP service follows these steps:

1. Calculates the unprotected terrestrial area of the AOI 
2. Adds the resulting area to the column *wdpa_km2* (lookup table), which estimates the area of protection of that species
3. Recalculates the values on the column *percent_protected* as `new_percent_protected = (new_wdpa_km2/range_area_km2)*100`
4. Calculates an hypothetical *new_SPS* using the *new_percent_protected* `new_SPS = (new_percent_protected/conservation_target)*100`, with a max value of 100
5. Gives a value of **1 (True)** to those species that would meet their conservation targets if the entire AOI was protected (*SPS* <100 but *new SPS* = 100), and **0 (False)** to those that do not meet this condition.  

If the hypothetical protection of the entire AOI does not help any species reach their conservation target (i.e., *meet_target* equals 0 for all species in the AOI), the first sentece is replaced by the next one:

* _“Protecting the appropriate habitats in this area would improve the Species Protection Score of X species, moving them closer to their conservation target.”_

This is related to the field `SPS_increase` given in the output table, and it refers to the number of species that would improve their SPS if the entire AOI was protected. For that, the GP service compares the *new SPS* with the global SPS score stored in the lookup table (*SPS* field). Species with *new SPS* > *SPS* are given a value of **1 (True)**, or **0 (False)** if the condition is not met.

#### **- Contextual GP Service**

The AOI also include some contextual data:

- Population
- Climate regime
- Land cover
- Percentage of protection
- Protected areas
- **Human pressures**

The only difference with the first iteration of AOI regarding contextual data is the substitution of the previous land encroachment layers (irrigated agriculture, rainfed agriculture, rangeland and urban) for new human pressure layers (human intrusion, urban and built-up, agriculture, transportation and energy and extractive resources). These new layers have a higher resolution and incorporate a time series.

There is only one GP service in charge of extracting all the contextual information. It was created in the ArcGIS Pro project (AOI_contextual in Virtual Machine) and published on the Half-Earth Portal as [Contextual_Prod](https://heportal.esri.com/portal/home/item.html?id=584cc9c81e644bd9a39273b3213f2c16). The next table summarizes the inputs and outputs related to this webtool.

| **Crf name** | **Output table** | **Fields needed by FE** |
|--|--|--|
|population.crf|table_out_population|`SUM`|
|ELU.crf|table_out_elu_majority|`MAJORITY`|
|WDPA_Terrestrial_CEA_June2021.crf|output_table_wdpa_percentage|`percentage_protectd`|
|wdpa_Mercator layer (derived from WDPA_Terrestrial_CEA_June2021.crf) included within model|output_table_wdpa|`NAME, ORIG_NA, DESIG, DESIG_E,DESIG_T,IUCN_CA,GOV_TYP,STATUS, STATUS_, AREA_KM,NAME_0`|
|Agriculture_TimeSeries_Reclassify.crf|agriculture_series|`percentage_land_encroachment`|
|Extraction_TimeSeries_V2_Reclassify.crf|extraction_series|`percentage_land_encroachment`|
|Transportation_TimeSeries_V2_Reclassify.crf|transportation_series|`percentage_land_encroachment`|
|HumanIntrusion_TimeSeries_V3_Reclassify.crf|intrusion_series|`percentage_land_encroachment`|
|Builtup_TimeSeries_Reclassify.crf|builtup_series|`percentage_land_encroachment`|


### **Precalculated data**

Because some common AOIs are too big to be calculated by the Geoprocessing Service, we have generated new precalculated data for:

* [Countries](https://eowilson.maps.arcgis.com/home/item.html?id=367688be94be472eb53db8ef043716dc)
* [Regions](https://eowilson.maps.arcgis.com/home/item.html?id=04b9635566a74890a38d28acf3e23d04)
* [WDPA](https://eowilson.maps.arcgis.com/home/item.html?id=b0445839687d4169aaf173be07e04a7a)
* [Future places](https://eowilson.maps.arcgis.com/home/item.html?id=dbc8abcd3ab24729ade182c167b909c9)
* [Specific regions](https://eowilson.maps.arcgis.com/home/item.html?id=36133b1a141a4d54ad4af13e29185fa5)

Except in the case of the WDPAs, these AOI groups also have another layer showing the list of WDPA that intersect each of the geometries contained in these layers:
* [Countries](https://eowilson.maps.arcgis.com/home/item.html?id=628b6c66992d4216972dccbe75d95c67)
* [Regions](https://eowilson.maps.arcgis.com/home/item.html?id=5cf6f76156e2470a825bafa329b7d388)
* [Future places](https://eowilson.maps.arcgis.com/home/item.html?id=cf64e2655d2140d79b597ba0aa9f6332)
* [Specific regions](https://eowilson.maps.arcgis.com/home/item.html?id=5af0af4ae1974c00b778689b486b8803)

General details on how the precalculated data was generated are compiled in the section of the documentation called [Precalculated data](https://vizzuality.github.io/half-earth-v3/_docs/science/precalculated-data). Although some of the links and tables might be deprecated, the descriptions provided there might still be useful, as most of the precalculated data used in the AOI richer summaries comes from the first iteration. 

As with the OTF analysis, the new data incorporated in the precalculations is related to the SPS and the new human pressure layers. The only difference is that we do not include the link to the Half-Earth goal on the precalculations. The project called AOI_Summaries_Precalculations, stored in Viz2 (Vizzuality's Virtual Machine), was used to collect all data data needed to carry out the new calculations, which were done in the following notebooks:

* [Countries](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_gadm0_SPS.ipynb)
* [Regions](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_gadm1_SPS.ipynb)
* [WDPA](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_WDPA_SPS.ipynb)
* [Future places](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_Future_Places_SPS.ipynb)
* [Specific regions](https://github.com/Vizzuality/he-scratchfolder/blob/master/Precalculated_SpecificRegions_SPS.ipynb)

**- SPS:** Similar to the OTF calculations, the global SPS of each species is retrieved directly from the field `SPS` stored in the species lookup tables listed in the previous section. The SPS specific for the AOI, on the other hand, is calculated in the jupyter notebooks using species data extracted in the ArcPro project `AOI_summaries_precalculations` for the protected areas of each AOI. 

**- Human pressures:** Data from the new human pressure layers, which include a time series, is also extracted for each of the precalculated AOIs in the ArcPro Project `AOI_summaries_precalculations`, and formated in the corresponding notebooks. 

**Note:** although these new layers have a large coverage, we are only considering pixels classified as *high human pressure* in our calculations. The threshold for high human pressures is 0.4 for all human pressures except extraction, for which is 0.2. For this reason, about half of the WDPA have no human pressure data, as they do not intersect any pixels above those thresholds. However, there are geometries in the WDPA and Future places layers that should have human pressure values but they retrieved none. This is due to the malfunctioning of one of the tools used in ArcPro, probably due to rasterization problems when dealing with very small or very complex geometries. Although these cases are not common, in future iterations of the AOI we should try to identify the reason why the tool is failing and retrieve data for those geometries.


