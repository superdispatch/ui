const { configure, addDecorator, addParameters } = require('@storybook/react');

const { withInfo } = require('@storybook/addon-info');
const { INITIAL_VIEWPORTS } = require('@storybook/addon-viewport');

const req = require.context('../packages', true, /\.story\.tsx$/);

addDecorator(withInfo({ disable: true, header: false, source: true, propTables: false }));
addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });
configure(() => req.keys().forEach(filename => req(filename)), module);
