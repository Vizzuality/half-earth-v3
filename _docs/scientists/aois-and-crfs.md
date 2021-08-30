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

# Building a tool to publish 
Set names of the parameters so they legible by the Front End, inside model builder rename the parameters (right click on the ovals). 
Use `calculate value` as much as possible, Python is quicker than adding extra geoprocessing tools. 

It is key to have set up the `parallel processing` to `80%`. 

# How to publish a geoprocessing service in several easy steps (and a good portion of patience).
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

# Particularities of certain tools within the Model Builder working with CRFs
## `Sample`
This is a super powerful tool. Its power lays on the fact that it is the first tool developed to deal with multidimensional data. Our testing showed that the time of processing increases as the area of interest increases. To use it in the portal server it was necessary to provide a new field to the polygon that had an integer. 

![](/public/unique_field.png)

## `Zonal Statistics as Table`
Our testing showed that the time of processing increased as the number of slices increased, not the area of interest. 

## Rasterizing a polygon and getting the area (`Polygon to Raster`)
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

## Filtering a table using SQL
To obtain only the necessary rows, we have used `Table Select`. This tool uses an SQL expression that is built using `Calculate value` and python codeblock.

### Example 1: Getting the top 20% most prevalent species
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

### Example 2: Getting only the rows with presence
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
- [ ] [Get percentage presence of species](https://hepportal.arcgis.com/server/rest/services/sampleUniqueSelectCalculate/GPServer/sampleUniqueSelectCalculate){:target="_blank"} It needs to be joined with a table in arcgis online
- [ ] [Get percentage of protection](https://hepportal.arcgis.com/server/rest/services/paPercentage/GPServer/paPercentage){:target="_blank"}
- [ ] [Get most prevalent climate regime and land cover](https://hepportal.arcgis.com/server/rest/services/Simple_Zonal_Stats_boolean/GPServer/ZonalStats){:target="_blank"} It needs to be joined with a table in arcgis online.
- [ ] [Get percentage of land human encroachment](){:target="_blank"}