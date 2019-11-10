'use strict';

const { getParameters } = require('codesandbox/lib/api/define');

const indexFile = `
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@superdispatch/ui';
import Demo from './demo';

ReactDOM.render(<ThemeProvider><Demo /></ThemeProvider>, document.getElementById('root'));
`;

const packageJson = {
  title: 'Super Dispatch UI Demo',
  scripts: { start: 'react-scripts start' },
  main: 'index.tsx',
  dependencies: {
    '@material-ui/core': 'latest',
    '@material-ui/icons': 'latest',
    '@mdi/js': 'latest',
    '@superdispatch/ui': 'latest',
    lodash: 'latest',
    moment: 'latest',
    react: 'latest',
    'react-dom': 'latest',
  },
  devDependencies: {
    '@types/react': 'latest',
    '@types/react-dom': 'latest',
    typescript: 'latest',
    'react-scripts': 'latest',
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
