import { StyleRules } from '@material-ui/core';
import { PaginationItemClassKey, PaginationItemProps } from '@material-ui/lab';
import { CSSProperties } from '@material-ui/styles';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

type Overrides<T extends string> = Partial<StyleRules<T>> & {
  MuiCssBaseline?: CSSProperties | string;
};

export function overridePagination(theme: SuperDispatchTheme): void {
  const props: Partial<PaginationItemProps> = {};
  const overrides: Overrides<PaginationItemClassKey> = {
    root: {
      color: Color.Grey400,
    },
    page: {
      '&:hover': {
        backgroundColor: Color.Silver200,
      },
      '&$focusVisible': {
        borderRadius: 4,
        backgroundColor: Color.White,
        border: `1px solid ${Color.Blue100}`,
      },
      '&$selected': {
        backgroundColor: Color.Silver400,
        '&:hover, &$focusVisible': {
          backgroundColor: Color.Silver400,
        },
        '&$disabled': {
          color: Color.Grey100,
          backgroundColor: Color.Silver400,
        },
      },

      '&$disabled': {
        opacity: undefined,
        color: Color.Grey100,
      },
    },
  };

  // Remove `Object.assign` after official release of `PaginationItem`.
  Object.assign(theme.props, { MuiPaginationItem: props });
  Object.assign(theme.overrides, { MuiPaginationItem: overrides });
}
