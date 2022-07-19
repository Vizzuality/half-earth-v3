---
layout: default
title: Translation
nav_order: 1
parent: Developers 👩🏽‍💻
has_children: false
has_toc: true
permalink: /_docs/dev/translation
---

# Translation

The aplication is translated with the [transifex native](https://www.transifex.com/native/) service.

## Initialization

Transifex is initialized on the App.jsx file. A PseudoTranslationPolicy is provided on the development environment so we can see what translations are missing on the different languages directly on the platform on development.

## Selecting the translation locale

There is a language switcher component available on the menu and home page.
This component changes the two letter string that is stored on the URL lang param using the changeLang function under the store/actions/url-actions.js file.

The locale is then retrieved on the App component to set the translation. This param is not shared on the sharing links.

## To translate strings

The translation of strings will depend where is the string:

### Strings inside Components

For strings inside react components or containers its enough to use the useT hook or the T component
```
import { useT } from '@transifex/react';

const Component = () => {
  const t = useT();

  return t('Translated content')
};
```

### Strings inside constants

For strings inside constants we will have to create a function that encapsulates that string and is called everytime the locale changes.
```
constant.js

import { t } from '@transifex/native';

export const getScripts = () => t('Translated content');


component.js
import { getScripts } from './constant';
import { useLocale } from '@transifex/react';

const Component = () => {
  const locale = useLocale();
  const scripts = useMemo(() => getScripts(), [locale]);

  return scripts;
};
```

### Strings inside selectors

This case is not recommended but we can use the selectLangUrlState selector to know when the locale has change and recompute the results accordingly

```
constant.js

import { t } from '@transifex/native';

export const getScripts = () => t('Translated content');


selector.js
import { getScripts } from './constant';
import { selectLangUrlState } from 'selectors/location-selectors';

const getComputedWDPALayers = createSelector(selectLangUrlState, locale => getScripts());

```
