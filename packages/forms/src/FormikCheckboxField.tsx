import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
} from '@material-ui/core';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React, { ReactNode } from 'react';

import { useUID } from './internal/useUID';

interface CheckboxFieldProps
  extends Omit<CheckboxProps, 'onBlur' | 'onChange'>,
    Pick<FormControlLabelProps, 'label' | 'onBlur' | 'onChange'> {
  error?: boolean;
  helperText?: ReactNode;
}

function CheckboxField({
  label,
  error,
  checked,
  onBlur,
  onChange,
  helperText,
  ...rest
}: CheckboxFieldProps) {
  return (
    <FormControl error={error}>
      <FormControlLabel
        label={label}
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
        control={<Checkbox color="primary" disableRipple={true} {...rest} />}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export interface FormikCheckboxFieldProps extends CheckboxFieldProps {
  name: string;
  validate?: FieldValidator;
}

export function FormikCheckboxField({
  id,
  name,
  validate,

  onBlur,
  onChange,
  disabled,
  helperText,
  ...rest
}: FormikCheckboxFieldProps) {
  const uid = useUID();
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }] = useField({
    name,
    validate,
    type: 'checkbox',
  });
  const errorMessage = touched && error;

  return (
    <CheckboxField
      {...rest}
      {...field}
      id={id || uid}
      error={!!errorMessage}
      disabled={disabled || isSubmitting}
      helperText={errorMessage || helperText}
      onBlur={event => {
        onBlur?.(event);
        field.onBlur(event);
      }}
      onChange={(event, checked) => {
        onChange?.(event, checked);
        field.onChange(event);
      }}
    />
  );
}
