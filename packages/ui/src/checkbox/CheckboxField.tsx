import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
} from '@material-ui/core';
import { forwardRef, ForwardRefExoticComponent, ReactNode } from 'react';

export interface CheckboxFieldProps
  extends CheckboxProps,
    Pick<FormControlLabelProps, 'label'> {
  error?: boolean;
  helperText?: ReactNode;
  FormControlLabelProps?: Omit<
    FormControlLabelProps,
    'label' | 'checked' | 'onBlur' | 'onChange' | 'control'
  >;
}

export const CheckboxField: ForwardRefExoticComponent<CheckboxFieldProps> =
  forwardRef(
    (
      {
        label,
        error,
        checked,
        onBlur,
        onChange,
        helperText,
        FormControlLabelProps: formControlLabelProps,
        ...props
      },
      ref,
    ) => (
      <FormControl error={error}>
        <FormControlLabel
          {...formControlLabelProps}
          label={label}
          checked={checked}
          onBlur={onBlur as FormControlLabelProps['onBlur']}
          onChange={onChange as FormControlLabelProps['onChange']}
          control={
            <Checkbox
              ref={ref}
              color="primary"
              disableRipple={true}
              {...props}
            />
          }
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    ),
  );
