'use strict';

module.exports = {
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    { files: ['*.ts', '*.tsx'], extends: 'plugin:@superdispatch/typescript' },
    { files: '*.tsx', extends: 'plugin:@superdispatch/react' },
    { files: ['*.story.ts', '*.story.tsx'], env: { node: true } },
  ],
};
