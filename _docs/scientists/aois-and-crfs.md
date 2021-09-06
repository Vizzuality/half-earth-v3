---
layout: default
title: AOIs and CRFs
parent: Scientists 🧑‍🔬
permalink: /_docs/science/aois-crfs
---

# Existing documents
- [Basecamp thread](https://basecamp.com/1756858/projects/13899003/messages/93850769){:target="_blank"} with videos.
- [Rapid summaries report](https://docs.google.com/document/d/1ndUZfxKBKqpFgUymfge8JKyEcJu3r1IbsVCUQnjnWec/edit){:target="_blank"}: you will find some tricks to build the models of model builder, also a test of performance.
- [CRF creation and storage](https://docs.google.com/document/d/1H6VaYnBHhPD3mDfCVnfwh6t22tPFffmjyej1OAjgddk/edit){:target="_blank"}: the process to build a crf is in this document.

**IMPORTANT NOTE**
This documentation has been written using the ArcGIS Pro version `2.6.4` and the Portal version `10.8.1`. 

# Creating a crf `WIP`
Check the document of [CRF creation and storage](https://docs.google.com/document/d/1H6VaYnBHhPD3mDfCVnfwh6t22tPFffmjyej1OAjgddk/edit){:target="_blank"} for detailed steps. The most critical step is `Build multidimensional info`, this is because it has to be clear what are the `variables` and what are the `dimensions`. After creating a new field in the attribute table of the Mosaic dataset, use the following input as guide. This example is how the encroachment datacube has been created. 

##### 1. The geoprocessing parameters
**IMPORTANT NOTE:** Be aware that when you check the ran geoprocess in the history, automatically, the information in `Variable Field` changes to the new `Variable` field. Always check the python snippet to see what has been done.  
```Python
arcpy.md.BuildMultidimensionalInfo("land_encroachment", "Variable_new", "SliceNumber # #", "ghm # #")
```

![](/public/multidimensional_info_parameters.png)

##### 2. Then the multidimensional info properties of the Mosaic dataset should look like this:

![](/public/multidimensional_info_properties.png)

##### 3. And finally the changes in the table of attributes that shows the multidimensional information

![](/public/multidimensional_info_table.png)

# Building a tool to publish a _webtool_
Set names of the parameters so they are legible by the Front End, inside model builder rename the parameters (right click on the ovals). 
Use `calculate value` as much as possible, Python is quicker than adding extra geoprocessing tools. 

It is key to have set up the `parallel processing` to `80%`. 

## How to publish a geoprocessing service in several easy steps (and a good portion of patience).
1. run the geoprocessing model against the whole crf
2. create a small subset of the crf using `Subset Multidimensional raster`, set the environment setting of extent to "current Display"
3. run the geoprocessing against the subset crf
4. if the geoprocessing is not in model builder already, drag it from the history into a new model
5. Set the parameters by right clicking on them: (1) input polygon/points, (2) crf and (3) output (A letter P appears on them).
6. For the output right click and enable "add to dispay"
7. Save the model, close it and run it as a geoprocessing tool using a subset of the crf. Select `80%` for parallel processing. 
8. From the History, right click on the ran model and share as a web tool (make sure you are logged into the Portal, otherwise the option won't appear)
9. In the configuration panel increase the maximum number to 100000 records. **This is very important** to avoid no returning a response to the front end. 
10. In the content panel configure the tool properties (this is the tricky part)
11. Set the polygon to `determined by user`
11. Set the crf as choice list, make sure only the subset crf is selected. This is so only the minimum amount of data is copied, but also so there aren't several elements in the choice list. 
12. Add the description to the different parameters
13. Analyse before publishing to check which parameters or info is missing on the description of the tool
14. cross your fingers

## Particularities of certain tools within the Model Builder working with CRFs
### `Sample`
This is a super powerful tool. Its power lays on the fact that it is the first tool developed to deal with multidimensional data. Our testing showed that the time of processing increases as the area of interest increases. To use it in the portal server it was necessary to provide a new field to the polygon that had an integer. 

![](/public/unique_field.png)

### `Zonal Statistics as Table`
Our testing showed that the time of processing increased as the number of slices increased, not the area of interest. 

### Rasterizing a polygon and getting the area (`Polygon to Raster`)
When rasterizing a polygon for the purpose of calculating proportions it is key that the cell size is the same as the input crf. In this case, opposite to `Sample`, the field that worked well was `OBJECTID`. In the ArcGIS Pro version we were working, the raster created did not have an attribute table. Within Model Builder we got the number of pixels using `Calculate Value` and the following Python codeblock:
`getAreaRaster(r"%custom_raster%")` 
**It is key to use the right double quotes.**
```Python
import arcpy
import numpy
def getAreaRaster(rst):
    arr = arcpy.da.TableToNumPyArray(rst, "COUNT")
    a,= arr.tolist()[0]
    return a 
```
`%custom_raster%` refers to the output from `Polygon to Raster`. The `%` uses ESRI's in-line variable scripting. 

### Filtering a table using SQL
To obtain only the necessary rows, we have used `Table Select`. This tool uses an SQL expression that is built using `Calculate value` and python codeblock.

#### Example 1: Getting the top 20% most prevalent species
`getTopRows(r"%table_in%")`
```Python
import arcpy
import numpy as np
def getTopRows(table, prop = 0.2 ):
    arr = arcpy.da.TableToNumPyArray(table,['SliceNumber',"COUNT"])
    n = int(round(prop * len(arr), 0))
    sort_arr = np.sort(arr, order = "COUNT",)[0:n]
    arr_lit = sort_arr['SliceNumber'].tolist()
    arr_int = map(int, arr_lit)
    res = ', '.join(map(str, arr_int))  
    out = f"SliceNumber IN ({res})"
    return out
```

#### Example 2: Getting only the rows with presence
`getPresentSpecies(r"%table_in%")`
```Python
import arcpy
import numpy as np
def getPresentSpecies(table):
    arr = arcpy.da.TableToNumPyArray(table,["SliceNumber","presence"])
    out_arr = arr[arr["presence"]>0]
    arr_lit = out_arr["SliceNumber"].tolist()
    arr_int = map(int, arr_lit)
    res = ', '.join(map(str, arr_int))  
    out = f"SliceNumber IN ({res})"
    return out
```

# About the limit of records returned
If you forget to set a high limit for the records returned, the front end might inform of this limit. In the object `w` returned, check `value.exceededTransferLimit`. 

# Current geoprocessing services in use `WIP`
- [Get percentage presence of species](https://hepportal.arcgis.com/server/rest/services/sampleUniqueSelectCalculate/GPServer/sampleUniqueSelectCalculate){:target="_blank"} It needs to be joined with a table in arcgis online. For each taxa there will be a datacube
- [Get percentage of protection](https://hepportal.arcgis.com/server/rest/services/paPercentage/GPServer/paPercentage){:target="_blank"}. The crf will be updated once the WDPA version is established, currently it is `clean_wdpa_april.crf` 
- [Get most prevalent climate regime and land cover](https://hepportal.arcgis.com/server/rest/services/Simple_Zonal_Stats_boolean/GPServer/ZonalStats){:target="_blank"}. It needs to be joined with a table in [arcgis online.](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer){:target="_blank"} The name of the crf is `ELU.crf`. 
- [Get percentage of land human encroachment](https://hepportal.arcgis.com/server/rest/services/LandEncroachmentPercentage/GPServer/LandEncroachmentPercentage){:target="_blank"} the crf name is `land_encroachment.crf`. The lookup table is in [arcgis online](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/land_encroachment_lookup/FeatureServer){:target="_blank"} .
- [Get population in area](https://hepportal.arcgis.com/server/rest/services/Simple_Zonal_Stats_boolean/GPServer/ZonalStats){:target="_blank"}. Field with information: `SUM`




| **Front end element** | **Crf name** | **Gp service** | **Field to use from response** | **AGOL table to use** | **AGOL field to use** |
|--|--|--|--|--|--|
| population | population2020.crf | [GP ZsatSum](https://hepportal.arcgis.com/server/rest/services/ZsatSum/GPServer/ZsatSum)|`SUM` | _none_   | _none_ |
| climate_regime | ELU.crf| [GP ZsatMajority](https://hepportal.arcgis.com/server/rest/services/ZsatMajority/GPServer/ZsatMajority)| `MAJORITY` | [item](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer) |  |
| land_cover | ELU.crf | [GP ZsatMajority](https://hepportal.arcgis.com/server/rest/services/ZsatMajority/GPServer/ZsatMajority)| `MAJORITY`  | [item](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer) |  |
| Protection_percentage | clean_wdpa_april.crf |   [GP paPercentage](https://hepportal.arcgis.com/server/rest/services/paPercentage/GPServer/paPercentage) | `Percentage_protected` |_none_  |_none_ |
| biodiversity_data | mammals_for_greta.crf | [GP sampleUniqueSelectCalculate](https://hepportal.arcgis.com/server/rest/services/sampleUniqueSelectCalculateParallel/GPServer/sampleUniqueSelectCalculate) | Get length of the array. `SliceNumber` has the code of the species. `Percentage_presence` has the value of percent. |TBD  | `SliceNumber`, `species_name`, `species_target`, `species_global_range`, `global_percent_protected` |
|Human_encroachment|land_encroachment.crf|[GP LandEncroachmentPercentage](https://hepportal.arcgis.com/server/rest/services/LandEncroachmentPercentage/GPServer/LandEncroachmentPercentage)|`SliceNumber` has the code of the type of human activity. `percentage_land_encroachment`|[item](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/land_encroachment_lookup/FeatureServer)|`SliceNumber` to join and then `Name`|



#### geoprocessing services as javascript
```JavaScript
export const SUM_VALUE_SERVICE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/ZsatSum/GPServer/ZsatSum',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const MAJORITY_VALUE_SERVICE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/ZsatMajority/GPServer/ZsatMajority',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const PROTECTED_PERCENTAGE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/paPercentage/GPServer/paPercentage',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const LAND_ENCROACHMENT_PERCENTAGE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/LandEncroachmentPercentage/GPServer/LandEncroachmentPercentage',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const BIODIVERSITY_SAMPLE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/sampleUniqueSelectCalculateParallel/GPServer/sampleUniqueSelectCalculate',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  uniqueFieldID: 'unique_id_field',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
} 

export const CRF_NAMES = {
  HUMMINGBIRDS: 'hummingbirds_binary', // Should use BIODIVERSITY_SAMPLE_CONFIG
  MAMMALS: 'mammals_for_greta', // Should use BIODIVERSITY_SAMPLE_CONFIG
  ECOLOGICAL_LAND_UNITS: 'ELU', // Should use MAJORITY_VALUE_SERVICE_CONFIG
  POPULATION: 'population2020', // SUM_VALUE_SERVICE_CONFIG
  PROTECTED_AREAS: 'clean_wdpa_april' // PROTECTED_PERCENTAGE_CONFIG
}
```