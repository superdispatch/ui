'use strict';

const percyHealthCheck = require('@percy/cypress/task');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('task', percyHealthCheck);

  return config;
};
