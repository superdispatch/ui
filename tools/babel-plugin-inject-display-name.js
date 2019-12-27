'use strict';

module.exports = ({ types }) => ({
  visitor: {
    VariableDeclarator: path => {
      let { id, init } = path.node;

      if (
        !init ||
        init.type !== 'CallExpression' ||
        init.callee.name !== 'forwardRef'
      ) {
        return;
      }

      let { name } = id;

      path.parentPath.insertAfter(
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
