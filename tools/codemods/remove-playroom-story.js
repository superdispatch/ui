// yarn codemod --plugin ./tools/codemods/remove-playroom-story.js packages/

'use strict';

module.exports = ({ types }) => ({
  visitor: {
    ImportDeclaration(path) {
      if (
        path.node.source.value ===
        '@superdispatch/ui-playroom/makePlayroomStory'
      ) {
        path.remove();
      }
    },

    ExportNamedDeclaration(path, { file }) {
      const { node } = path;

      if (!types.isVariableDeclaration(node.declaration)) {
        return;
      }

      const { declaration } = node;

      for (const declarator of declaration.declarations) {
        if (!types.isVariableDeclarator(declarator)) {
          continue;
        }

        const { init } = declarator;

        if (
          !types.isCallExpression(init) ||
          init.callee.name !== 'makePlayroomStory'
        ) {
          continue;
        }

        const [jsx, options] = init.arguments;

        if (options) {
          const optionsCode = file.code.slice(options.start, options.end);

          path.addComment('leading', ` Removed options: "${optionsCode}" `);
        }

        declarator.init = types.arrowFunctionExpression([], jsx);
      }
    },
  },
});
