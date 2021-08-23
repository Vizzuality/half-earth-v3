---
layout: default
title: Metadata service
parent: Scientists 🧑‍🔬
permalink: /_docs/science/metadata-service
---

# Metadata service 

The metadata from the info buttons in the *production site* is controlled from a service in arcgis online ([item url](https://eowilson.maps.arcgis.com/home/item.html?id=d899a4364fe5431b8c5bef826ad4430d#data){:target="_blank"} and [service url](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Metadata2/FeatureServer){:target="_blank"}). The service can be updated through the arcgis interface or through the python api. 

The notebook explaining how the service was created the first time and a procedure to update the values inside is available in [he-scratchfolder](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_publishing.ipynb). The workflow to update the values implicates an overwriting of the service, therefore it is a bit risky to use.

## production vs development metadata services
The front end code is set so the [production site](https://map.half-earthproject.org/) uses the arcgis online item: `Metadata2`. Meanwhile, any development site uses the `metadata_dev` table service ([arcgis item](https://eowilson.maps.arcgis.com/home/item.html?id=ebbbbd1129cf40b1bdb99602a9e9e310)). When there is an update of the production site the `Metadata2` service needs to be updated. Currently this is done manually, but there is a [notebook](https://eowilson.maps.arcgis.com/home/item.html?id=9223a0f0de834fcf963e5e48cc607f26) that could do this process. 

## create new entries
Ask the Front End for the `slug` they will be using to refer to the layer. Then you will provide the information for each field: slug, title (text), description (text), source (markdown text), mol Logo (boolean).
### if using the python api (currently not working, probably because there are new fields created... Should move this information to a table service)
use the [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_publishing.ipynb){:target="_blank"} with the code to access the service (you will need appropriate admin permissions):
- access the service
- download the information as csv
- in an editor provide the information for each field: slug, title (text), description (text), source (markdown text), mol Logo (boolean).
- merge the new information to the downloaded csv
- overwrite the service with the complete csv


### if using the arcgis online IDE
Use the append data button and select a file with the new rows. 
## edit existing entries
### if using the python api
Same as above but with the updated csv, no need to merge new rows. 
### if using the arcgis online IDE
Open the data view and manually edit. **ATTENTION** there is not an undo button.
