---
layout: default
title: General architecture
nav_order: 1
parent: Developers 👩🏽‍💻
has_children: true
has_toc: true
permalink: /_docs/dev/architecture
---

## What this app is

Half-Earth v3 is a Vite + React single-page application that renders a 3D ArcGIS SceneView “globe” alongside data-driven scenes and UIs. Redux powers routing and synchronizes UI/globe state into the URL, enabling shareable, reproducible views. Translations, analytics, and content integrations complete the platform.

Key technologies
- React 17, Redux, redux-first-router
- @arcgis/core 4.x (ArcGIS JS API) for the 3D globe
- @loadable/component for page-level code-splitting
- @tanstack/react-query for server-state
- Transifex Native for i18n
- SCSS modules for styles

Entry points
- index.html: loads ArcGIS CSS and bootstraps the app bundle
- src/index.jsx: creates the Redux store and mounts <App />
- src/app.jsx: initializes Transifex + React Query and lazy-loads pages based on the current route

## Code organization (where things live)

- Pages (src/pages/*)
  - Top-level routes: data-globe, featured-globe, aoi, nrc (+ mobile variants under src/pages/mobile/*).
  - Pages compose a scene with page chrome (headers, sidebars, modals, menus).
- Scenes (src/containers/scenes/*)
  - Each scene wraps the ArcGIS SceneView via components/scene and owns per-scene configuration (sceneSettings).
  - Orchestrates layers, sidebars, tooltips, onboarding, and other managers.
- Components (src/components/*)
  - Reusable presentational components. Notable: components/scene/* (Scene wrapper), tooltips, modals.
- Containers (src/containers/*)
  - “Smart” components wired to Redux and ArcGIS.
  - Includes layers/*, sidebars/*, menus/*, and managers/* (arcgis-layer-manager, globe-events-manager, zoom-into-geometry-manager, etc.).
- Store (src/store/*)
  - store/store.ts and store/reducerRegistry.js implement the Redux store and dynamic reducer injection.
  - store/redux-modules/* contains feature modules (actions, reducers, initial state) registered on demand.
- Constants (src/constants/*)
  - Layer and scene configuration, slugs, and service URLs (e.g., mol-layers-configs, layers-urls, layers-groups, layers-slugs).
- Utils, hooks, services
  - src/utils/*: ArcGIS helpers (layer creation/visibility/order, globe events, state-to-url) and general utilities.
  - src/hooks/*: custom hooks (e.g., hooks/esri.js for search/sketch widgets and watch utils).
  - src/services/*: service wrappers (e.g., esri-feature-service.ts for querying/editing FeatureLayers).
- Styles (src/styles/*)
  - SCSS modules and theme styles (e.g., styles/themes/scene-theme.module.scss).

## Routing and URL-state model

Router
- redux-first-router connectRoutes is configured in src/router.ts.
- Each route defines a path and a page key used by App to lazy-load the right page.

URL serialization
- src/utils/state-to-url encodes/decodes JSON-like state into location.query.
- Main query keys:
  - globe: camera center/zoom, activeLayers, basemap, labels, terrain, and globe UI toggles.
  - ui: non-globe UI state (sidebars, modals, menus, onboarding, etc.).
  - lang: current locale.

Actions
- store/actions/url-actions exposes changeGlobe, changeUI, changeLang.
- Each action updates only its subtree in location.query, preserving the rest.

## State management (high level)

- The Redux store (store/store.ts) composes base reducers and supports dynamic reducer registration through store/reducerRegistry.js.
- Feature modules under store/redux-modules/<feature> export a reduxConfig that reducerRegistry.registerModule consumes to inject reducers at runtime (code-splitting friendly).
- Location (redux-first-router) provides routing and the URL-backed state used by selectors.
- Deep dive: State Management → /_docs/dev/architecture/state-management

## The ArcGIS “globe” architecture

Scene wrapper
- components/scene/scene.js + scene-component.jsx create an ArcGIS Map and a 3D SceneView for each scene.
- Applies per-scene settings (environment, constraints, padding, popup UI) via the sceneSettings prop.
- On mobile, the Scene uses a lower qualityProfile to reduce GPU load.

Camera, rotation, and URL sync
- Optional initial rotation animates the globe on first visit; a flag in localStorage avoids repeating.
- Uses @arcgis/core/core/reactiveUtils (via hooks/esri) to update the URL when the view becomes stationary (center + zoom).

Touch pan refinement
- A custom touch-pan handler in the Scene improves iOS Safari behavior for one-finger panning.

Basemap handling
- utils/layer-manager-utils.setBasemap composes a Basemap from configured base layers (constants/mol-layers-configs + constants/layers-urls).

Layer system overview
- Configuration-driven: constants/mol-layers-configs maps slugs → type (FeatureLayer, TileLayer, VectorTileLayer), URL or portalId, default opacity, optional renderer and bbox.
- Creation/activation: utils/layer-manager-utils.createLayer/addLayerToMap/activateLayersOnLoad and addActiveLayersToScene instantiate and add activeLayers from state.
- Visibility/order/opacity: containers/managers/arcgis-layer-manager calls utils/arcgis-layer-manager-utils.setLayersVisibility (and optionally setLayersOrder) based on activeLayers.
- Labels: containers/layers/labels-layer styles label layers with LabelClass rules from @arcgis/core.

Events and interactions
- containers/managers/globe-events-manager attaches pointer handlers and uses view.hitTest; utils/globe-events-utils centralizes hit results, cursor updates, flyTo helpers, and avatar/marker placement.
- hooks/esri.js exposes search and sketch widget logic, including area validation against configured limits.

Examples by scene
- Data scene (src/containers/scenes/data-scene/*): thematic layers, labels, tooltips, sidebars, and the globes menu. Configured via data-scene-config.js.
- AOI scene (src/containers/scenes/aoi-scene/*): AOI mask/outline, optional terrain exaggeration, basemap selector, and ZoomIntoGeometryManager for camera transitions.

### Per-scene layer configuration files
- Each scene ships with a dedicated config module that defines its initial globe and UI state, especially the list/order of layers.
- Examples:
  - src/containers/scenes/data-scene/data-scene-config.js defines globe.activeLayers, zoom/center, padding, environment, popup and basemap.
  - src/containers/scenes/aoi-scene/config.js defines activeLayers, padding, environment, constraints and basemap.
- How it flows:
  1) The page builds sceneSettings from the scene’s config and passes it to the Scene component (components/scene).
  2) On map load, activateLayersOnLoad(map, initialActiveLayers, layersConfig) instantiates those layers by looking up their slug in constants/mol-layers-configs.
  3) ArcgisLayerManager keeps visibility/opacity in sync with activeLayers changes.
- This separation lets us evolve per‑scene defaults without touching the global layer registry (constants/mol-layers-configs, constants/layers-urls).

## Data and services

- ArcGIS Online: constants/layers-urls centralize FeatureServer/MapServer URLs and portal item ids per layer slug.
- Service helpers: src/services/esri-feature-service.ts wraps querying/editing via @arcgis/core and @esri/arcgis-rest-feature-layer.

### Contentful content and translations
- What we store there
  - Layer metadata (descriptions, sources, credits) used across the UI.
  - Featured maps stories (editorial content) shown in the Featured Globe and related views.
- Per-locale pages in Contentful
  - Content entries are translated per locale in Contentful (separate localized pages/entries).
  - The app requests the appropriate locale when fetching entries so users see the correct language.
- Where the locale comes from
  - We keep the UI locale in the URL (location.query.lang) and initialize Transifex in src/app.jsx.
  - The same locale value is used when requesting Contentful entries.
- More details
  - Translation docs: /_docs/dev/translation
  - Contentful metadata: /_docs/scientists/metadata-contentful

## Performance and code-splitting

- Pages are lazy-loaded with @loadable/component to keep the initial bundle small.
- Redux reducers load on demand via reducerRegistry; avoid upfront loading of all modules.
- ArcGIS CSS is linked in index.html; ArcGIS API resources are lazily used by the Scene.
- Prefer reusing created layers; avoid unnecessary re-instantiation when toggling visibility/opacity.

## How to extend

Add or update layers
- Follow the guide: /_docs/dev/layers/add-update
- Typical steps: add/update constants/mol-layers-configs and constants/layers-urls entries; ensure the visibility/ordering path in arcgis-layer-manager is correct; test URL serialization for activeLayers.

Add a new scene/page
- Add a route in src/router.ts (path + page key).
- Create a page under src/pages/<page> and wire it in App (lazy-loaded with @loadable/component).
- Compose a scene in src/containers/scenes/<new-scene> with components/scene; define sceneSettings and required managers (layer, events, zoom).
- If the new state is URL-driven, add actions/selectors and update constants as needed; consider onboarding and mobile variants.

## Cross-links and related docs

- State management: /_docs/dev/architecture/state-management
- Working with layers (add/update): /_docs/dev/layers/add-update
- Components catalog: /_docs/dev/components
- Translation: /_docs/dev/translation
- Developer index and environment: /_docs/dev
