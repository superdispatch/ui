'use strict';

const { join, relative } = require('path');

const { GITHUB_REF } = process.env;
const GITHUB_BRANCH = GITHUB_REF === 'refs/heads/master' ? 'master' : null;

const DEMO_FILE_REGEXP = /\.demo\.tsx?$/;

module.exports = ({ types }) => {
  return {
    visitor: {
      ExportDefaultDeclaration(path, { filename }) {
        if (!GITHUB_BRANCH) {
          return;
        }

        if (!DEMO_FILE_REGEXP.test(filename)) {
          return;
        }

        const { name } = path.node.declaration.id;

        const values = {
          branch: GITHUB_BRANCH,
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
