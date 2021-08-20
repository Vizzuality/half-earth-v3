---
layout: default
title: AOIs and CRFs
parent: Scientists 🧑‍🔬
permalink: /_docs/science/aois-crfs
---

# Existing documents
- [Basecamp thread](https://basecamp.com/1756858/projects/13899003/messages/93850769) with videos.
- [Rapid summaries report](https://docs.google.com/document/d/1ndUZfxKBKqpFgUymfge8JKyEcJu3r1IbsVCUQnjnWec/edit): you will find some tricks to build the models of model builder, also a test of performance.
- [CRF creation and storage](https://docs.google.com/document/d/1H6VaYnBHhPD3mDfCVnfwh6t22tPFffmjyej1OAjgddk/edit): the process to build a crf is in this document.

# Building a tool to publish 
Set names of the parameters so they legible by the Front End, inside model builder rename the parameters (right click on the ovals). 
Use `calculate value` as much as possible, Python is quicker than adding extra geoprocessing tools. 

# How to publish a geoprocessing service in 14 easy steps (and a good portion of patience).
1. run the geoprocessing model against the whole crf
2. create a small subset of the crf using "Subset Multidimensional raster", set the environment setting of extent to "current Display"
3. run the geoprocessing against the subset crf
4. if the geoprocessing is not in model builder already, drag it from the history into a new model
5. Set the parameters by right clicking on them: (1) input polygon/points, (2) crf and (3) output (A letter P appears on them).
6. For the output right click and enable "add to dispay"
7. Save the model, close it and run it as a geoprocessing tool
8. From the History, right click and share as a web tool
9. In the configuration panel increase the maximum number to 100000 records
10. In the content panel configure the tool properties (this is the tricky part)
11. Set the crf as choice list
12. Add the description to the different parameters
13. Analyse before publishing to check which parameters or info is missing on the description of the tool
14. cross your fingers