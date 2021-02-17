import {
  DateField,
  DateFieldProps,
  DatePayload,
  NullableDateInput,
  parseDate,
  stringifyDate,
  useDateConfig,
} from '@superdispatch/dates';
import { useField, useFormikContext } from 'formik';
import { forwardRef, ReactElement } from 'react';

export interface FormikDateFieldProps extends Omit<DateFieldProps, 'error'> {
  name: string;
  validate?: (info: DatePayload) => void | string;
}

export const FormikDateField = forwardRef<HTMLDivElement, FormikDateFieldProps>(
  (
    {
      name,
      format,
      onChange,
      disabled,
      helperText,
      validate: validateProp,
      ...props
    },
    ref,
  ): ReactElement => {
    const config = useDateConfig({ format });
    const { isSubmitting } = useFormikContext();

    function validate(value: unknown): void | string {
      if (!validateProp) return;

      const dateValue = parseDate(value as NullableDateInput, config);
      return validateProp({
        config,
        dateValue,
        stringValue: stringifyDate(dateValue, config),
      });
    }

    const [
      { value },
      { error, touched },
      { setValue, setTouched },
    ] = useField<NullableDateInput>({ name, validate });
    const errorText = touched && error;

    return (
      <DateField
        {...props}
        ref={ref}
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
  },
);
