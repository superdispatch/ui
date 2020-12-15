import { StandardTextFieldProps, TextField } from '@material-ui/core';
import { useUID } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import {
  ChangeEvent,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
} from 'react';

function parseInputValue(
  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
): unknown {
  return event.target.value;
}

function formatInputValue(value: unknown): string {
  if (value == null) {
    return '';
  }

  return String(value);
}

function formatInputError(error: string): ReactNode {
  return error || undefined;
}

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

      validate,

      id,
      onBlur,
      onChange,
      disabled,
      helperText,

      parse = parseInputValue,
      format = formatInputValue,
      formatError = formatInputError,
      ...props
    },
    ref,
  ) => {
    const uid = useUID(id);
    const { isSubmitting } = useFormikContext();
    const [
      field,
      { error, touched },
      { setValue, setTouched },
    ] = useField<unknown>({ name, validate });
    const errorText: ReactNode = touched && error && formatError(error);

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
        value={format(field.value)}
        onBlur={(event) => {
          onBlur?.(event);

          if (!event.defaultPrevented) {
            setTouched(true);
          }
        }}
        onChange={(event) => {
          onChange?.(event);

          if (!event.defaultPrevented) {
            setValue(parse(event));
          }
        }}
      />
    );
  },
);
