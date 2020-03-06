'use strict';

const { join, relative } = require('path');

function getDeployInfo() {
  const { NETLIFY, BRANCH, REVIEW_ID } = process.env;

  return !NETLIFY ? null : { pr: REVIEW_ID, branch: BRANCH };
}

module.exports = ({ types }) => {
  return {
    visitor: {
      ExportDefaultDeclaration(path, { filename }) {
        if (!filename.match(/\.demo\.tsx?$/)) {
          return;
        }

        const deployInfo = getDeployInfo();

        if (!deployInfo) {
          return;
        }

        const { name } = path.node.declaration.id;

        const values = {
          ...deployInfo,
          filename: relative(join(__dirname, '..'), filename),
        };

        Object.entries(values).forEach(([key, value]) => {
          if (value) {
            path.insertAfter(
              types.assignmentExpression(
                '=',
                types.memberExpression(
                  types.identifier(name),
                  types.identifier(key),
                ),
                types.stringLiteral(value),
              ),
            );
          }
        });
      },
    },
  };
};
