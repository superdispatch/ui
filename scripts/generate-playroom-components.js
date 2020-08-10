'use strict';

const fs = require('fs');
const path = require('path');

const PLAYROOM_DIR = path.join(__dirname, '..', 'packages', 'playroom');
const PLAYROOM_GENERATED_DIR = path.join(PLAYROOM_DIR, 'generated');
const PLAYROOM_COMPONENTS_FILE = path.join(
  PLAYROOM_GENERATED_DIR,
  'components.ts',
);

const lines = [];

//
// Internals
//

lines.push("export * from '../Placeholder';");
lines.push("export * from '../UseState';");

//
// SD Components
//

lines.push(
  "export * from '@superdispatch/ui/playroom';",
  "export * from '@superdispatch/dates/playroom';",
  "export * from '@superdispatch/phones/playroom';",
);

//
// MaterialUI
//

lines.push("type MuiComponent<T> = import('react').FunctionComponent<T>");

reexportModules('@material-ui/core', {
  filter(name, Component) {
    return (
      isComponentLike(name, Component) &&
      !!Component.propTypes &&
      !name.endsWith('Provider') &&
      !name.startsWith('Unstable_') &&
      ![
        // Overridden components.
        'Button',
        'Snackbar',
        'SnackbarContent',

        // Overridden for docs.

        'Dialog',

        // Non UI components.
        'NoSsr',
        'Portal',
        'RootRef',
        'ButtonBase',
        'CssBaseline',
        'ClickAwayListener',
      ].includes(name)
    );
  },

  reexport: reexportMuiModule,
});

reexportModules('@material-ui/lab', {
  reexport: reexportMuiModule,
});

// Icons

lines.push(
  "type MuiIcon = import('react').FunctionComponent<import('@material-ui/core/SvgIcon').SvgIconProps>",
);

reexportModules('@material-ui/icons', {
  filter(name) {
    return (
      !name.endsWith('Sharp') &&
      !name.endsWith('Rounded') &&
      !name.endsWith('TwoTone') &&
      !name.endsWith('Outlined')
    );
  },
  reexport(name, Component, source) {
    const internalName = `${name}IconInternal`;

    return [
      `import ${internalName} from '${source}/${name}';`,
      `export const ${name}Icon = ${internalName} as MuiIcon;`,
    ].join('\n');
  },
});

fs.mkdirSync(PLAYROOM_GENERATED_DIR, { recursive: true });
fs.writeFileSync(PLAYROOM_COMPONENTS_FILE, lines.join('\n'), 'utf-8');

//
// Utils
//

function isComponentLike(name, Component) {
  return (
    name[0] === name[0].toUpperCase() &&
    (typeof Component === 'object' || typeof Component === 'function')
  );
}

function getComponentProps(Component, propsToIgnore = new Set()) {
  const { propTypes } = Component.Naked || Component;
  const props = [];

  if (propTypes) {
    const ignoredProps = new Set(['children', 'className', 'component']);

    for (const prop of Object.keys(propTypes)) {
      if (
        !prop.startsWith('mui') &&
        !prop.startsWith('aria') &&
        !prop.toLowerCase().includes('classes') &&
        !ignoredProps.has(prop) &&
        !propsToIgnore.has(prop)
      ) {
        props.push(prop);
      }
    }
  }

  return props;
}

function reexportMuiModule(name, Component, source) {
  let propsType = `${name}Props`;
  const internalName = `${name}Internal`;
  const propsToPick = getComponentProps(
    Component,
    new Set(
      name === 'Tab'
        ? [
            'fullWidth',
            'indicator',
            'onChange',
            'onClick',
            'onFocus',
            'selected',
            'selectionFollowsFocus',
            'textColor',
          ]
        : name === 'StepButton'
        ? [
            'active',
            'alternativeLabel',
            'completed',
            'disabled',
            'expanded',
            'last',
            'orientation',
          ]
        : [],
    ),
  );

  if (name === 'Autocomplete') {
    propsType = `${propsType}<unknown, undefined, undefined, undefined>`;
  }

  if (propsToPick && propsToPick.length) {
    propsType = `Pick<${propsType}, ${propsToPick
      .map((prop) => `'${prop}'`)
      .join(' | ')}>`;
  }

  return [
    `import ${internalName}, { ${name}Props } from '${source}/${name}';`,
    `export const ${name} = ${internalName} as MuiComponent<${propsType}>;`,
  ].join('\n');
}

function reexportModules(
  source,
  {
    filter = isComponentLike,
    reexport = (name) =>
      `export { default as ${name} } from '${source}/${name}';`,
  } = {},
) {
  const pkg = require(source);

  for (const [name, Component] of Object.entries(pkg)) {
    if (filter(name, Component)) {
      lines.push(reexport(name, Component, source));
    }
  }
}
