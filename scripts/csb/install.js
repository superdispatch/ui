'use strict';

const execa = require('execa');

execa.sync('yarn', ['install'], { stdio: 'inherit' });
