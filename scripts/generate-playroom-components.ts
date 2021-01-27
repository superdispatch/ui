'use strict';

import * as MaterialUICore from '@material-ui/core';
import * as MaterialUIIcons from '@material-ui/icons';
import * as MaterialUILab from '@material-ui/lab';
import * as fs from 'fs';
import * as path from 'path';

const DOCS_DIR = path.join(__dirname, '..', 'packages', '__docs__');
const PLAYROOM_GENERATED_DIR = path.join(DOCS_DIR, 'generated');
const PLAYROOM_COMPONENTS_FILE = path.join(
  PLAYROOM_GENERATED_DIR,
  'components.ts',
);

const lines = [];

//
// Internals
//

lines.push("export * from '../Placeholder';", "export * from '../UseState';");

//
// @superdispatch/*
//

lines.push(
  "export * from '@superdispatch/ui/playroom';",
  "export * from '@superdispatch/ui-lab/playroom';",
  "export * from '@superdispatch/dates/playroom';",
  "export * from '@superdispatch/phones/playroom';",
);

//
// @material-ui/core and @material-ui/lab
//

{
  lines.push("type MuiComponent<T> = import('react').FunctionComponent<T>");

  const skipComponents = new Set([
    // Overridden components.
    'Box',
    'Button',
    'Snackbar',
    'SnackbarContent',

    // Overridden for docs.
    'Dialog',
    'Drawer',

    // Non UI components.
    'NoSsr',
    'Portal',
    'RootRef',
    'ButtonBase',
    'CssBaseline',
    'ClickAwayListener',
  ]);

  reexportModules(
    MaterialUICore,
    reexportMuiModule.bind(null, '@material-ui/core'),
    (name, Component) =>
      isComponentLike(name, Component) &&
      !!Component.propTypes &&
      !name.endsWith('Provider') &&
      !name.startsWith('Unstable_') &&
      !skipComponents.has(name),
  );

  reexportModules(
    MaterialUILab,
    reexportMuiModule.bind(null, '@material-ui/lab'),
  );
}

//
// @material-ui/icons
//

{
  lines.push(
    "type MuiIcon = import('react').FunctionComponent<import('@material-ui/core/SvgIcon').SvgIconProps>",
  );

  reexportModules(
    MaterialUIIcons,
    (name) => {
      const internalName = `${name}IconInternal`;

      return [
        `import ${internalName} from '@material-ui/icons/${name}';`,
        `export const ${name}Icon = ${internalName} as MuiIcon;`,
      ].join('\n');
    },
    (name) =>
      !name.endsWith('Sharp') &&
      !name.endsWith('Rounded') &&
      !name.endsWith('TwoTone') &&
      !name.endsWith('Outlined'),
  );

  fs.mkdirSync(PLAYROOM_GENERATED_DIR, { recursive: true });
  fs.writeFileSync(PLAYROOM_COMPONENTS_FILE, lines.join('\n'), 'utf-8');
}

//
// Utils
//

interface ComponentLike {
  Naked?: ComponentLike;
  propTypes?: Record<string, unknown>;
}

function isComponentLike(
  name: string,
  Component: unknown,
): Component is ComponentLike {
  return (
    name[0] === name[0].toUpperCase() &&
    (typeof Component === 'object' || typeof Component === 'function')
  );
}

function getComponentProps(
  Component: ComponentLike,
  propsToIgnore = new Set<string>(),
): string[] {
  const { propTypes } = Component.Naked || Component;
  const props: string[] = [];

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

function reexportMuiModule(
  source: string,
  name: string,
  Component: ComponentLike,
): string {
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

  if (propsToPick.length) {
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
  module: Record<string, unknown>,
  reexport: (name: string, Component: ComponentLike) => string,
  filter: (name: string, Component: unknown) => boolean = isComponentLike,
) {
  for (const [name, Component] of Object.entries(module)) {
    if (filter(name, Component)) {
      lines.push(reexport(name, Component as ComponentLike));
    }
  }
}
