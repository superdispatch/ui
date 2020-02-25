import { SvgIcon } from '@material-ui/core';
import React from 'react';

import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function applyAutocompleteStyles(theme: SuperDispatchTheme) {
  // TODO: Remove `Object.assign` after official release of `Autocomplete`.

  Object.assign(theme.props, {
    MuiAutocomplete: {
      disableClearable: true,
      closeIcon: (
        <SvgIcon>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M13.239 12L17 8.239 15.761 7 12 10.761 8.239 7 7 8.239 10.761 12 7 15.761 8.239 17 12 13.239 15.761 17 17 15.761 13.239 12z"
          />
        </SvgIcon>
      ),
    },
  });

  Object.assign(theme.overrides, {
    MuiAutocomplete: {
      paper: { ...theme.typography.body2 },
      tag: {
        margin: theme.spacing(0.5),

        [theme.breakpoints.up('sm')]: {
          margin: theme.spacing(0.25),
        },
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
        },
      },
      clearIndicator: {
        '& .MuiSvgIcon-root': {
          color: Color.Grey100,
          fontSize: theme.spacing(3),

          [theme.breakpoints.up('sm')]: {
            fontSize: theme.spacing(2),
          },
        },
      },
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          padding: theme.spacing(0.75, 1),

          '& $input': {
            padding: theme.spacing(0.5),
            minWidth: theme.spacing(12),
          },

          '& $input:first-child': {
            paddingLeft: undefined,
          },

          '& $endAdornment': {
            right: theme.spacing(1.5),
          },

          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(0.5, 0.75),

            '& $input': {
              padding: theme.spacing(0.25),
            },

            '& $endAdornment': {
              right: theme.spacing(1),
            },
          },
        },
      },
    },
  });
}
