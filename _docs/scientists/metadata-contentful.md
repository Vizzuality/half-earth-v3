---
layout: default
title: Metadata to Contentful
parent: Scientists 🧑‍🔬
permalink: /_docs/science/metadata-contentful
---

# Importing and updating metadata from AGOL to Contentful

## Context
Until August-September 2022, the metadata displayed on the Half-Earth Map was stored in two hosted tables in ArcGIS Online: 

* [metadata_staging](https://eowilson.maps.arcgis.com/home/item.html?id=ef369a73779d4a37b2252808afef98a7) &rarr; for the metadata shown on the demo site (staging).
* [metadata_prod](https://eowilson.maps.arcgis.com/home/item.html?id=cab2acd857a34e2faef1f60a9d40e354) &rarr; for metadata shown on the Half-Earth Map APP (production). 

Every time we needed to add new metadata, this was first added in the `metadata_staging` table for testing. Once we were sure everything worked as expected, the table `metadata_prod` was updated following the process described in [this section](https://vizzuality.github.io/half-earth-v3/_docs/science/metadata-service) of the documentation. 

This process had advantages. The metadata used in production was always the final version and we had `metadata_staging` to test and use as a backup. However, during the translation of the Half-Earth Map into French, Portuguese and Spanish, we found out that it was very difficult, if not impossible, to directly translate information hosted in ArcGIS Online. As is, hosted tables cannot be directly imported in Transifex, which is the translation service we use for most of the platform. Moreover, as the metadata table is updated frequently during the developing phase of the Half-Earth App, we needed to ensure easy and direct access to metadata information for translators. Thus, we needed to redefine the way we manage the metadata.

## New workflow

Under these circumstances, we decided to change the metadata workflow and store the metadata used in production in [Contentful](https://www.contentful.com/), a cloud-based headless content management system (CMS) designed for helping businesses and organizations to upload, organize, manage and distribute content (text, images, or video). The Half-Earth Map already uses Contentful to manage the data shown on the [Discover Stories](https://map.half-earthproject.org/featuredGlobe) section, which also need to be translated. Thus, since the translators will need to have access to our content stored in Contentful, it makes sense to migrate the metadata there as well. That way, all translations will be done through Transifex and Contentful, and we will avoid having to give access to our ArcGIS Online account to people outside of our organization. As for the tables hosted in AGOL, we decided to keep the `metadata_staging` table as backup. Thus, all new metadata will first be saved in this hosted table, and then sent to Contentful to for translation and display on the Half-Earth Map. Also, new metadata will be easily included in Contentful running a notebook hosted in AGOL called [Metadata_updates_Contentful](https://eowilson.maps.arcgis.com/home/notebook/notebook.html?id=4789ac26c6134727827236421c73fd39). This notebook can be scheduled to run regularly or it can be run whenever new data is added to the metadata hosted table.

Section 2 of this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_to_contentful.ipynb) contains the code needed to export the `metadata_staging` table and import it in Contentful. This process only needs to be done once. Then, section 3 includes the code used to create the hosted notebook [Metadata_updates_Contentful](https://eowilson.maps.arcgis.com/home/notebook/notebook.html?id=4789ac26c6134727827236421c73fd39) to update Contentful every time new metadata is added to the backup table. 

### Requirements
To migrate data from ArcGIS Online to Contentful we use both the ESRI and the Contentful API, so we will need:

* ESRI credentials
* Contentful credentials to login
* Contenful space name (there is only in space in our Contentful account)
* Contentful content delivery token &rarr; In the Contentful platform under Settings/API Keys you will find the current tokens. For this, we have been using `Half-Earth 2 - Science`, which is a content delivery token, a token that can only be used for read-only queries. 
* Content management token &rarr; To be able to create new entries using the API the content delivery token is not enough, we need a content management token. That can be get under the **Content management tokens** tab, clicking on *Generate personal token*. Once the token appears, it needs to be copied and saved because, once the window is closed, it won't be possible to see it again.

Below, you will find a description of the steps followed to (1) migrate the metadata from the hosted table into Contentful and (2) update the metadata in Contentful when new entries are added on the hosted table. 


## 1. Migrating metadata into Contentful

### 1.1 Create a new content model in Contentful
The first thing we need to do is to create a `Content model` in Contentful that contains the name and type of the fields we have in our table. For that, we need to:
* [Login](https://be.contentful.com/login) to Contentful and go to the Half-Earth space
* Go to **Content model** (top menu) and click on *Add content type*. &rarr; For the metadata we have created a content type called `Metadata_prod`
* Add fields clicking on the *Add field* bottom and choosing the desired type (long/short text, number etc.) 
* Click on Save to save the new fields

### 1.2 Pull data from ArcGIS hosted table and send it to Contentful
Now, we need to pull all the information stored in `metadata_staging` and send it to Contentful. Each row in the table will be a new entry in Contentful. We have managed to automate this process in this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_to_contentful.ipynb) using the ESRI and the Contentful APIs. Note that each row in the table must match the corresponding field in the content model we created in Contentful. Hence the importance of correctly defining the field types. 

Now all the metadata currently stored in the `metadata_staging` hosted table is in Contentful, stored in a model called `Metadata_prod`. The migrating process only needs to be done once.


## 2. Updating the Metadata_prod content type
Once the content type is created, it can be updated manually on the Contentful website, or automatically using the section 3 of this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_to_contentful.ipynb) or running the [Metadata_updates_Contentful](https://eowilson.maps.arcgis.com/home/notebook/notebook.html?id=4789ac26c6134727827236421c73fd39) notebook hosted in AGOL. The translators, for instance, will manually add new entries to this content type to create, for each default entry (in English), new entries for the different languages. The new metadata, on the other hand, could be added automatically, as it will be saved first in `metadata_staging`, a table hosted in ArcGIS Online that we will use as a backup.

The recommended workflow to add new metadata is the following:

### 2.1. Add the new metadata in hosted table

The first step would be to add the new information, in English, in [metadata_staging](https://eowilson.maps.arcgis.com/home/item.html?id=ef369a73779d4a37b2252808afef98a7). The recommended process to avoid dramatic errors would be:
* Create a backup of the table `metadata_staging`. You can keep it in AGOL as *metadata_staging_backup_dateofbackup*
* Download the table as .csv 
* Write the new metadata in the next available row, following exactly the same structure as the other rows. Note that the layerSlug field makes reference to the name the front-end will use to call the layer so, please, create an easy but recognizable name and make sure it is unique. Also, make sure all columns have their corresponding names, otherwise the entire column will be empty after the upload. 
* Overwrite the existing hosted table using the new .csv. 
* Check that the hosted table has all the desired data in the right format before going to the next step. If something seems off, use the backup table generated at the beginning of this process to go back to the previous version. 

### 2.2. Run the hosted notebook 

Now, run the notebook [Metadata_updates_Contentful](https://eowilson.maps.arcgis.com/home/notebook/notebook.html?id=4789ac26c6134727827236421c73fd39). Note that this notebook can be scheduled to run automatically, if needed. 

### 3. Entries for translations
For the translations, new entries have to be made manually in Contentful, using the same name followed by _es, _pt, _fr, according to the language of the translation. 