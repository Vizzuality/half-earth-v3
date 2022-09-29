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
# env variables on create react app should start with REACT_APP to be available
# https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#docsNav
REACT_APP_MINIMAP_GLOBE_SCENE_ID= Esri Scene Id for the minimap globe
REACT_APP_DATA_GLOBE_SCENE_ID= Esri Scene Id for the data globe
REACT_APP_FEATURED_GLOBE_SCENE_ID= Esri Scene Id for the featured globe
REACT_APP_ARGISJS_API_VERSION= ArcGis js version
REACT_APP_CONTENTFUL_SPACE_ID= Contentful space id for featured globe and metadata
REACT_APP_TRANSIFEX_TOKEN= Transifex token for translation
TRANSIFEX_TOKEN= Transifex token for translation (Same as the react app one)
TRANSIFEX_SECRET= Transifex secret for translation (Same as the react app one)
REACT_APP_TRANSIFEX_SECRET= Transifex secret for translation (Same as the react app one)
REACT_APP_CONTENTFUL_TOKEN= Contentful token
REACT_APP_GEO_DESCRIBER_API= API used for geo description
REACT_APP_GA_MEASUREMENT_ID= Google analytics code

SKIP_PREFLIGHT_CHECK=true keep true, CRA does'nt support different versions of eslint https://github.com/facebook/create-react-app/issues/5247

REACT_APP_VERCEL_ENV=

REACT_APP_FEATURE_SPECIFIC_REGIONS_AOI= Show specific regions as an option in analyze areas
REACT_APP_FEATURE_TRANSLATION= Show transifex and contentful translation through the language selector
REACT_APP_FEATURE_ALLOWED_LANGUAGES= Languages showing in language switcher