'use strict';

module.exports = ({ types }) => ({
  visitor: {
    CallExpression(path) {
      let { node, parentPath } = path;

      if (node.callee.name !== 'forwardRef') {
        return;
      }

      // Handles `const Foo = forwardRef((c++, (props, ref) => (…)))`.
      // See: https://github.com/kentcdodds/import-all.macro/issues/7#issuecomment-387502208
      while (parentPath.type === 'SequenceExpression') {
        parentPath = parentPath.parentPath;
      }

      if (parentPath.type !== 'VariableDeclarator') {
        return;
      }

      let { name } = parentPath.node.id;

      parentPath.parentPath.insertAfter(
        types.ifStatement(
          types.binaryExpression(
            '!==',
            types.memberExpression(
              types.memberExpression(
                types.identifier('process'),
                types.identifier('env'),
              ),
              types.identifier('NODE_ENV'),
            ),
            types.stringLiteral('production'),
          ),

          types.expressionStatement(
            types.assignmentExpression(
              '=',
              types.memberExpression(
                types.identifier(name),
                types.identifier('displayName'),
              ),
              types.stringLiteral(name),
            ),
          ),
        ),
      );
    },
  },
});
