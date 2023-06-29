---
layout: default
title: Metadata in Contentful
parent: Scientists 🧑‍🔬
permalink: /_docs/science/metadata-contentful
---

# Importing and updating metadata in Contentful

## Context
Until September 2022, the metadata displayed on the Half-Earth Map was stored in two hosted tables in ArcGIS Online: 

* [metadata_staging](https://eowilson.maps.arcgis.com/home/item.html?id=ef369a73779d4a37b2252808afef98a7) &rarr; for the metadata shown on the demo site (staging).
* [metadata_prod](https://eowilson.maps.arcgis.com/home/item.html?id=cab2acd857a34e2faef1f60a9d40e354) &rarr; for metadata shown on the Half-Earth Map APP (production). 

Every time we needed to add new metadata, this was first added in the `metadata_staging` table for testing. Once we were sure everything worked as expected and the new features were ready to be deployed into Production, the table `metadata_prod` was updated following the process described in [this section](https://vizzuality.github.io/half-earth-v3/_docs/science/metadata-service) of the documentation. 

This process had advantages: The metadata used in production was always the final version and we had `metadata_staging` to test and use as a backup. However, during the translation of the Half-Earth Map into French, Portuguese and Spanish, we found out that it was very difficult, if not impossible, to directly translate information hosted in ArcGIS Online. Hosted tables cannot be directly imported in Transifex, which is the translation service we use for most of the platform. Thus, we needed to redefine the way we managed the metadata.

## New workflow

Under these circumstances, we decided to change the metadata workflow and store the metadata used in production in [Contentful](https://www.contentful.com/), a cloud-based headless content management system (CMS) designed for helping businesses and organizations to upload, organize, manage and distribute content (text, images, or video). The Half-Earth Map already used Contentful to manage the data shown on the [Discover Stories](https://map.half-earthproject.org/featuredGlobe) section, which also needed to be translated. Thus, since the translators (professional or in-house) will already need to have access to our content stored in Contentful, it just made sense to migrate the metadata there as well. That way, all translations will be done through Transifex and Contentful, and we will avoid having to give access to our ArcGIS Online account to people outside of our organization. 

The new workflow to store metadata is done in several steps:
1. All the data stored in `metadata_staging` has to be exported to Contentful as new entries.
2. The metadata saved in Contentful needs to be translated to the required languages (French, Portuguese and Spanish for now).
3. New metadata (in English) is gradually added in Contentful, with the corresponding translations.

### 1. Importing data from AGOL into Contentful

**Requirements**

To migrate data from ArcGIS Online to Contentful we use both the ESRI and the Contentful API, so we need:

* ESRI credentials
* Contentful credentials to login
* Contenful space name (there is only in space in our Contentful account)
* Contentful content delivery token &rarr; In the Contentful platform under Settings/API Keys you will find the current tokens. For this, we have been using `Half-Earth 2 - Science`, which is a content delivery token, a token that can only be used for read-only queries. 
* Content management token &rarr; To be able to create new entries using the API the content delivery token is not enough, we need a content management token. That can be get under the **Content management tokens** tab, clicking on *Generate personal token*. Once the token appears, it needs to be copied and saved because, once the window is closed, it won't be possible to see it again.

These are the steps needed to import all metadata saved in AGOL into Contentful. Note that **this process only needs to be done once!**

#### **1.1 Create a new content model in Contentful**
The first thing we need to do is to create a `Content model` in Contentful that contains the name and type of the fields we have in our table. For that, we need to:
* [Login](https://be.contentful.com/login) in Contentful and go to the Half-Earth space.
* Go to **Content model** (top menu) and click on *Add content type*. &rarr; For the metadata we have created a content type called `Metadata_prod`
* Add fields clicking on the *Add field* bottom and choosing the desired type (long/short text, number etc.). We need to add the same fields we have in the `metadata_staging` table, plus a new field called *language*, which will contain information about the language of the entry.
* Click on Save to save the new fields.

#### **1.2 Pull data from ArcGIS hosted table and send it to Contentful**
Now, we need to pull all the information stored in `metadata_staging` and send it to Contentful, to the model called `Metadata_prod`. Each row in the table will be a new entry in Contentful. We have managed to automate this process in Section 2 of this [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Metadata_to_contentful.ipynb), using the ESRI and the Contentful APIs. Note that each row in the table must match the corresponding field in the content model we created in Contentful. Hence the importance of correctly defining the field types. 

Note that since the original data saved in the `metadata_staging` table is in English, the language field has been set to 'en'. Also, in this script, each new entry has been given a unique ID that follows an specific pattern, which is `metadataProd`+`Index`. Using IDs with a specific format to identify the original entries (those in English that come directly from AGOL) will help us make regular updates and integrate new metadata. This process is explained in the next section. 

### 2. Adding new metadata in Contentful

Once the first batch of data is imported in Contentful, we still need to be able to keep adding metadata for the new layers we include on the app during the development phase of the Half-Earth Map. For that, we need to:

#### **2.1 Create new entries for metadata in English**
In Contentful, select the content type `Metadata_prod` and add click on "Add entry". Introduce the required information. The `layerslug` parameter refers to the name the front-end uses to call the layer). Make sure you set the `language` parameter to "en" (English).

#### **2.2 Translate the metadata**
For the platform to display the metadata in different languages, we need to create new entries, one for each language in the platform: 
- The `layerslug` parameter must be the same as the entry in English, but include the reference to the language of the entry. For example, for a layer that has the layerslug *priority* in the entry in English, the entries in French, Brazilian Portuguese and Spanish should be *priority_fr*, *priority_pt* and *priority_es*, respectively. 
- Translate the relevant information (usually parameters `description` and `title`) to the corresponding languages.
- Set the `language` parameter to "fr", "pt" or "es" depending on the language of each entry.
- Publish each entry.

#### **2.3 Automating the process**
Adding metadata in Contentful might be time-consuming when done manually, especially when we need to translate the information. To speed up the process, we have created a [notebook](https://github.com/Vizzuality/he-scratchfolder/blob/master/Contentful_entry_translation.ipynb) that uses the Contentful and OpenAI APIs to translate the new metadata and publish the corresponding entries. In essence, the notebook performs the following tasks:

1. Whenever new metadata comes in (in English), we fill up the corresponding parameters in the notebook cell that creates the English entry automatically.
2. We ask the AI to translate the required fields (e.g., description and title) to each of the languages of the platform.
3. Since the resulting translations may sound too literal, we ask the AI to rephrase them to make them sound more natural.
4. We publish the new entries, one for each language, in Contentful.

Using this notebook makes the entire process easier and quicker. However, it requires having API keys for both Contentful and OpenAI.

### 3. Updating metadata in Contentful

Entries in Contenful are not linked among each other. That means that if we need to update information in an entry that is in English, we will also need to do it in the corresponding translations. This is a process that, for now, needs to be done manually, directly in Contentful. Also, be aware that the information in Contentful is displayed in production. So any changes made to the existing entries in Contentful will automatically display on the Half-Earth Map. Thus, updating metadata or any other content stored in Contentful must be done carefully. 

### 4. Exporting all entries in a content type in a csv file

This can be done directly in Contentful, selecting the entries and clicking on the "Export as CSV" bottom. But there are a few things to have into account in this process:

- This is only going to export the entries that are on display at the moment. That means that you can only select 40 entries each time (when you click on "Next" to select more entries, the previous ones are removed from the selection). So if you want to download all entries, you need to do it in several .csv files.
- The same applies to the columns. Only those columns on display will be downloaded, so you need to make sure you are including the relevant columns (e.g., description, title, sources etc.) before downloading.

There are also ways to do it using the Contentful API but so far we haven't implemented any workflow yet for this. 
