module.exports = {
    extends: ['eslint-config-airbnb'],
    env: {
      browser: true,
      es6: true,
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    parser: "babel-eslint",
    rules: {
      "comma-dangle": [1, {
        "objects": "always-multiline",
        "imports": "always-multiline",
        "arrays": "never",
        "exports": "never",
        "functions": "never"
      }],
      "max-len": [2, 140, 2],
      "semi": ["error", "never"],
      "import/no-extraneous-dependencies": "off",
      "no-unused-vars": "error",
      "no-console": "off",
      "global-require": "off",
      "no-debugger": "warn",
      "camelcase": "off",
      "no-restricted-syntax": "off",
    },
  };
  