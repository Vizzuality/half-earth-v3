module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
        tsconfigRootDir: __dirname,
      },
      plugins: ['cypress', 'import', 'prettier', '@typescript-eslint'],
      rules: {
        // Place to specify Typescript specific ESLint rules.
        // Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'import/no-unresolved': 'off',
        // ! enabling @typescript-eslint/recommended-requiring-type-checking triggers a lot of errors
        // ! as type-checking is more strict than usual. In order to fix those errors progressively,
        // ! we have changed the configuration rules from error to warning for now to avoid crashing the deploy.
        // ! This does not mean the below rules are meant to stay as if, the warning must be fixed until
        // ! linter does not complain about a specific rule and can be safely removed from below.
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/require-await': 'warn',
        // ---
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [1, {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
        }],
      }
    },
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'airbnb',
    'prettier',
  ],
  plugins: ['cypress', 'import', 'prettier'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 0,
    'no-console': [1, { allow: ['info', 'warn', 'error'] }],
    'react/jsx-props-no-spreading': [0, {}],
    'arrow-body-style': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'no-param-reassign': ['error', { props: false }],
    'prettier/prettier': 1,
    'no-restricted-exports': 0,
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
