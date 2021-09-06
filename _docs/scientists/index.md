---
layout: default
title: Scientists 🧑‍🔬
nav_order: 4
has_children: true
has_toc: true
permalink: /_docs/science
---
# Old Resources
The documentation for scientists has been living at Vizzuality's Science Team wiki, it is currently being moved to this wiki ([ArcGIS Online](https://github.com/Vizzuality/sci-team-wiki/wiki/ESRI---ArcGIS-Online) and [ArcPy](https://github.com/Vizzuality/sci-team-wiki/wiki/ESRI-Arcpy)). 

Most of the notebooks used in the Half-Earth Project are saved in Vizzuality's repository [`he-scratchfolder`](https://github.com/Vizzuality/he-scratchfolder). 
# Intro [to be moved to Readme file]
Welcome to the Half Earth docs for Scientists. These docs cover specific elements of the Half-Earth Project in terms of data wrangling and management, but also some general tips to work with ESRI's `arcgis API for Python`, `arcpy` and Arcgis Online. 
# How to add to this documentation
## Clone the repository. 
Run `yarn docs:serve`. Errors that might appear could be related to: 
- not having `xcode` installed (if running in a Mac). Check if you have it installed by using `xcode-select -p`. After installing make sure you accept the user agreement (`sudo xcodebuild -license accept`). 
- not having run `bundle install`

## Run in local
The docs are at http://127.0.0.1:4000/

## Create a new branch from `develop`
The branch naming convention is `docs/<what you are adding to the docs>`. Create a Pull Request to merge with `develop`. 

