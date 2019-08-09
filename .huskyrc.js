'use strict';

module.exports = {
  hooks: {
    'pre-push': 'tsc',
    'pre-commit': 'lint-staged',
  },
};
