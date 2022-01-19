---
layout: default
title: AOIs and CRFs
parent: Scientists 🧑‍🔬
permalink: /_docs/science/aois-crfs
---
# Areas of Interest driven by Cloud Raster Format and webtools in the ESRI portal
## Existing documents
- [Basecamp thread](https://basecamp.com/1756858/projects/13899003/messages/93850769){:target="_blank"} with videos.
- [Rapid summaries report](https://docs.google.com/document/d/1ndUZfxKBKqpFgUymfge8JKyEcJu3r1IbsVCUQnjnWec/edit){:target="_blank"}: you will find some tricks to build the models of model builder, also a test of performance.
- [CRF creation and storage](https://docs.google.com/document/d/1H6VaYnBHhPD3mDfCVnfwh6t22tPFffmjyej1OAjgddk/edit){:target="_blank"}: the process to build a crf is in this document.
- [Creating a model with Model Builder](https://docs.google.com/document/d/1H6VaYnBHhPD3mDfCVnfwh6t22tPFffmjyej1OAjgddk/edit){:target="_blank"}: at the bottom of this document a description of creating a geoprocessing service with Model Builder.

**IMPORTANT NOTE**
This documentation has been written using the ArcGIS Pro version `2.8.3` and the ArcGIS Enterprise Portal version `10.9 (Release May 2021)`. 

# Creating a crf
Check the document of [CRF creation and storage](https://docs.google.com/document/d/1H6VaYnBHhPD3mDfCVnfwh6t22tPFffmjyej1OAjgddk/edit){:target="_blank"} for detailed steps. Before starting, make sure you are NOT building pyramids. This can add hours to the processing. Your Pro may be set to do this automatically. You can turn it off in Options (Access by clicking on the `Project` tab in the top left corner). If you don't want to make the change through the Options, you can simply make sure that you unclick the `Build pyramids` option when running a geoprocessing service.

![](/public/option-pyramids.jpg)

The summary of geoprocessing steps followed are:

* **Create mosaic dataset** (creates a container inside the geodatabase to hold the rasters )
* **Add rasters to mosaic dataset** (Add rasters to the container)
* **Calculate Field** (Create a unique id field)
* **Build multidimensional Info** (Add Dimension and Variable information)
* **Table to table** (Optional) (Create a lookup table to match the unique id and the raster name)
* **Copy raster** (Create the crf with all the previous information, this is the long step)
  
([This notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/arcpyNotebooks/Create_crf.ipynb) has the sequence of geoprocessing commands in python.)

Things to be aware of:
* The projection of the rasters and the crf should match. Set the projection in the `Environments` tab of the first step `Create mosaic dataset`(You can use one of the rasters as input of the Coordinate System. By default ArcGIS Pro uses Pseudo Mercator 3857)
* This is a multidimensional processing operation. Set the `Parallel processing` option to 90% in the `Environments` tab every time
* The most critical step is `Build multidimensional info`, this is because it has to be clear what are the `variables` and what are the `dimensions`. After creating a new field in the attribute table of the Mosaic dataset, use the following input as guide. This example is how the encroachment datacube has been created. 

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

# Where do the CRFs live?
They live in an Azure bucket in the cloud. They are managed using Microsoft Azure Storage Explorer. Check [this doc]((https://docs.google.com/document/d/1H6VaYnBHhPD3mDfCVnfwh6t22tPFffmjyej1OAjgddk/edit){:target="_blank"}) for specific details, section: `Storing crf files for the Half-Earth Project`.
## Accessing the CRFs from ArcGIS Pro
The Virtual machine  already has the `.acs` file that makes the connection. When a new project is created a connection is done via the ribbon. The `yaleCube.acs` file is located in `Documents/ArcGIS/Projects`


# **Building and publishing a _webtool_**
A Webtool is a geoprocessing tool that lives in the ArcGIS Enterprise Portal and can be called from the Half Earth Application to make calculations on the fly. The data shown when a user draws it's own area of interest relies completely on these tools.

The first step is to create a Model locally in ArcGIS Pro, and then publish it to the Portal.

## Create a Model in ArcGIS Pro
In the Catalogue, create a new model (Model Builder) in the project's Toolbox. 
![](/public/new-model.png)

Once the model is ready, indicate which ovals are Parameters by right clicking on them (a small `P` appears). Set their names so they are legible by the Front End, inside model builder rename the parameters (right click on the ovals). Currently we are using: `geometry`, `crf_name` and `output_table`.

Use `calculate value` as much as possible (this is a Model Builder Utility tool), Python is quicker than adding extra geoprocessing tools. 

![](/public/model-builder-utilities.png)

Since we are using Multidimensional cubes, it is key to set up the `Parallel processing` to `90%` in any of the geoprocessing tools added to the model. 

**IMPORTANT NOTE:** Take into account the input and output coordinate reference systems. In this case, we are providing a Pseudo Mercator input (the geometry) and we are using it against an Equal Area projection (the crf). The geoprocessing tools automatically serve the output in the raster projection, without us having to manually add a re-projection step to change the crs of the geometry. However, it is a good practice to make explicit the CRS in the `Environments` tab of each of the geoprocessing tools.

## How to publish a geoprocessing service
These steps take into account that the Model (made with Model Builder) is done. 

1. Create a small polygon using the Sample tool (click on the pencil that shows up on the left of `Input location raster or features` and create a small polygon in an area of interest). In the Table of contents right click on the new polygon and click on `Zoom to Layer` to show only the polygon. 
2. Create a small subset of the crf using `Subset Multidimensional raster`, set the environment setting of `extent` to "current Display". _This is so a very small portion of the crf is copied in the portal. So, the smaller the extent, the better, but make sure it is larger than the extent to the polygon used for testing._
   
![](/public/subset-crf.png)

3. Run the model using the polygon and the subset crf as a geoprocessing tool (By clicking on the Model inside the Toolbox directly). Select `90%` for parallel processing.
4. From the History, right click on the ran model and share as a web tool (make sure you are logged into the Portal, look at the top right, otherwise the option won't appear).
![](/public/GP_publish_Share_As.png)

5. In the General Panel: name the model as ModelName`Prod`, add the model to the Production folder, click on Copy all data.
![](/public/GP_publish_General.png)
1. In the Configuration panel increase the maximum number to 100000 records. **This is very important** to avoid not returning a response to the front end. change the message level to `Info` (this will give more details in case of an error)
![](/public/GP_publish_Configuration.png)
7. In the Content panel configure the tool properties (click on the pencil on the right)
    - Set the polygon to `User defined value`
![](/public/GP_publish_Content_geometry.png)
    - Set the crf as `choice list`, make sure only the subset crf is selected. _This is so only the minimum amount of data is copied, but also so there aren't several elements in the choice list._
![](/public/GP_publish_Content_crf.png)
    - Add the description to the different parameters
1.  Analyse before publishing to check which parameters or info is missing on the description of the tool. Sometimes analyse has to be run a couple of times without having to change anything between analyses. There will always be a warning message syaing that the data will be copied to the Portal, that is expected and ok.
2.  Click on `Publish` 🚀

### The Url to the geoprocessing service
Once you have succeeded with the publication of a webtool, it appears in the `Portal` section of the Catalogue Panel. When hovering over the tool the url to the item in the Portal appears. Follow the url and it takes you to the Portal in the Web. The feel and look of the portal is identical to ArcGIS online. Protect the tool from deletion and update to public the sharing options in the settings. Then, in the overview, on the bottom right you will find the url of the service. Click to View the tool in a new window. 

![](/public/tool-url.png)

Click on the Task. The new url is the one that the front end must use. The url should look like this: `https://heportal.esri.com/server/rest/services/<Tool name>/GPServer/<task name>`.


## Particularities of certain tools within the Model Builder working with CRFs
**IMPORTANT NOTE**
This documentation has been written using the ArcGIS Pro version `2.6.4` and the Portal version `10.8.1`. 
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
This might be unecessary if used in `Select Table`. `Select Table` allows for a `WHERE` query. 

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

# Current geoprocessing services in use 

## Models from Model Builder as Python code
The process inside the Geoprocessing service can be found in the `he-scratchfolder` [repo](https://github.com/Vizzuality/he-scratchfolder/tree/master/ModelBuilderGPs).

## Creating the lookup tables
The process of creation of the tables consist on getting the slice number and matching name from the raster mosaic dataset and then merge using the scientific name with data from MOL. ([notebook](https://eowilson.maps.arcgis.com/home/item.html?id=ea3b17b950114b909a62c5a791cfe539)).


| **Front end element** | **Crf name** |**Crf variable**| **Gp service** | **Output to use** | **Field to use from response** | **AGOL table to use** | **AGOL field to use** |
|--|--|--|--|--|--|
| population | population2020.crf |_none_| [GP ContextualLayersProd](https://heportal.esri.com/server/rest/services/ContextualLayersProd/GPServer/ContextualLayersProd)|output_table_population|`SUM` | _none_   | _none_ |
| climate_regime | ELU.crf|_none_| [GP ContextualLayersProd](https://heportal.esri.com/server/rest/services/ContextualLayersProd/GPServer/ContextualLayersProd)|output_table_elu_majority |`MAJORITY` | [agol link](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer) | `cr_type` contains the name of the type of climate regime |
| land_cover | ELU.crf|_none_| [GP ContextualLayersProd](https://heportal.esri.com/server/rest/services/ContextualLayersProd/GPServer/ContextualLayersProd)|output_table_elu_majority |`MAJORITY` | [agol link](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer) | `lc_type` contains the name of the type of land cover |
| human_encroachment | land_encroachment.crf |_none_| [GP ContextualLayersProd](https://heportal.esri.com/server/rest/services/ContextualLayersProd/GPServer/ContextualLayersProd)|output_table_encroachment| `SliceNumber` has the code of the type of human activity. `percentage_land_encroachment`|[agol link](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/land_encroachment_lookup/FeatureServer)|`SliceNumber` to join and then `Name`|
| Protection_percentage | wdpa_oecm_zeros.crf | _none_|  [GP ContextualLayersProd](https://heportal.esri.com/server/rest/services/ContextualLayersProd/GPServer/ContextualLayersProd) |`!!!check table!!!`| `!!!check field!!!` |_none_  |_none_ |
| WDPA list | WDPA_Terrestrial_CEA_June2021.crf | _none_|  [GP ContextualLayersProd](https://heportal.esri.com/server/rest/services/ContextualLayersProd/GPServer/ContextualLayersProd) |output_table_wdpa| `!!!check field!!!` |[agol link](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_OECM_June2021_WDPAID_table/FeatureServer) non whitelisted yet|`WDPA_PID` |
| mammal_data | mammals_equal_area_20211003.crf | `presence` |[GP SampleMamProd](https://heportal.esri.com/server/rest/services/SampleMamProd/GPServer/SampleMam) | Get length of the array. `SliceNumber` has the code of the species. `Percentage_presence` has the value of percent. |[agol link](https://utility.arcgis.com/usrsvcs/servers/10063857c3d2447a8f149cd1b4554d3f/rest/services/mammals_merge_qa/FeatureServer)| `SliceNumber`,  `scientific_name`, `percent_protected`,`conservation_target`,`is_flagship` |
| amphibian_data | amphibians_equal_area_20211003.crf |`amphibians`| [GP SampleAmphProd](https://heportal.esri.com/server/rest/services/SampleAmphProd/GPServer/SampleAmphProd) | Get length of the array. `SliceNumber` has the code of the species. `Percentage_presence` has the value of percent. |[agol link](https://utility.arcgis.com/usrsvcs/servers/182fa83a03544cbd8bd88836d9dea895/rest/services/amphibians_merge_qa/FeatureServer)| `SliceNumber`,  `scientific_name`, `percent_protected`,`conservation_target`,`is_flagship` |
| bird_data | birds_equal_area_20211003.crf | `birds`|[GP SampleBirdsProd](https://heportal.esri.com/server/rest/services/SampleBirdsProd/GPServer/SampleBirds ) | Get length of the array. `SliceNumber` has the code of the species. `Percentage_presence` has the value of percent. |[agol link](https://utility.arcgis.com/usrsvcs/servers/4876d75b2ac94a068ec96c8f256e7e79/rest/services/birds_merge_qa/FeatureServer)| `SliceNumber`,  `scientific_name`, `percent_protected`,`conservation_target`,`is_flagship`  |
| reptile_data | reptiles_equal_area_20211003.crf | `reptiles`|[GP SampleReptProd](https://heportal.esri.com/server/rest/services/SampleReptProd/GPServer/SampleRept ) | Get length of the array. `SliceNumber` has the code of the species. `Percentage_presence` has the value of percent. |[agol link](https://utility.arcgis.com/usrsvcs/servers/ef12e99ccea24faca6d5597988c3fb82/rest/services/reptiles_merge_qa/FeatureServer)| `SliceNumber`,  `scientific_name`, `percent_protected`,`conservation_target`,`is_flagship`  |


### Source of data
Population: WorldPop 2020 - [web](https://www.worldpop.org/geodata/summary?id=24777)
World Terrestrial Ecosystem - [Living Atlas](https://eowilson.maps.arcgis.com/home/item.html?id=926a206393ec40a590d8caf29ae9a93e)

## Querying the AGOL tables
For those Geoprocessing services that require to query information from a table in ArcGIS Online, Arcade can be used to return the information ([more about Arcade in this docs](/_docs/science/arcade)).
The [`Filter`](https://developers.arcgis.com/arcade/function-reference/data_functions/#filter) function accepts an SQL expression and a layer. 

The structure of the SQL expression is composed of the name of the field to query (in our case `SliceNumber`), then the condition `IN` and between parenthesis all the ids of species returned by the geoprocessing service. 

``` javascript
var lay = $layer
var sqlExpr = 'SliceNumber IN (164, 250)'
var val = Filter(lay, sqlExpr)
return val
```

# Historic of AOIs and its maintenance
## Notebooks in ArcGIS online
ArcGIS online allows to run jupyter notebooks. There are different kinds, some cost credits, but for small tasks they are included. Users need to be provided the permissions to use the Notebooks. Once a notebook is saved as an item in the organisation it is possible to schedule tasks. Check [ESRI's documentation](https://doc.arcgis.com/en/arcgis-online/create-maps/prepare-a-notebook-for-automated-execution.htm) on how to schedule tasks.
## Cleaning the historic AOIs service
[The notebook](https://eowilson.maps.arcgis.com/home/item.html?id=fa923e5d0ddd48779327fdeffc395d53#overview) saved in the organisation is ready to be activated and start the cleaning every first of the month. A version for reference can be found in the [he-scratchfolder](https://github.com/Vizzuality/he-scratchfolder/blob/master/Clean_AOI_historic_service.ipynb). The important variable to check is the limit number of features that the service shoud have: `feature_limit`. 