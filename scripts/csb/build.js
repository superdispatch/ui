'use strict';

const { execSync } = require('child_process');

execSync('yarn build', { stdio: 'inherit' });
