import {
  BaseTextFieldProps,
  IconButton,
  InputAdornment,
  InputProps,
  Popover,
  SvgIcon,
  TextField,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { mdiCalendarMonth } from '@mdi/js';
import { mergeRefs, useUID } from '@superdispatch/ui';
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useWhenValueChanges } from 'utility-hooks';

export interface InternalBaseDateFieldAPI {
  close: () => void;
}

export interface BaseDatePickerProps
  extends Omit<BaseTextFieldProps, 'variant'> {
  api?: Ref<InternalBaseDateFieldAPI>;
  onClear?: () => void;
  onClose?: () => void;
  enableClearable?: boolean;
  InputProps?: InputProps;
}

export const BaseDatePicker = forwardRef<HTMLDivElement, BaseDatePickerProps>(
  (
    {
      id,
      api,
      onClear,
      onClick,
      onClose,
      onKeyDown,

      disabled,
      children,
      enableClearable,

      inputRef: inputRefProp,
      InputProps: inputProps,

      ...textFieldProps
    },
    ref,
  ) => {
    const uid = useUID(id);
    const labelID = `${uid}-label`;
    const clearIconID = `${uid}-clear-icon`;

    const inputRef = useRef<HTMLInputElement>(null);
    const textFieldRef = useRef<HTMLDivElement>(null);
    const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(
      null,
    );

    function handleOpen() {
      if (!disabled && textFieldRef.current) {
        setPopoverAnchor(textFieldRef.current);
      }
    }

    function handleClose() {
      setPopoverAnchor(null);
    }

    useImperativeHandle(api, () => ({ close: handleClose }));

    // We want to trigger close event only when UI will be ready after updates.
    useWhenValueChanges(popoverAnchor, () => {
      if (!popoverAnchor) {
        onClose?.();
      }
    });

    return (
      <>
        <Popover
          open={!!popoverAnchor}
          onClose={handleClose}
          anchorEl={popoverAnchor}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {children}
        </Popover>

        <TextField
          {...textFieldProps}
          id={uid}
          ref={mergeRefs(ref, textFieldRef)}
          disabled={disabled}
          inputRef={mergeRefs(inputRef, inputRefProp)}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              handleOpen();
            }
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);

            if (
              !event.defaultPrevented &&
              (event.key === ' ' || event.key === 'Enter')
            ) {
              handleOpen();
            }
          }}
          inputProps={{ readOnly: true }}
          InputProps={{
            ...inputProps,
            endAdornment: (
              <InputAdornment position="end">
                {enableClearable ? (
                  <IconButton
                    disabled={disabled}
                    aria-labelledby={`${clearIconID} ${labelID}`}
                    onClick={(event) => {
                      // Do not bubble up clicks.
                      event.stopPropagation();

                      onClear?.();
                    }}
                  >
                    <Clear id={clearIconID} aria-label="clear" />
                  </IconButton>
                ) : (
                  <IconButton disabled={disabled}>
                    <SvgIcon>
                      <path d={mdiCalendarMonth} />
                    </SvgIcon>
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </>
    );
  },
);
