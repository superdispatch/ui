'use strict';

const { getParameters } = require('codesandbox-import-utils/lib/api/define');

const rootPkg = require('../package');
const uiPkg = require('../packages/ui/package');

const indexFile = `
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@superdispatch/ui';
import Demo from './demo';

ReactDOM.render(
  <ThemeProvider
    modifier={theme => {
      // Modify theme here.

      return theme;
    }}
  >
    <Demo />
  </ThemeProvider>,
  document.getElementById('root')
);
`.trim();

const packageJson = {
  title: 'Super Dispatch UI Demo',
  scripts: { start: 'react-scripts start' },
  main: 'index.tsx',
  dependencies: {
    '@superdispatch/ui': uiPkg.version,
    ...rootPkg.dependencies,
  },
  devDependencies: {
    'react-scripts': 'latest',
    typescript: rootPkg.devDependencies.typescript,
  },
};

function makeParameters(code) {
  return getParameters({
    files: {
      'demo.tsx': { content: code },
      'index.tsx': { content: indexFile },
      'package.json': { content: packageJson },
    },
  });
}

module.exports = ({ types }) => ({
  visitor: {
    ExportDefaultDeclaration(path, { file, filename }) {
      if (!filename.match(/\.demo\.tsx?$/)) {
        return;
      }

      const parameters = makeParameters(file.code);

      path.insertAfter(
        types.assignmentExpression(
          '=',
          types.memberExpression(
            types.identifier(path.node.declaration.id.name),
            types.identifier('codeSandboxParameters'),
          ),
          types.stringLiteral(parameters),
        ),
      );
    },
  },
});
