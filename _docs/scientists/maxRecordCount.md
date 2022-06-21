---
layout: default
title: Update maximum record count
parent: Scientists 🧑‍🔬
permalink: /_docs/science/agol-management
---
# Update the maximum record count for feature services in ArcGIS Online

The **maxRecordCount** property is used to define how many features can be accessed when querying data in a hosted feature service, or when creating a local copy of a hosted feature service for use with ArcMap. The default maxRecordCount value is 1000. However, there are cases in which we need to access a greater number of features. An example is the species tables on the NRC, where some countries have more than 6000 different species. To avoid getting this limitation in the number of features retrieved, we need to update the maxRecordCount property. For that, you can follow the next steps:

### 1. Get the url of the feature service
First, we need to login on ArcGIS Online (AGOL) using our credentials, and go to the feature service we want to modify. Then, we need to retrieve the url of the service, located at the bottom right of the overview section. It must have the format `https://services9.arcgis.com...` so if we are using whitelisted services, we need to retrieve the url of the original table (not the whitelisted). Copy the url and paste it in a browser. When clicking enter, we are directed to a new site and we get a message saying `Token required`. Leave this page open, we'll go back to it in a moment.

### 2. Get a token
To get a token we need to go back to the layer website where we retrieved the url and, on the top right of the browser, open the `Developer tool`.

![](/public/developer_tool.png)

Now, if we refresh the page, we will see all the calls that are made. In the `Network` section of the developer tool, look for a line that contains the word "token". In the example below, this line is located at the end of the list (second line starting from the end).

![](/public/find_token.png)

Copy the entire line and paste it in a document, a browser or any other place that allows you to select only part of the string. Specifically, we want the part that starts with `?token` and everything after it, so copy everything from `?token` (included) until the end of the string. If there is a `.` almost at the end of the string, you will need to remove that dot and everything after it. 

### 3. Access the "update definition" bottom.

Go to the page where we got the message `token required` and paste the string we have just copied just after the end of the url (which usually ends with `/FeatureServer`). There is no need to add anything after the word *FeatureServer*, just the string starting with `?token`. Click enter.

Now, the `token required` message has disappeared and we can see information about the feature service. But we can't update it. For that, we need to include `admin/` in the url, between the words *rest* and *services*:

`https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/...` &rarr; `https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/admin/services/...`

Make sure you don't remove anything from the url. Click enter. Now, we can see an *Update definition* option at the bottom of the page. 

### 4. Change the limit of maxRecordCount property

When clicking on the *Update definition* link, the *Update Service Definition* window opens and we can make changes to the properties on the json file. Look for the **maxRecordCount** property and set it to 10000 (or any upper limit you need). Finally, click on the `Update Service Definition` bottom to accept these changes.
