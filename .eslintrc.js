module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    tsconfigRootDir: __dirname,
    // project: './config-overrides.js',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    // 'import/resolver': {
    //   node: {
    //     paths: ['src'],
    //   },
    // },
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['cypress', 'import', 'prettier'],
  rules: {
    // Place to specify ESLint rules.
    // Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 0,
    'no-console': [1, { allow: ['info', 'warn', 'error'] }],
    'react/jsx-props-no-spreading': [0, {}],
    'arrow-body-style': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': ['error', { props: false }],
    'prettier/prettier': 'error',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
          },
          {
            pattern: 'react**',
            group: 'builtin',
          },
          {
            pattern: '@react**',
            group: 'builtin',
          },
          {
            pattern: 'redux_modules/**',
            group: 'builtin',
          },

          {
            pattern: 'esri-loader',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'router',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@loadable/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@transifex/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'lodash',
            group: 'builtin',
          },
          {
            pattern: 'selectors/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'prop-types',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'actions/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'utils/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'reselect',
            group: 'builtin',
          },
          {
            pattern: 'next/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'node_modules/**',
            group: 'builtin',
          },
          {
            pattern: 'hooks/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'scenes/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'containers/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'components/**',
            group: 'internal',
          },
          {
            pattern: 'services/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'constants/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'styles/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './styles**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'icons/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'images/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'svgs/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
  },
  globals: {
    window: true,
  },
};
