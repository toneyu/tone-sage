module.exports = {
  extends: 'erb',
  parser: '@typescript-eslint/parser',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'react/prefer-stateless-function': 'off',
    'react/state-in-constructor': 'off',
    'no-nested-ternary': 'off',
    'react/button-has-type': 'off',
    'no-unused-expressions': 'off',
    'spaced-comment': 'off',
    'no-console': 'off',
    'promise/catch-or-return': 'off',
    'promise/always-return': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/no-named-as-default-member': 'off',
    'react/destructuring-assignment': 'off',
    'no-shadow': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.js'),
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
