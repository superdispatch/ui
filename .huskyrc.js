'use strict';

module.exports = {
  hooks: {
    'pre-commit': 'yarn --force && tsc && lint-staged',
  },
};
