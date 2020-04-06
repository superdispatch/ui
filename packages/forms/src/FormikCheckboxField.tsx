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
  ...props
}: CheckboxFieldProps) {
  return (
    <FormControl error={error}>
      <FormControlLabel
        label={label}
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
        control={<Checkbox color="primary" disableRipple={true} {...props} />}
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
  ...props
}: FormikCheckboxFieldProps) {
  const uid = useUID();
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }] = useField({
    name,
    validate,
    type: 'checkbox',
  });
  const errorText = touched && error;

  return (
    <CheckboxField
      {...props}
      {...field}
      id={id || uid}
      error={!!errorText}
      disabled={disabled || isSubmitting}
      helperText={errorText || helperText}
      onBlur={(event) => {
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
