---
layout: default
title: Creating tile services
parent: Scientists 🧑‍🔬
permalink: /_docs/science/tile-services
---

# Creating tile services
Tiles are used when an interaction is not necessary. It is key to get the colour style of the data correctly because once the tile service is created it is not possible to change the styles. If a change in the colour ramp has to be done then a whole new tile service must be created. After the ESRI Cartographic Review (July 2021), there is an ArcGIS Pro Project Package backed up in the arcgis organisation. [This item](https://eowilson.maps.arcgis.com/home/item.html?id=84ee84cc0b6944f69896e16627df8e0c) is shared within Vizzuality (see [Groups](/_docs/science/arcgis-groups) information).

### Publishing tiles from ArcGIS Pro
1. Create a project and open the layer you want to create the tiles from. By default the new map will have the [3857 projection](https://epsg.io/3857) and a default basemap with that projection appears. 
2. In the 'Contents' panel select the layer you want to publish as a tile service. Right click on the layer and select `Sharing`, then `Web layer` and `Publish Web Layer` . You can also access from the top menu following the path `Share > Web Layer > Publish Web Layer`. 
3. The Sharing panel opens and the description fields appear to be filled. 
    - This is the information that is going to describe the item in ArcGIS Online
    - For **Layer Type**, select `Tile` if you are tiling raster files or feature layers with many features
    - Select the folder in the ArcGIS Online account where you want to save the tile service. (This can be changed after publication).
    - Indicate the sharing options (Everyone, the organisation or certain groups)
4. Go to the Configuration tab to select the number of tile levels to build. 
    - Tile Scheme: keep default (ArcGIS Online)
    - Levels of Detail: This will depend on the resolution needed for the tiles. The higher the level of detail, the more tiles are created and more space is used. As a general rule, publish a low number of tiles (0 to 6/7 or around 100MB) to do tests (like deciding the color ramp) and when the settings are final, publish the remaining tiles either form ArcGIS Pro or from ArcGIS online (See section `Building more tile levels from an already published tile service`)
    - Cache: keep default (Cache automatically on the server)
    
Press Analyse (Warnings may appear, especially about the Reference System) and then Publish.

The layer should now appear in ArcGIS online, but it may be visible only at some zoom levels. To make it visible at higher zoom levels follow the section [Using the tiles from a level in the subsequent levels](#using-the-tiles-from-a-level-in-the-subsequent-levels)

### Publishing vector tiles from ArcGIS Pro
It is the same procedure, but if the tiles come from a Vector layer you may need to load the layer directly into the project as a **shapefile or feature class** instead of pulling it from the ArcGIS online Feature Layer. Follow the same steps, but select `Vector Tile` in **Layer Type**.  

This should also apply to tiles: selecting the right coordinate system of the layer. Or if sharing several layers of a map as a service, the coordinate system of the map should be the same as the one used in the app (in the case of Half Earth that was `spatialReference":{"wkid":102100,"latestWkid":3857}}`). 

### Using the tiles from a level in the subsequent levels
#### This does not consume credits
If the resolution of the raster data that has been tiled is not greater than a certain level, but the data has to still be shown at lower levels use the visibility settings of the tile service. In the settings of the tile service, go to **Tile Layer (hosted)** and drag the minimum of the **Visible range** to the right. In **Show current tile details** you can check that the number of levels has increased but the number of *Tiles Published* hasn't changed. 

### Building more tile levels from an already published tile service
#### **This consumes credits**, building tiles is possible from ArcGIS Pro and does not consume credits. 
From the settings of the tile service:
- step 1: click on build tiles
- step 2: select the tile level of choice (in this case level 9 as the previous levels had already been created)
- step 3: click on create tiles
![](https://www.pivotaltracker.com/file_attachments/103212465/download?inline=true&size=big)

### Updating a color scheme in ArcGIS Pro
#### For human pressure raster
The ArcGIS Pro Project should be open and showing a map. Select the layer, right click on it and two new tabs appear on the top (Appearance and Raster). Go to the 'Appearence' tab on the top and click on 'Symbology' and then on 'Stretch' (there are other methods like Classify that makes intervals and gives a color to each). A new panel opens on the right with options to assign a continous palette with breaking points. You can decide the Color scheme and the type of Stretch to apply (PercentClip). 
To change colors of the palette, click on the Color scheme and at the bottom, go to 'Format color scheme...', this will open a pop up window with options to change the colors and the position. At the right of this panel there is also a symbol with two triangles that allows to reverse the color scheme.
The colour scheme is indicated in designs UI Kit.

#### For biodiversity data
The biodiversity data is binned and for each layer a different number of bins has to be applied. The simbology type has to be classified and the number, the method should be equal intervals and the number of classes has to match the number of bins. If the number of bins is higher than 32 the number must be introduced manually. 

![](/public/biodiversity_colour_ramp.png)

##### Biodiversity colour ramp:
```
position 0%, transparency 75%, #090072
position 50%, transparency 40%, #0085AA
position 80%, transparency 20%, #00E288
position 100%, transparency 0%, #ECFF1A
```