// yarn codemod --plugin ./tools/codemods/normalize-story-name.js packages/

'use strict';

const { camelCase } = require('lodash');

module.exports = ({ types }) => ({
  visitor: {
    ExportNamedDeclaration(path, { filename }) {
      const { node } = path;

      if (!filename || !filename.endsWith('.stories.tsx')) {
        return;
      }

      if (!types.isVariableDeclaration(node.declaration)) {
        return;
      }

      const { declaration } = node;

      for (const declarator of declaration.declarations) {
        if (!types.isVariableDeclarator(declarator)) {
          continue;
        }

        const { id, init } = declarator;

        if (!types.isArrowFunctionExpression(init)) {
          continue;
        }

        const camelCaseID = camelCase(id.name);

        if (id.name !== camelCaseID) {
          declarator.id = types.identifier(camelCaseID);
        }
      }
    },
  },
});
