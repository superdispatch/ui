'use strict';

module.exports = (api) => {
  api.cache(() =>
    JSON.stringify({
      NODE_ENV: process.env.NODE_ENV,
      NETLIFY: process.env.NETLIFY,
      BRANCH: process.env.BRANCH,
      REVIEW_ID: process.env.REVIEW_ID,
    }),
  );

  return {
    plugins: [
      require.resolve('./babel-plugin-deploy-info'),
      [
        'babel-plugin-direct-import',
        {
          modules: [
            '@material-ui/lab',
            '@material-ui/core',
            '@material-ui/icons',
            '@material-ui/styles',
          ],
        },
      ],
    ],
    presets: [['@superdispatch/babel-preset', { targets: 'esmodules' }]],
  };
};
