---
layout: default
title: Science interfacing with the Front End
parent: Scientists 🧑‍🔬
permalink: /_docs/science/sci-fe
---

# Science `Pull Requests` reviewing

The metadata is controlled by the back end (arcGIS online), but some elements of the data are in the FE code. Most of the code reviews from Science involve checking the name of the layers that are shown on the sidebar and the legend. When reviewing follow the `suggest` approach described in [this article](https://haacked.com/archive/2019/06/03/suggested-changes/){:target="_blank"}. 
### Code files to check
- The file that contains the layers config that shows information on the side bar and legend is `src/constants/-layers-urls.js`. 

### How to run the app in local
Always seek advice from the Tech Lead. As an initial resource, there is a [Blogin post](https://vizzuality.blogin.co/posts/how-to-have-half-earth-in-your-computer-in-less-than-50-min-102803) telling the story of setting up the app in local. Key elements to keep in mind is to request the `.env` file from the Front End team. The `.env` file is ignored by git. This file is updated every time the ArcGIS Javascript API is updated (`REACT_APP_ARGISJS_API_VERSION=`). Check the `public/index.html` file to see which version is being used. The code line:
```
<link rel="stylesheet" href="https://js.arcgis.com/<argis javascript API version>/esri/css/main.css">
```