'use strict';

const fs = require('fs');

const colors = fs
  .readFileSync('css.css', 'utf-8')
  .split('\n')
  .filter(x => x.startsWith('/*') && x.endsWith('*/') && x.includes('#'))
  .map(x => {
    const [, name, color] = x.split(' ');

    return [`${name.charAt(0).toUpperCase()}${name.slice(1).replace('-', '')}`, color];
  })
  .reduce((acc, [name, color]) => {
    acc[name] = color;

    return acc;
  }, {});

fs.writeFileSync('colors.json', JSON.stringify(colors, null, 2), 'utf-8');
