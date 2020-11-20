import {
  FormControl,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
} from '@material-ui/core';
import { forwardRef, ForwardRefExoticComponent, ReactNode } from 'react';

export interface CheckboxGroupFieldProps
  extends Omit<FormControlProps, 'hiddenLabel' | 'onChange'> {
  FormGroupProps?: Omit<FormGroupProps, 'children'>;

  label?: ReactNode;
  FormLabelProps?: Omit<FormLabelProps, 'children'>;

  helperText?: ReactNode;
  FormHelperTextProps?: Omit<FormHelperTextProps, 'children'>;
}

export const CheckboxGroupField: ForwardRefExoticComponent<CheckboxGroupFieldProps> = forwardRef(
  (
    {
      FormGroupProps: formGroupProps,

      label,
      FormLabelProps: formLabelProps,

      helperText,
      FormHelperTextProps: formHelperTextProps,

      children,
      ...formControlProps
    },
    ref,
  ) => (
    <FormControl {...formControlProps} hiddenLabel={!label}>
      {!!label && <FormLabel {...formLabelProps}>{label}</FormLabel>}

      <FormGroup ref={ref} {...formGroupProps}>
        {children}
      </FormGroup>

      {!!helperText && (
        <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>
      )}
    </FormControl>
  ),
);
