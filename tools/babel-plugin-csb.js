'use strict';

const p = require('path');
const _ = require('lodash');
const execa = require('execa');
const { getParameters } = require('codesandbox-import-utils/lib/api/define');

function listPackages() {
  const { stdout, stderr } = execa.sync('lerna', [
    'list',
    '--json',
    '--loglevel=silent',
  ]);

  if (stderr) {
    throw new Error(stderr);
  }

  return JSON.parse(stdout).map(pkg => ({
    ...pkg,
    ...require(p.join(pkg.location, 'package.json')),
  }));
}

const rootPkg = require('../package');
const packages = listPackages();

const indexFile = `
import React from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@superdispatch/ui';
import Demo from './demo';

ReactDOM.render(
  <ThemeProvider
    modifier={theme => {
      // Modify theme here.

      return theme;
    }}
  >
    <Box padding={2}>
      <Demo />
    </Box>
  </ThemeProvider>,
  document.getElementById('root')
);
`.trim();

function makeParams(name, code, codeDependencies) {
  const dependencies = new Map();

  // Add modules used in demo code.
  codeDependencies.forEach(id => {
    // Use versions from `root` package dev dependencies if possible.
    dependencies.set(id, rootPkg.devDependencies[id] || 'latest');
  });

  // Add peer dependencies of required modules.
  packages.forEach(pkg => {
    if (pkg.peerDependencies && codeDependencies.has(pkg.name)) {
      dependencies.set(pkg.name, pkg.version);

      Object.entries(pkg.peerDependencies).forEach(([id, version]) => {
        dependencies.set(id, version);
      });
    }
  });

  // Remove direct dependencies of required modules.
  packages.forEach(pkg => {
    if (pkg.dependecies && codeDependencies.has(pkg.name)) {
      Object.keys(pkg.dependecies).forEach(id => {
        codeDependencies.delete(id);
      });
    }
  });

  return getParameters({
    files: {
      'demo.tsx': { content: code },
      'index.tsx': { content: indexFile },
      'sandbox.config.json': {
        content: { template: 'create-react-app-typescript' },
      },
      'package.json': {
        content: {
          main: 'index.tsx',
          title: `${_.startCase(name)} | Super Dispatch UI`,
          scripts: { start: 'react-scripts start' },
          dependencies: Object.fromEntries(dependencies.entries()),
        },
      },
    },
  });
}

module.exports = ({ types }) => {
  let skip = false;
  let dependencies = new Set();

  return {
    visitor: {
      Program(path, { filename }) {
        skip = !filename.match(/\.demo\.tsx?$/);
        dependencies = new Set([
          // React app deps.
          'react',
          'react-dom',
          'react-scripts',

          // Always use UI package.
          '@superdispatch/ui',
        ]);
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
        const params = makeParams(name, file.code, dependencies);

        path.insertAfter(
          types.assignmentExpression(
            '=',
            types.memberExpression(
              types.identifier(name),
              types.identifier('csbParams'),
            ),
            types.stringLiteral(params),
          ),
        );
      },
    },
  };
};
