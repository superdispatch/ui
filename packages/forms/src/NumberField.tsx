import {TextField} from '@material-ui/core';
import {InputProps as StandardInputProps} from '@material-ui/core/Input/Input';
import {StandardTextFieldProps} from '@material-ui/core/TextField';
import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import NumberFormat, {NumberFormatProps} from 'react-number-format';

import {useUID} from './internal/useUID';

interface NumberFormatCustomProps
  extends Omit<NumberFormatProps, 'getInputRef' | 'onValueChange'>,
    Omit<
      StandardTextFieldProps,
      'ref' | keyof InputHTMLAttributes<HTMLInputElement>
    > {}

function NumberInputComponent({
  inputRef,
  onChange,
  isNumericString = true,
  thousandSeparator = true,
  ...props
}: NumberFormatCustomProps) {
  return (
    <NumberFormat
      {...props}
      getInputRef={inputRef}
      isNumericString={isNumericString}
      thousandSeparator={thousandSeparator}
      onValueChange={values => {
        const event = ({
          target: { value: values.floatValue },
        } as unknown) as ChangeEvent;

        onChange?.(event);
      }}
    />
  );
}

export interface NumberFieldProps
  extends Omit<StandardTextFieldProps, 'InputProps' | 'inputProps'>,
    Omit<NumberFormatProps, keyof StandardTextFieldProps> {
  InputProps?: Partial<Omit<StandardInputProps, 'inputComponent'>>;
  inputProps?: NumberFormatCustomProps & StandardTextFieldProps['inputProps'];
}

export function NumberField({ id, InputProps, ...props }: NumberFieldProps) {
  const uid = useUID();

  return (
    <TextField
      {...props}
      id={id || uid}
      InputProps={{
        ...InputProps,
        inputComponent: NumberInputComponent,
      }}
    />
  );
}
