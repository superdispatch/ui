import { StandardTextFieldProps, TextField } from '@material-ui/core';
import { useUID } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React, {
  ChangeEvent,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
} from 'react';

export interface FormikTextFieldProps
  extends Omit<StandardTextFieldProps, 'error'> {
  name: string;
  validate?: FieldValidator;
  formatError?: (error: string) => ReactNode;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => string;
  parse?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => unknown;
}

export const FormikTextField: ForwardRefExoticComponent<FormikTextFieldProps> = forwardRef(
  (
    {
      name,
      parse,
      format,
      validate,
      formatError,

      id,
      onBlur,
      onChange,
      disabled,
      helperText,
      ...props
    },
    ref,
  ) => {
    const uid = useUID(id);
    const { isSubmitting } = useFormikContext();
    const [field, { error, touched }, { setValue }] = useField<unknown>({
      name,
      validate,
    });
    const errorText: ReactNode =
      touched && (error && formatError ? formatError(error) : error);

    return (
      <TextField
        {...props}
        {...field}
        id={uid}
        ref={ref}
        name={name}
        error={!!errorText}
        helperText={errorText || helperText}
        disabled={disabled ?? isSubmitting}
        value={format ? format(field.value) : field.value}
        onBlur={(event) => {
          onBlur?.(event);
          field.onBlur(event);
        }}
        onChange={(event) => {
          onChange?.(event);

          if (parse) {
            setValue(parse(event));
          } else {
            field.onChange(event);
          }
        }}
      />
    );
  },
);
