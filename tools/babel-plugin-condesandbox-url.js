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

function makeParameters(code, codeDependencies) {
  const allDependencies = new Set(codeDependencies).add('react-dom').add('react-scripts');

  if (allDependencies.has('@superdispatch/ui')) {
    Object.keys(uiPkg.dependencies).forEach(id => allDependencies.delete(id));
    Object.keys(uiPkg.peerDependencies).forEach(id => allDependencies.add(id));
  }

  return getParameters({
    files: {
      'demo.tsx': { content: code },
      'index.tsx': { content: indexFile },
      'package.json': {
        content: {
          title: 'Super Dispatch UI Demo',
          scripts: { start: 'react-scripts start' },
          main: 'index.tsx',
          dependencies: Array.from(allDependencies).reduce((acc, id) => {
            if (id === '@superdispatch/ui') {
              acc[id] = uiPkg.version;
            } else {
              acc[id] = rootPkg.devDependencies[id] || 'latest';

              const typesId = `@types/${id}`;
              if (rootPkg.devDependencies[typesId]) {
                acc[typesId] = rootPkg.devDependencies[typesId];
              }
            }

            return acc;
          }, {}),
        },
      },
    },
  });
}

module.exports = ({ types }) => {
  const dependencies = new Set();
  let skip = false;

  return {
    visitor: {
      Program(path, { filename }) {
        dependencies.clear();
        skip = !filename.match(/\.demo\.tsx?$/);
      },

      ImportDeclaration(path) {
        if (skip) {
          return;
        }

        const source = path.node.source && path.node.source.value;

        if (source && !source.startsWith('.')) {
          dependencies.add(source);
        }
      },

      ExportDefaultDeclaration(path, { file }) {
        if (skip) {
          return;
        }

        const parameters = makeParameters(file.code, dependencies);

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
  };
};
