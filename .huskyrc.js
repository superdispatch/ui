'use strict';

module.exports = {
  hooks: {
    'pre-commit': 'yarn && tsc && lint-staged',
  },
};
