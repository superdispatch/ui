import {
  ButtonBase,
  InputAdornment,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Color } from '@superdispatch/ui';
import React, { forwardRef, useMemo } from 'react';

import { PHONE_FIELD_COUNTRIES } from '../data/PhoneMetadata';
import { PhoneRegionCode } from '../data/PhoneRegionCode';
import { getPhoneCountryCode } from '../data/PhoneUtils';
import { PhoneFieldFlag } from './PhoneFieldFlag';

const useStyles = makeStyles<Theme>(
  (theme) => ({
    root: {
      marginLeft: theme.spacing(-1),
      marginRight: 0,
    },
    button: {
      color: Color.Blue300,
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      borderRadius: theme.spacing(0.5, 0, 0, 0.5),
      '&:hover, &:focus': {
        backgroundColor: Color.Blue50,
      },
    },
  }),
  { name: 'SD-PhoneFieldStartAdornment' },
);

export interface PhoneFieldProps {
  onClick?: () => void;
  isExpanded?: boolean;
  region: PhoneRegionCode;
}

export const PhoneFieldStartAdornment = forwardRef<
  HTMLDivElement,
  PhoneFieldProps
>(({ region, onClick, isExpanded }, ref) => {
  const styles = useStyles();
  const [title, countryCode] = useMemo(() => {
    const code = `+${getPhoneCountryCode(region)}`;
    const country = PHONE_FIELD_COUNTRIES.get(region) as string;

    return [`${country}: ${code}`, code];
  }, [region]);

  return (
    <InputAdornment ref={ref} position="start" className={styles.root}>
      <ButtonBase
        title={title}
        onClick={onClick}
        className={styles.button}
        aria-expanded={isExpanded}
      >
        <PhoneFieldFlag code={region} />

        {isExpanded ? (
          <ArrowDropUp htmlColor={Color.Grey200} />
        ) : (
          <ArrowDropDown htmlColor={Color.Grey200} />
        )}

        <Typography color="textPrimary">{countryCode}</Typography>
      </ButtonBase>
    </InputAdornment>
  );
});
