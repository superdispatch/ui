'use strict';

module.exports = ({ types }) => ({
  visitor: {
    ExportNamedDeclaration(path) {
      const { node } = path;

      if (node.declaration.type !== 'VariableDeclaration') {
        return;
      }

      node.declaration.declarations.forEach(declarator => {
        if (declarator.type !== 'VariableDeclarator') {
          return;
        }

        if (declarator.init.type !== 'CallExpression') {
          return;
        }

        types.addComment(declarator.init, 'leading', '#__PURE__');
      });
    },
  },
});
