---
layout: default
title: Services whitelisting
parent: Scientists 🧑‍🔬
permalink: /_docs/science/whitelisting
---

# Services whitelisting  

Map of Life is the data provider of the biodiversity data. Some layers are hosted in the Living Atlas, but those that are not yet published are either provided by the MOL API or, as transition into any of those two hosting services, they are in the arcgis online organisation page. When the data is served from arcgis online a set of links have to be whitelisted. Reach to the dev team to get the list. (The URLs to add are specific to each project, for Half Earth they are stored in the slack channel #half-earth-dev, and they appear by clicking on the blue lightning bolt -shortcuts- and then on 'whitelisted urls'). 

# Whitelisting instructions
**IMPORTANT** Bear in mind that ESRI updates Arcgis Online from time to time, so there is a chance these instructions are outdated. 

![](/public/whitelisting-logic.jpeg)

The logic is as follows:
1. Publish a first service, 
2. Use the URL of the service to create the second service as an "Item from the web". Here you have to enter your credentials and select:
- [x] Store credentials with service item. Do not prompt for authentication option
3. In the settings tab of the second service, go to `Limit Usage`. Add all the urls that should be whitelisted.  
4. change the settings of the second service to Everyone. **The limit access has priority over the share with everyone.**

## Avoiding repeating the copy pasting of all the URLs ([Notebook with example](https://github.com/Vizzuality/he-scratchfolder/blob/master/update_whitelisted_urls.ipynb){:target="_blank"})
Once the second service is created, it is possible to move to use code to update all the urls. You will find `properties.json` stored in the slack channel #half-earth-dev, and they appear by clicking on the blue lightning bolt -shortcuts- and then on 'whitelisted urls'. The structure of the json is as follows:
```
{'serviceProxyParams': {'referrers': ['url',
   'url2']}}
```
### Python code
The properties to be updated are found in the `serviceProxyParams` and they are a list of `referrers`
```python
# Access the item using the id (here a) 
a = "04986e0b667c4ad29539683d6ba2314f"
g_item = gis.content.get(a)
g_item.update(item_properties = properties)
```
