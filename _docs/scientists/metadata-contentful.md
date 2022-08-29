---
layout: default
title: Metadata to Contentful
parent: Scientists 🧑‍🔬
permalink: /_docs/science/metadata-contentful
---

# Importing and updating metadata from AGOL to Contentful

## Context
Until September 2022, the metadata displayed on the Half-Earth Map was stored in two hosted tables in ArcGIS Online: 

* [metadata_staging](https://eowilson.maps.arcgis.com/home/item.html?id=ef369a73779d4a37b2252808afef98a7) &rarr; for the metadata shown on the demo site (staging).
* [metadata_prod](https://eowilson.maps.arcgis.com/home/item.html?id=cab2acd857a34e2faef1f60a9d40e354) &rarr; for metadata shown on the Half-Earth Map APP (production). 

Every time we needed to add new metadata, this was first added in the `metadata_staging` table for testing. Once we were sure everything worked as expected and the new features were ready to be deployed into Production, the table `metadata_prod` was updated following the process described in [this section](https://vizzuality.github.io/half-earth-v3/_docs/science/metadata-service) of the documentation. 

This process had advantages: The metadata used in production was always the final version and we had `metadata_staging` to test and use as a backup. However, during the translation of the Half-Earth Map into French, Portuguese and Spanish, we found out that it was very difficult, if not impossible, to directly translate information hosted in ArcGIS Online. As is, hosted tables cannot be directly imported in Transifex, which is the translation service we use for most of the platform. Thus, we needed to redefine the way we managed the metadata.

## New workflow

Under these circumstances, we decided to change the metadata workflow and store the metadata used in production in [Contentful](https://www.contentful.com/), a cloud-based headless content management system (CMS) designed for helping businesses and organizations to upload, organize, manage and distribute content (text, images, or video). The Half-Earth Map already uses Contentful to manage the data shown on the [Discover Stories](https://map.half-earthproject.org/featuredGlobe) section, which also needs to be translated. Thus, since the translators (professional or in-house) will already need to have access to our content stored in Contentful, it just made sense to migrate the metadata there as well. That way, all translations will be done through Transifex and Contentful, and we will avoid having to give access to our ArcGIS Online account to people outside of our organization. 

As for the tables hosted in AGOL, we decided to keep the `metadata_staging` table as backup. Thus, all new metadata will first be saved in this hosted table, and then sent to Contentful for translation and display on the Half-Earth Map. 

The process to import metadata into Contenful is done in several steps:
1. All the data stored in `metadata_staging` is exported to Contentful.
2. New metadata is gradually included as new entries.
3. The metadata saved in Contentful is translated.

**Requirements**

To migrate data from ArcGIS Online to Contentful we use both the ESRI and the Contentful API, so we need:

* ESRI credentials
* Contentful credentials to login
* Contenful space name (there is only in space in our Contentful account)
* Contentful content delivery token &rarr; In the Contentful platform under Settings/API Keys you will find the current tokens. For this, we have been using `Half-Earth 2 - Science`, which is a content delivery token, a token that can only be used for read-only queries. 
* Content management token &rarr; To be able to create new entries using the API the content delivery token is not enough, we need a content management token. That can be get under the **Content management tokens** tab, clicking on *Generate personal token*. Once the token appears, it needs to be copied and saved because, once the window is closed, it won't be possible to see it again.


## 1. Migrating all metadata into Contentful

These are the steps needed to import all metadata saved in AGOL into Contentful. Note that **this process only needs to be done once!**

### 1.1 Create a new content model in Contentful
The first thing we need to do is to create a `Content model` in Contentful that contains the name and type of the fields we have in our table. For that, we need to:
* [Login](https://be.contentful.com/login) in Contentful and go to the Half-Earth space.
* Go to **Content model** (top menu) and click on *Add content type*. &rarr; For the metadata we have created a content type called `Metadata_prod`
* Add fields clicking on the *Add field* bottom and choosing the desired type (long/short text, number etc.). We need to add the same fields we have in the `metadata_staging` table, plus a new field called *language*, which will contain information about the language of the entry.
* Click on Save to save the new fields.

### 1.2 Pull data from ArcGIS hosted table and send it to Contentful
Now, we need to pull all the information stored in `metadata_staging` and send it to Contentful, to the model called `Metadata_prod`. Each row in the table will be a new entry in Contentful. We have managed to automate this process in Section 2 of this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_to_contentful.ipynb), using the ESRI and the Contentful APIs. Note that each row in the table must match the corresponding field in the content model we created in Contentful. Hence the importance of correctly defining the field types. 

Note that since the original data saved in the `metadata_staging` table is in English, the language field has been set to 'en'. Also, in this script, each new entry has been given a unique ID that follows an specific pattern, which is `metadataProd`+`Index`. Using IDs with a specific format to identify the original entries (those in English that come directly from AGOL) will help us make regular updates and integrate new metadata. This process is explained in the next section. 

## 2. Updating the `Metadata_prod` content type

Once the first batch of data is imported in Contentful, we still need to be able to create new entries for the new layers we include on the app during the development phase of the Half-Earth Map. 

### 2.1. Adding new metadata

Because we want to keep the hosted table as backup, the first step would be to add the new information, in English, in [metadata_staging](https://eowilson.maps.arcgis.com/home/item.html?id=ef369a73779d4a37b2252808afef98a7). The recommended process to avoid dramatic errors would be:
* Create a backup of the table `metadata_staging`. You can keep it in AGOL as *metadata_staging_backup_dateofbackup*
* Download the table as .csv .
* Write the new metadata in the next available row, following exactly the same structure as the other rows. Note that the layerSlug field makes reference to the name the front-end will use to call the layer so, please, create an easy but recognizable name and make sure it is unique. Also, make sure all columns have their corresponding names, otherwise the entire column will be empty after the upload. Do not change the name of the columns.
* Overwrite the existing hosted table using the new .csv. 
* Check that the hosted table has all the desired data in the right format before going to the next step. If something seems off, use the backup table generated at the beginning of this process to go back to the previous version. 

Once the new metadata has been saved in `metadata_staging`, we need to run the notebook [Metadata_updates_Contentful](https://eowilson.maps.arcgis.com/home/notebook/notebook.html?id=4789ac26c6134727827236421c73fd39, which is hosted in AGOL, to create new entries in Contentful for the new metadata. This notebook used the ID of the entries saved in Contentful to identify new rows in the hosted table and create new entries for those. Thus, the notebooks should be run every time we update `metadata_staging`, or we can set it to run automatically (every week, for instance), if needed. 

Section 3 of this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_to_contentful.ipynb) provides the same code used in the hosted notebook, along with some other information about how to manage data in Contentful using the API.

### 2.2 Other types of updates

The process explained above only creates entries for new rows saved in `metadata_staging`, but does not account for changes made to existing entries. **Any changes made to existing entries need to be updated manually, both in `metadata_staging` and in Contentful.** 

For example, imagine that you want to change the description of an entry that has already been imported into Contentful. The update process here will be:
* Manually update the description in `metadata_staging`, as we want to keep the backup table updated.
* Manually change the description of the original entry (in English) stored in Contentful.
* Manually change the description of the derived entries (in each of the translation languages) in Contentful. 


## 3. Translating entries

Anyone in charge of the translations need manually add, for each entry in the `Metadata_prod`content type, as many entries as languages we have on the Half-Earth app. At this point, for instance, the Map is being translated to Spanish ('es'), Portuguese ('pt') and French ('fr'). Thus, for each original entry (in English), we need to create three new entries that have exactly the same name, followed by _es, _pt, _fr, according to the language of the translation. Those new entries have the same information stored in the original one, except for the fields **description** and **title**, which need to be translated to the corresponding language. Also, the field **language** has to be set to 'es', 'pt' or 'fr', to indicate the language of the translation. 

Note that the translated entries need to have IDs that contain random characters and numbers, instead of the specific pattern (metadataProd+Index) we used before. The reason to give them a completely different ID is to avoid problems during the updates, as they are based on IDs. Anyway, when entries are created manually in Contentful, they are automatically given random IDs. Thus, since it should be easy to keep it this way as long as the entries for the translations are done directly in Contentful (manually, not using the API).