import { SvgIcon } from '@material-ui/core';
import React from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function overrideAutocomplete(theme: SuperDispatchTheme) {
  const sm = theme.breakpoints.up('sm');

  // TODO: Remove `Object.assign` after official release of `Autocomplete`.
  Object.assign(theme.props, {
    MuiAutocomplete: {
      popupIcon: (
        <SvgIcon>
          <path d="M12 16.5L6 9h12l-6 7.5z" fill="currentColor" />
        </SvgIcon>
      ),
    },
  });

  Object.assign(theme.overrides, {
    MuiAutocomplete: {
      paper: { ...theme.typography.body2 },
      tag: {
        margin: theme.spacing(0.5),
        [sm]: { margin: theme.spacing(0.25) },
      },
      endAdornment: {
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
      },
      popupIndicator: {
        '& .MuiSvgIcon-root': {
          fontSize: theme.spacing(3),
          [sm]: { fontSize: theme.spacing(2) },
        },
      },
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          padding: theme.spacing(0.75, 1),

          '& $input': {
            padding: theme.spacing(0.5),
            minWidth: theme.spacing(18),
          },

          '& $input:first-child': { paddingLeft: undefined },
          '& $endAdornment': { right: theme.spacing(1.5) },

          [sm]: {
            padding: theme.spacing(0.5, 0.75),
            '& $input': { padding: theme.spacing(0.25) },
            '& $endAdornment': { right: theme.spacing(1) },
          },
        },
      },
    },
  });
}
