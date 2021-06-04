---
layout: default
title: Science PR reviewing
parent: Scientists 🧑‍🔬
permalink: /_docs/science/PRs
---

# Science `Pull Requests` reviewing

The metadata is controlled by the back end (arcGIS online), but some elements of the data are in the FE code. Most of the code reviews from Science involve checking the name of the layers that are shown on the sidebar and the legend. When reviewing follow the `suggest` approach described in [this article](https://haacked.com/archive/2019/06/03/suggested-changes/){:target="_blank"}. 
### Code files to check
- The file that contains the layers config that shows information on the side bar and legend is `src/constants/biodiversity-layers-constants.js`. 
