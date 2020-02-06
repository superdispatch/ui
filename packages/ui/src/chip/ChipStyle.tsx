import { SvgIcon } from '@material-ui/core';
import React from 'react';

import { Color } from '..';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { getTypographyProp } from '../typography/TypographyStyles';

export function applyChipStyles(theme: SuperDispatchTheme) {
  theme.props.MuiChip = {
    size: 'small',
    deleteIcon: (
      <SvgIcon viewBox="0 0 12 12">
        <path d="M4 8l4-4M4 8l4-4M8 8L4 4m4 4L4 4" stroke="currentColor" />
      </SvgIcon>
    ),
  };
  theme.overrides.MuiChip = {
    root: {
      height: undefined,
      transition: undefined,
      borderRadius: 4,
      backgroundColor: Color.Silver200,
      fontSize: getTypographyProp(theme, 'mobile', 'button', 'fontSize'),
      lineHeight: getTypographyProp(theme, 'mobile', 'button', 'lineHeight'),

      '&:active, &:hover': {
        backgroundColor: Color.Silver300,

        '& $deleteIcon': {
          backgroundColor: Color.Silver500,
        },
      },
      '&:focus': {
        boxShadow: `0 0 0 2px ${Color.Silver300}`,
      },

      [theme.breakpoints.up('sm')]: {
        fontSize: getTypographyProp(theme, 'desktop', 'button', 'fontSize'),
        lineHeight: getTypographyProp(theme, 'desktop', 'button', 'lineHeight'),
      },
    },

    sizeSmall: {
      height: undefined,
    },

    labelSmall: {
      paddingLeft: 6,
      paddingRight: 6,

      [theme.breakpoints.up('sm')]: {
        paddingLeft: 4,
        paddingRight: 4,
      },
    },

    clickable: {
      '&:hover, &:focus': {
        backgroundColor: undefined,
      },
      '&:active': {
        boxShadow: undefined,
      },
    },

    deletable: {
      '&:focus': {
        backgroundColor: undefined,
      },
    },

    deleteIcon: {
      fontSize: '1em',
      width: undefined,
      height: undefined,
      color: Color.Grey200,
      backgroundColor: Color.Silver400,

      '&:hover': {
        color: undefined,
      },
    },

    deleteIconSmall: {
      width: undefined,
      height: undefined,

      marginLeft: 0,
      marginRight: 6,

      borderRadius: '50%',

      [theme.breakpoints.up('sm')]: {
        marginRight: 4,
      },
    },

    disabled: {
      color: Color.Grey100,
    },

    icon: {
      fontSize: '1em',
      marginRight: undefined,
    },

    iconSmall: {
      width: undefined,
      height: undefined,
      marginLeft: 8,
      marginRight: undefined,

      [theme.breakpoints.up('sm')]: {
        marginLeft: 4,
      },
    },
  };
}
