import {
  ButtonBase,
  InputAdornment,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Color } from '@superdispatch/ui';
import { forwardRef, useMemo } from 'react';

import {
  CountryISO,
  formatCountry,
  getCountryCode,
} from '../country-code-metadata/CountryCodeMetadata';
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
  country: CountryISO;
}

export const PhoneFieldStartAdornment = forwardRef<
  HTMLDivElement,
  PhoneFieldProps
>(({ country, onClick, isExpanded }, ref) => {
  const styles = useStyles();
  const [title, countryCode] = useMemo(() => {
    const code = `+${getCountryCode(country)}`;

    return [`${formatCountry(country)}: ${code}`, code];
  }, [country]);

  return (
    <InputAdornment ref={ref} position="start" className={styles.root}>
      <ButtonBase
        title={title}
        onClick={onClick}
        className={styles.button}
        aria-expanded={isExpanded}
      >
        <PhoneFieldFlag country={country} />

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
