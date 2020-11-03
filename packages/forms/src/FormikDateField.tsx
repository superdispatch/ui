import {
  DateField,
  DateFieldProps,
  DatePayload,
  DateString,
  parseDate,
  stringifyDate,
  useDateConfig,
} from '@superdispatch/dates';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

export interface FormikDateFieldProps extends Omit<DateFieldProps, 'error'> {
  name: string;
  validate?: (info: DatePayload) => void | string;
}

export function FormikDateField({
  name,
  format,
  onChange,
  disabled,
  helperText,
  validate: validateProp,
  ...props
}: FormikDateFieldProps) {
  const config = useDateConfig({ format });
  const { isSubmitting } = useFormikContext();
  const validate: FieldValidator = (value) => {
    if (!validateProp) {
      return undefined;
    }

    const dateValue = parseDate(value, config);

    return validateProp({
      config,
      dateValue,
      stringValue: stringifyDate(dateValue, config),
    });
  };

  const [{ value }, { error, touched }, { setValue, setTouched }] = useField<
    undefined | DateString
  >({ name, validate });
  const errorText = touched && error;

  return (
    <DateField
      {...props}
      name={name}
      value={value}
      format={format}
      error={!!errorText}
      disabled={disabled || isSubmitting}
      helperText={errorText || helperText}
      onChange={(nextValue) => {
        onChange?.(nextValue);
        setTouched(true, false);
        setValue(nextValue.stringValue);
      }}
    />
  );
}
