import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  RadioGroup,
  RadioGroupProps,
} from '@material-ui/core';
import React, { ReactNode } from 'react';

export interface RadioGroupFieldProps
  extends Omit<FormControlProps, 'hiddenLabel' | 'onChange'>,
    Pick<RadioGroupProps, 'name' | 'value' | 'onChange'> {
  RadioGroupProps?: Omit<RadioGroupProps, 'value' | 'onChange' | 'children'>;

  label?: ReactNode;
  FormLabelProps?: Omit<FormLabelProps, 'children'>;

  helperText?: ReactNode;
  FormHelperTextProps?: Omit<FormHelperTextProps, 'children'>;
}

export function RadioGroupField({
  name,
  value = '',
  onChange,
  RadioGroupProps: radioGroupProps,

  label,
  FormLabelProps: formLabelProps,

  helperText,
  FormHelperTextProps: formHelperTextProps,

  children,

  ...formControlProps
}: RadioGroupFieldProps) {
  return (
    <FormControl {...formControlProps} hiddenLabel={!label}>
      {!!label && <FormLabel {...formLabelProps}>{label}</FormLabel>}

      <RadioGroup
        {...radioGroupProps}
        name={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </RadioGroup>

      {!!helperText && (
        <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
