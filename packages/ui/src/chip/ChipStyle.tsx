import { SvgIcon } from '@material-ui/core';
import React from 'react';

import { Color } from '..';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function applyChipStyles(theme: SuperDispatchTheme) {
  theme.props.MuiChip = {
    size: 'small',
    deleteIcon: (
      <div>
        <SvgIcon>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.239 12L17 8.239 15.761 7 12 10.761 8.239 7 7 8.239 10.761 12 7 15.761 8.239 17 12 13.239 15.761 17 17 15.761 13.239 12z"
            fill="currentColor"
          />
        </SvgIcon>
      </div>
    ),
  };
  theme.overrides.MuiChip = {
    root: {
      ...theme.typography.body2,
      color: undefined,
      height: undefined,
      borderRadius: 4,
      backgroundColor: Color.Silver200,
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
      '&:focus': {
        boxShadow: `0 0 0 2px ${Color.Silver300}`,
      },
      '&:active, &:hover': {
        backgroundColor: Color.Silver300,
      },
    },

    deletable: {
      '&:focus': {
        backgroundColor: undefined,
        boxShadow: `0 0 0 2px ${Color.Silver300}`,
      },
    },

    deleteIcon: {
      width: undefined,
      height: undefined,
      display: 'flex',
      borderRadius: '50%',
      transition: theme.transitions.create('background-color'),

      '&:active, &:hover, &:focus': {
        backgroundColor: Color.Silver400,
      },

      '& > svg': {
        color: Color.Grey200,
        fontSize: '1em',
      },
    },

    deleteIconSmall: {
      width: undefined,
      height: undefined,

      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.25),

      [theme.breakpoints.up('sm')]: {
        marginRight: 0,
      },
    },

    disabled: {
      opacity: undefined,
      color: Color.Grey100,
    },

    icon: {
      color: Color.Grey100,
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
