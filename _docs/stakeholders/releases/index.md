---
layout: default
title: Release cycles & versioning
parent: Stakeholders 🌍
permalink: /_docs/general/changelog
---

_Target readers_  👩🏽‍💻  🌍  


[Current release](https://github.com/Vizzuality/half-earth-v3/releases){: target="_blank" .btn .btn-outline}

# Releases and changelog
 What we want to accomplish through releases and changelog (share the state of the project with stake holders, allow dev to have )
 Folowing [Keep a changelog structure](https://keepachangelog.com/en/1.0.0/){:target="_blank"}
## Semantic versioning on Half Earth
We do our own flavour of [Semantic Versioning](https://semver.org){:target="_blank"}, in order to fulfill the specificities of a data intensive user facing project. In short, updates on version number will increase depending on the type of change that has been done to the codebase.  
This should be the structure of the version number: `major.minor.patch`  

Find below the types of changes that fit in each category:  

### Major
- New Features (like in Jira epics)
- New data layers
- Higher scale data layers

### Minor
- Data layers updates
- Metadata updates (in case anything needs to be deployed from the platform)
- Js API upgrades
- Chore implementation for internal use
- Design iterations on existing features

### Patch
- Bug fixes
- Typos