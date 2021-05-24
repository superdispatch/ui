import { SvgIcon } from '@material-ui/core';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideAutocomplete(theme: SuperDispatchTheme): void {
  const sm = theme.breakpoints.up('sm');

  // Remove `Object.assign` after official release of `Autocomplete`.
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
        margin: '4px',
        [sm]: { margin: '2px' },
      },
      endAdornment: {
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
      },
      popupIndicator: {
        '& .MuiSvgIcon-root': {
          fontSize: '24px',
          [sm]: { fontSize: '16px' },
        },
      },
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          padding: '6px 8px',

          '& $input': {
            width: '144px',
            padding: '4px',
          },

          '& $input:first-child': { paddingLeft: undefined },
          '& $endAdornment': { right: '12px' },

          [sm]: {
            padding: theme.spacing(0.5, 0.75),
            '& $input': { padding: '2px' },
            '& $endAdornment': { right: '8px' },
          },
        },
      },
    },
  });
}
