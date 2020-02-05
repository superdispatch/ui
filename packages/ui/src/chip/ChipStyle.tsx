import { SvgIcon } from '@material-ui/core';
import React from 'react';

import { Color } from '..';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { getTypographyProp } from '../typography/TypographyStyles';

export function applyChipStyles(theme: SuperDispatchTheme) {
  theme.props.MuiChip = {
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

      '& .MuiChip-deleteIcon': {
        width: '1em',
        height: '1em',

        fontSize: 14,
        color: Color.Grey200,

        margin: '0 4px 0 0',
        borderRadius: '50%',
        backgroundColor: Color.Silver400,

        [theme.breakpoints.up('sm')]: {
          fontSize: 12,
          margin: '0 6px 0 0',
        },
      },

      '& .MuiChip-deleteIcon:hover': {
        color: Color.Grey400,
      },

      '&:active, &:hover': {
        backgroundColor: Color.Silver300,

        '& .MuiChip-deleteIcon': {
          backgroundColor: Color.Silver500,
        },
      },
      '&:focus': {
        boxShadow: `0 0 0 2px ${Color.Silver300}`,
      },
    },
    label: {
      paddingLeft: 6,
      paddingRight: 6,
      fontSize: getTypographyProp(theme, 'mobile', 'button', 'fontSize'),

      [theme.breakpoints.up('sm')]: {
        paddingLeft: 4,
        paddingRight: 4,
        fontSize: getTypographyProp(theme, 'desktop', 'button', 'fontSize'),
      },
    },
    disabled: {
      '& .MuiChip-label, & .MuiChip-deleteIcon': {
        color: Color.Grey100,
      },
    },
  };
}
