'use strict';

const fs = require('fs');

// set alias
const babelrc = JSON.parse(
  fs.readFileSync('./.babelrc', 'utf8')
);
const plugins = babelrc.plugins;
const resolver = plugins[
  plugins.length - 1
];
const alias = resolver[1].alias;

module.exports = {
  "globals": {
    "Promise": true
  },
  "extends": [
    "google",
    "eslint:recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "objectLiteralDuplicateProperties": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "import"
  ],
  "settings": {
    "import/resolver": {
      "babel-module": alias
    }
  },
  "rules": {
    "indent": [2, 2, {"SwitchCase": 1}],
    "max-len": 0,
    "quote-props": ["error", "as-needed"],
    "no-alert": "off",
    "no-console": "off",
    "object-curly-spacing": [1, "never"],
    "keyword-spacing": [2, {"overrides": {
      "if": {"after": false},
      "for": {"after": false},
      "while": {"after": false},
      "switch": {"after": false},
      "catch": {"after": false}
    }}]
  }
}
