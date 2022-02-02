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
4. From the History, right click on the model that has just been run and `Share as a Web tool` (make sure you are logged into the Production Portal, look at the top right, otherwise the option won't appear).
![](/public/GP_publish_Share_As.png)

5. In the **General Panel**: 
   1. Name the model as ModelName`Prod`
   2. Add the model to the Production folder
   3. Click on `Copy all data`
   4. Click on `Share with Everyone`
![](/public/GP_publish_General.png)
1. In the **Configuration panel**:
   1. Change the `Message level` to `Info` (this will give more details in case of an error). 
   2. Increase the `Maximum number of records returned by server` to 100000. **This is very important** to avoid not returning a response to the front end. 
![](/public/GP_publish_Configuration.png)
7. In the **Content panel** configure the tool properties (click on the pencil on the right)
    - Set the geometry to `User defined value`
![](/public/GP_publish_Content_geometry.png)
    - Set the crf as `Choice list`, make sure only the subset crf is selected by clicking on `Only use default layers`. _This is so only the minimum amount of data is copied, but also so there aren't several elements in the choice list._
![](/public/GP_publish_Content_crf.png)
    - Add the description to the different parameters
8. Unclick the option: `Add optional output Feature Service Parameter`(we are not using this).
9.  Analyse before publishing to check which parameters or info is missing on the description of the tool. Sometimes analyse has to be run a couple of times without having to change anything between analyses. There will always be a warning message saying that the data will be copied to the Portal, that is expected and ok.
10.  Click on `Publish` 🚀

### The Url to the geoprocessing service
Once you have succeeded with the publication of a webtool, it appears in the `Portal` section of the Catalogue Panel. When hovering over the tool the url to the item in the Portal appears. Follow the url and it takes you to the Portal in the Web (You can also log in directly to the Portal with your credentials, go to Content and find the tool you want to check). The "look and feel"" of the portal is identical to ArcGIS online. Protect the tool from deletion and update to Public the sharing options in the settings. Then, in the Overview panel, on the bottom right you will find the url of the service. Click to View the tool in a new window. 

![](/public/tool-url.png)

On this new window click on `Tasks`. The url that appears in the search bar is the one that the front end must use. The url should look like this: `https://heportal.esri.com/server/rest/services/<Tool name>/GPServer/<task name>`.

Another way to get the URL is to click on the tool, and on the Overview panel Under Tools click on `Service URL`, this will take you directly to the Tasks View and you have the URL on the top.

### Test Geoprocessing Services from the Portal
In order to check that the GP service is working correctly before passing the URL to the FE, we can simulate the call that the FE would make in the ArcGIS REST API.
* Log in to the Production Portal (https://heportal.esri.com/portal/home) with the required credentials
* Go to Content > Production folder > choose a GP service
* Click on Service URL
![](/public/GP_test_url.png)
* Go to bottom of page and click on `Submit Job`
* Depending on the GP service, you will have to provide information to a different number of boxes, but for sure you will have to provide a `geometry` and at least one path to a crf (the Biodiversity GP services only require the input of the taxa crf, while the Contextual data GP services will need the input of more crfs). The default values that appear in the boxes represent the data that was used to publish the service, aka they are a very small subset of the data and if you test with a geometry that is outside of that area you will get an error.
![](/public/GP_test_Submit_default.png)
  - **geometry**: the geometry needs to have a very specific format. The structure passed is a json that can be obtained by using the tool `Features To Json` in ArcGIS Pro: make sure the output path is set outside of the gdb so it can be accessed easily, and tick the boxes for `Formatted JSON` and `Include Z values`
![](/public/GP_test_FeaturesToJson.png) 
This is an example of the geometry you need to add to the box:
```json
 {
  "displayFieldName" : "",
  "hasZ" : true,
  "fieldAliases" : {
    "OBJECTID" : "OBJECTID",
    "Name" : "Name",
    "Text" : "Text",
    "IntegerValue" : "Integer Value",
    "DoubleValue" : "Double Value",
    "DateTime" : "Date Time",
    "Shape_Length" : "Shape_Length",
    "Shape_Area" : "Shape_Area"
  },
  "geometryType" : "esriGeometryPolygon",
  "spatialReference" : {
    "wkid" : 102100,
    "latestWkid" : 3857
  },
  "fields" : [
    {
      "name" : "OBJECTID",
      "type" : "esriFieldTypeOID",
      "alias" : "OBJECTID"
    },
    {
      "name" : "Name",
      "type" : "esriFieldTypeString",
      "alias" : "Name",
      "length" : 255
    },
    {
      "name" : "Text",
      "type" : "esriFieldTypeString",
      "alias" : "Text",
      "length" : 255
    },
    {
      "name" : "IntegerValue",
      "type" : "esriFieldTypeInteger",
      "alias" : "Integer Value"
    },
    {
      "name" : "DoubleValue",
      "type" : "esriFieldTypeDouble",
      "alias" : "Double Value"
    },
    {
      "name" : "DateTime",
      "type" : "esriFieldTypeDate",
      "alias" : "Date Time",
      "length" : 8
    },
    {
      "name" : "Shape_Length",
      "type" : "esriFieldTypeDouble",
      "alias" : "Shape_Length"
    },
    {
      "name" : "Shape_Area",
      "type" : "esriFieldTypeDouble",
      "alias" : "Shape_Area"
    }
  ],
  "features" : [
    {
      "attributes" : {
        "OBJECTID" : 1,
        "Name" : null,
        "Text" : null,
        "IntegerValue" : null,
        "DoubleValue" : null,
        "DateTime" : null,
        "Shape_Length" : 231978.71016606738,
        "Shape_Area" : 3338690868.7937865
      },
      "geometry" : {
        "hasZ" : true,
        "rings" : [
          [
            [
              -818493.72899999842,
              5383774.996100001,
              0
            ],
            [
              -755549.04740000144,
              5382225.2217999995,
              0
            ],
            [
              -756854.20630000159,
              5329215.6889000013,
              0
            ],
            [
              -819798.88789999858,
              5330765.4632999972,
              0
            ],
            [
              -818493.72899999842,
              5383774.996100001,
              0
            ]
          ]
        ]
      }
    }
  ]
}
```
- **crfs**: Substitute with the name of the final crf with the complete path to the Azure bucket

* Click on `Submit Job (POST)`. Then, click on `Check Job details` to see how the processing is going.
![](/public/GP_test_CheckDetails.png)
* Click several times on until the processing is done and you see the output tables. You can click on those tables to see the results as a JSON.
![](/public/GP_test_output.png)


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
| population | population2020.crf |_none_| [GP ContextualLayersProd20220131](https://heportal.esri.com/server/rest/services/ContextualLayersProd20220131/GPServer/ContextualLayersProd)|output_table_population|`SUM` | _none_   | _none_ |
| climate_regime | ELU.crf|_none_| [GP ContextualLayersProd20220131](https://heportal.esri.com/server/rest/services/ContextualLayersProd20220131/GPServer/ContextualLayersProd)|output_table_elu_majority |`MAJORITY` | [agol link](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer) | `cr_type` contains the name of the type of climate regime |
| land_cover | ELU.crf|_none_| [GP ContextualLayersProd20220131](https://heportal.esri.com/server/rest/services/ContextualLayersProd20220131/GPServer/ContextualLayersProd)|output_table_elu_majority |`MAJORITY` | [agol link](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ecosytem_categories_lookup/FeatureServer) | `lc_type` contains the name of the type of land cover |
| human_encroachment | land_encroachment.crf |_none_| [GP ContextualLayersProd20220131](https://heportal.esri.com/server/rest/services/ContextualLayersProd20220131/GPServer/ContextualLayersProd)|output_table_encroachment| `SliceNumber` has the code of the type of human activity, `percentage_land_encroachment` gives percentage of each type|[agol link](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/land_encroachment_lookup/FeatureServer)|`SliceNumber` to join and then `Name`|
| Protection_percentage | WDPA_Terrestrial_CEA_June2021.crf | _none_|  [GP ContextualLayersProd20220131](https://heportal.esri.com/server/rest/services/ContextualLayersProd/GPServer/ContextualLayersProd) |output_table_wdpa_percentage| percentage_protected |_none_  |_none_ |
| WDPA list | _none_ | _none_|  [GP ContextualLayersProd](https://heportal.esri.com/server/rest/services/ContextualLayersProd20220131/GPServer/ContextualLayersProd) |output_table_wdpa| `ORIG_NA,DESIG_T,IUCN_CA,GOV_TYP,AREA_KM,NAME_0` |[agol link](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_OECM_June2021_WDPAID_table/FeatureServer) non whitelisted yet|`WDPA_PID` |
| mammal_data | mammals_equal_area_20211003.crf | `presence` |[GP SampleMamProd20220131](https://heportal.esri.com/server/rest/services/SampleMamProd20220131/GPServer/SampleMamProdRange) | output_table| `SliceNumber` has the code of the species; `per_global` shows the area relative to the global species range; `per_aoi` shows the % area present inside the aoi. |[FS lookup table](https://eowilson.maps.arcgis.com/home/item.html?id=84d3c71caf97479d85f620a4ee217d68)[Whitelisted table](https://utility.arcgis.com/usrsvcs/servers/bc206ff519234e4ab1e9dab1c8c1f601/rest/services/Mammal_CRF_species_table_service/FeatureServer)| `SliceNumber`,  `scientific_name`, `percent_protected`,`conservation_target`,`has_image`,`common_name` |
| amphibian_data | amphibians_equal_area_20211003.crf |`amphibians`| [GP SampleAmphProd20220131](https://heportal.esri.com/server/rest/services/SampleAmphProd20220131/GPServer/SampleAmphProdRange) | output_table| `SliceNumber` has the code of the species; `per_global` shows the area relative to the global species range; `per_aoi` shows the % area present inside the aoi. |[FS lookup table](https://eowilson.maps.arcgis.com/home/item.html?id=a641a4cd269345dea93b8bcb1cb66676)[Whitelisted table](https://utility.arcgis.com/usrsvcs/servers/0e80ea09e22f4efaa242854a568d0b18/rest/services/Amphibian_CRF_species_table_service/FeatureServer)| `SliceNumber`,  `scientific_name`, `percent_protected`,`conservation_target`,`has_image`,`common_name` |
| bird_data | birds_equal_area_20211003.crf | `birds`|[GP SampleBirdsProd20220131](https://heportal.esri.com/server/rest/services/SampleBirdsProd20220131/GPServer/SampleBirdsProdRange ) | output_table| `SliceNumber` has the code of the species; `per_global` shows the area relative to the global species range; `per_aoi` shows the % area present inside the aoi. |[FS lookup table](https://eowilson.maps.arcgis.com/home/item.html?id=4d8698734b654bb9bb7a61d9af314c76)[Whitelisted table](https://utility.arcgis.com/usrsvcs/servers/d7a4020431dc4ce0b425f33d7cd344c8/rest/services/Bird_CRF_species_table_service/FeatureServer)| `SliceNumber`,  `scientific_name`, `percent_protected`,`conservation_target`,`has_image`,`common_name` |
| reptile_data | reptiles_equal_area_20211003.crf | `reptiles`|[GP SampleReptProd20220131](https://heportal.esri.com/server/rest/services/SampleReptProd20220131/GPServer/SampleReptProdRange ) | output_table| `SliceNumber` has the code of the species; `per_global` shows the area relative to the global species range; `per_aoi` shows the % area present inside the aoi. |[FS lookup table](https://eowilson.maps.arcgis.com/home/item.html?id=81c72a2a5ee6413699960b4c4bd9540f)[Whitelisted table](https://utility.arcgis.com/usrsvcs/servers/e2587fabd9a74981bd8e0d8cd24ca37a/rest/services/Reptile_CRF_species_table_service/FeatureServer)| `SliceNumber`,  `scientific_name`, `percent_protected`,`conservation_target`,`has_image`,`common_name` |


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

The AOIs created by users can be shared with an url. When the urls is created, the data is also sent to an AGOL table where the data is stored. When the recepient uses the url, the same data will be displayed without having to call the GP service. Currently, this is the [Service being tested](https://eowilson.maps.arcgis.com/home/item.html?id=26aca70f8b8247aea489decdee1fe537), but there are previous versions in the folder #2 aois ([aoi-historic](https://eowilson.maps.arcgis.com/home/item.html?id=62059a44e8dc4b1abb2d704cae91eb77) and [aoi-historic-dev](https://eowilson.maps.arcgis.com/home/item.html?id=ac362edf17cb4c90a15507511e2b9444))

## Notebooks in ArcGIS online
ArcGIS online allows to run jupyter notebooks. There are different kinds, some cost credits, but for small tasks they are included. Users need to be provided the permissions to use the Notebooks. Once a notebook is saved as an item in the organisation it is possible to schedule tasks. Check [ESRI's documentation](https://doc.arcgis.com/en/arcgis-online/create-maps/prepare-a-notebook-for-automated-execution.htm) on how to schedule tasks.
## Cleaning the historic AOIs service

[The notebook](https://eowilson.maps.arcgis.com/home/item.html?id=fa923e5d0ddd48779327fdeffc395d53#overview) saved in the organisation is ready to be activated and start the cleaning every first of the month. A version for reference can be found in the [he-scratchfolder](https://github.com/Vizzuality/he-scratchfolder/blob/master/Clean_AOI_historic_service.ipynb). The important variable to check is the limit number of features that the service shoud have: `feature_limit`. 