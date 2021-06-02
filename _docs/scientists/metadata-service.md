---
layout: default
title: Metadata service
parent: Scientists 🧑‍🔬
permalink: /_docs/science/metadata-service
---

# Metadata service 

The metadata from the info buttons is controlled from a service in arcgis online ([item url](https://eowilson.maps.arcgis.com/home/item.html?id=d899a4364fe5431b8c5bef826ad4430d#data) and [service url](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Metadata2/FeatureServer)). The service can be updated through the arcgis interface or through the python api. 
## create new entries
Ask the Front End for the `slug` they will be using to refer to the layer. Then you will provide the information for each field: slug, title (text), description (text), source (markdown text), mol Logo (boolean).
### if using the python api (currently not working, probably because there are new fields created... Should move this information to a table service)
use the [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_publishing.ipynb) with the code to access the service (you will need appropriate admin permissions):
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
