---
layout: default
title: Metadata service
parent: Scientists 🧑‍🔬
permalink: /_docs/science/metadata-service
---

# Metadata service

The metadata from the info buttons in the *production site* is controlled from a service in arcgis online ([item url](https://eowilson.maps.arcgis.com/home/item.html?id=cab2acd857a34e2faef1f60a9d40e354#overview){:target="_blank"} and [service url](https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/metadata_prod/FeatureServer){:target="_blank"}). This service can be updated directly in ArcGIS Online or through the python API.

The notebook explaining how the service was created the first time and a procedure to update the values inside is available in [he-scratchfolder](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_publishing.ipynb). **Note that** the workflow to update the values implicates an overwriting of the service, therefore it is a bit risky to use.

## Production vs staging metadata services
The frontend code is set so the [production site](https://map.half-earthproject.org/) uses the arcgis online item: `metadata_prod`, while any development site uses the `metadata_staging` table service ([arcgis item](https://eowilson.maps.arcgis.com/home/item.html?id=ef369a73779d4a37b2252808afef98a7#overview)). When there is an update of the production site, the `metadata_prod` service needs to be updated. This can be done manually, but there is a [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/update_metadata_from_staging_to_production.ipynb) that can do this process in an easier and faster way.

## Create new entries
To create new entries in the `metadata_staging` table, we need to ask the frontend for the `slug` they will be using to refer to the layer. Then, we need to provide the information for each field: slug, title (text), description (text), source (markdown text), mol Logo (boolean). 

The new entries can be created:

* **Using the ArcGIS Online IDE**

Use the *append* data button and select a new file that contains only the new rows. Or use the *overwrite* bottom to upload a table that contains both the old and the new entries.

* **Using the Python API**

Use the [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_publishing.ipynb){:target="_blank"} with the code to access the service (you will need appropriate admin permissions). (Note: this is currently not working, probably because there are new fields created... Should move this information to a table service):
- access the service
- download the information as csv
- in an editor provide the information for each field: slug, title (text), description (text), source (markdown text), mol Logo (boolean).
- merge the new information to the downloaded csv
- overwrite the service with the complete csv

## Edit existing entries
* **Using the arcgis online IDE**

Open the data view and manually edit. **ATTENTION** there is not an undo button so any changes made there are permanent.

* **Using the Python API**

We can use notebooks to retrieve the tables and make changes. The notebook mentioned above could be used, considering only the updated csv, as there is no need to merge new rows.



