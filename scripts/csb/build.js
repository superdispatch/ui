'use strict';

const execa = require('execa');

execa.sync('yarn', ['build'], { stdio: 'inherit' });
