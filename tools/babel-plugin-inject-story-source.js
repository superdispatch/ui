'use strict';

module.exports = ({ types }) => ({
  visitor: {
    CallExpression(path, { file }) {
      const { node } = path;

      if (
        node.arguments.length > 0 &&
        node.callee.name === 'makePlayroomStory'
      ) {
        const { format } = require('prettier');
        const [jsx, options = types.objectExpression([])] = node.arguments;
        const jsxSource = format(file.code.slice(jsx.start, jsx.end), {
          semi: false,
          parser: 'babel',
          printWidth: 120,
          trailingComma: 'none',
        })
          // Remove leading semi.
          .replace(/^;/, '');

        node.arguments = [jsx, options, types.stringLiteral(jsxSource)];
      }
    },
  },
});
