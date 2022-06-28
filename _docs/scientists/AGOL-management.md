---
layout: default
title: AGOL management
parent: Scientists 🧑‍🔬
permalink: /_docs/science/agol-management
---
# ArcGIS Online Management
Here you will find useful guidance to interact with ArcGIS Online (AGOL) using the API and Jupyter notebooks.
## Update hosted table
Sometimes it is necessary to include new fields in a table that is already published in AGOL, or modify them. In [this notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/UpdateHostedTable.ipynb) there are some examples that will guide you through this. The most important thing here is to have an *.env* file with the credentials to connect to AGOL (username and password).
Overall, the logic is as follows:
1. Get the table that is currently published in AGOL as a sdf using the function `getHTfromID`. To do so, we need the ID of the layer we want to call (in the url of the layer get digits after *id=*).
2. Create new fields in the sdf or modify them as needed. For instance, the examples in the jupyter notebook use information from another table to update the sdf fields.
3. To add the new fields or the modified fields to the table hosted in AGOL the notebook contains different functions and commands to:
* call the AGOL layer and retrieve the hosted table
* introduce the new fields in the hosted table
* update features in the AGOL table

Now, you should be able to see the new fields added to the AGOL table.

## Upload hosted table
There are two different ways to upload a table into ArcGIS Online:
1. Directly in AGOL:
* in *Content* tab select *New item* (upper left corner) and  upload the new table (in .csv format).
* choose to add your table as a hosted feature layer or table if you want it to be published. With second option (add the .csv only) the table can be shared and downloaded but it cannot be used as a service
* select the fields you want to add or keep all of them
* in the dropdown menu set location as *None*
* select a name that is not already in use in AGOL
* once the table has been published, set sharing level as *public*
2. Using AGOL API with Python:
* for this option it will be necessary to have an *.env* file with credentials (username and password) to connect to AGOL
* at the end of [this notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/WDPA_gadm1.ipynb) there is an example of how to publish a feature layer using Python. The function `publishCSVasFS` allow us to publish both tables and feature layers, just make sure you set the argument `table` as 'yes' if you want to publish a .csv, or as 'no' if you are publishing a feature layer. You can also decide in which folder within AGOL you want to save the new table with the argument `aol_folder_name`, and change the sharing level.

## Duplicate services
Using notebooks to update hosted feature services might be quicker, but it can be dangerous, especially when we are modifying/overwriting a layer or table that is in production. For this reason, before doing any real changes, we should first test the new notebook on duplicated services, to make sure that is doing what is was supposed to do. The notebook [duplicate_services](https://github.com/Vizzuality/he-scratchfolder/blob/master/duplicate_services.ipynb) provides an example of how to clone services that are hosted in ArcGIS Online. Once we are sure that is safe to use the notebook and that no unintentioned results are generated, we could run it using the real services. Nevertheless, before updating or overwriting layers or tables, it is a good practice to save a copy of the service as a backup. That way, if something fails, we can always get back to the previous version. This is particularly important for production services, since any failures or errors on the layer/table will be immediately reflected on the Half-Earth map. 