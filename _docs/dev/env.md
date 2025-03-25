---
layout: default
title: Developers 👩🏽‍💻
has_children: false
has_toc: true
permalink: /_docs/dev
nav_order: 3
---

If the features are always showing independently from the env try to remove the variable completely instead to setting it to false

Current env variables

NODE_ENV=
# env variables on create react app should start with VITE_APP to be available
# https://vitejs.dev/guide/env-and-mode
VITE_APP_DATA_GLOBE_SCENE_ID= Esri Scene Id for the data globe
VITE_APP_FEATURED_GLOBE_SCENE_ID= Esri Scene Id for the featured globe
VITE_APP_ARGISJS_API_VERSION= ArcGis js version
VITE_APP_MOL_API= API for MOL data
VITE_APP_CONTENTFUL_SPACE_ID= Contentful space id for featured globe and metadata
VITE_APP_TRANSIFEX_TOKEN= Transifex token for translation
TRANSIFEX_TOKEN= Transifex token for translation (Same as the react app one)
TRANSIFEX_SECRET= Transifex secret for translation (Same as the react app one)
VITE_APP_TRANSIFEX_SECRET= Transifex secret for translation (Same as the react app one)
VITE_APP_CONTENTFUL_TOKEN= Contentful token
VITE_APP_GA_MEASUREMENT_ID= Google analytics code

GENERATE_SOURCEMAP=false keep false. This is a fix for a problem with react-scripts 5 not handling the sourcemaps correctly and having some warnings


VITE_APP_VERCEL_ENV= Current environment, provided by vercel

VITE_APP_FEATURE_SPECIFIC_REGIONS_AOI= Show specific regions as an option in analyze areas
VITE_APP_FEATURE_ALLOWED_LANGUAGES= Languages showing in language switcher

Temporal
