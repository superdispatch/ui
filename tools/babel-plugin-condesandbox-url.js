'use strict';

const _ = require('lodash');
const { getParameters } = require('codesandbox-import-utils/lib/api/define');

const rootPkg = require('../package');
const uiPkg = require('../packages/ui/package');

const indexFile = `
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '${uiPkg.name}';
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

function makeParameters(name, code, codeDependencies) {
  const demoDependencies = new Set([
    'react',
    'react-dom',
    'react-scripts',
    uiPkg.name,
    ...Object.keys(uiPkg.peerDependencies),
    ...codeDependencies,
  ]);

  Object.keys(uiPkg.dependencies).forEach(id => demoDependencies.delete(id));

  return getParameters({
    files: {
      'demo.tsx': { content: code },
      'index.tsx': { content: indexFile },
      'package.json': {
        content: {
          title: `${_.startCase(name)} | Super Dispatch UI`,
          scripts: { start: 'react-scripts start' },
          main: 'index.tsx',
          dependencies: Array.from(demoDependencies).reduce((acc, id) => {
            if (id === uiPkg.name) {
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

        const { name } = path.node.declaration.id;

        const parameters = makeParameters(name, file.code, dependencies);

        path.insertAfter(
          types.assignmentExpression(
            '=',
            types.memberExpression(
              types.identifier(name),
              types.identifier('codeSandboxParameters'),
            ),
            types.stringLiteral(parameters),
          ),
        );
      },
    },
  };
};
