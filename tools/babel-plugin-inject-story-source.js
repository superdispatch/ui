'use strict';

module.exports = ({ types }) => {
  const makeParameters = (id, code) => {
    const parametersExpression = types.memberExpression(
      id,
      types.identifier('parameters'),
    );
    const codeIdentifier = types.identifier('code');
    const codeObjectProperty = types.objectProperty(
      codeIdentifier,
      codeIdentifier,
      false,
      true,
    );

    return types.blockStatement([
      types.variableDeclaration('const', [
        types.variableDeclarator(codeIdentifier, types.stringLiteral(code)),
      ]),

      types.expressionStatement(
        types.assignmentExpression(
          '=',
          parametersExpression,
          types.objectExpression([
            types.objectProperty(
              types.identifier('playroom'),
              types.objectExpression([codeObjectProperty]),
            ),

            types.objectProperty(
              types.identifier('docs'),
              types.objectExpression([
                types.objectProperty(
                  types.identifier('source'),
                  types.objectExpression([codeObjectProperty]),
                ),
              ]),
            ),

            types.spreadElement(parametersExpression),
          ]),
        ),
      ),
    ]);
  };

  return {
    visitor: {
      ExportNamedDeclaration(path, { file, filename }) {
        const { node, parentPath } = path;

        if (!filename || !filename.endsWith('.stories.tsx')) {
          return;
        }

        if (!types.isVariableDeclaration(node.declaration)) {
          return;
        }

        for (const declarator of node.declaration.declarations) {
          if (!types.isVariableDeclarator(declarator)) {
            continue;
          }

          const { id, init } = declarator;

          if (!types.isArrowFunctionExpression(init)) {
            continue;
          }

          const { body, params } = init;

          if (params.length > 0) {
            continue;
          }

          if (!types.isJSXElement(body)) {
            continue;
          }

          const { format } = require('prettier');
          const code = format(file.code.slice(body.start, body.end), {
            semi: false,
            parser: 'babel',
            printWidth: 120,
            trailingComma: 'none',
          })
            // Remove leading semi.
            .replace(/^;/, '');

          parentPath.node.body.push(makeParameters(id, code));
        }
      },
    },
  };
};
