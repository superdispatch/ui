'use strict';

module.exports = {
  settings: { react: { version: 'detect' } },
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    { files: ['*.ts', '*.tsx'], extends: 'plugin:@superdispatch/typescript' },
    { files: '*.tsx', extends: 'plugin:@superdispatch/react' },
    { files: ['*.story.ts', '*.story.tsx'], env: { node: true } },
    {
      files: ['*.fixture.ts', '*.fixture.tsx'],
      rules: { 'import/no-anonymous-default-export': 'off' },
    },
  ],
};
