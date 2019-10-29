import {
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  Paper,
  Popover,
  Typography,
} from '@material-ui/core';
import { PopoverOrigin } from '@material-ui/core/Popover';
import React, { useState } from 'react';
import DayPicker, {
  CaptionElementProps,
  DayPickerProps,
  WeekdayElementProps,
} from 'react-day-picker';

export type DatePickerBaseValue = Date | [Date?, Date?] | undefined;

export type DatePickerBaseInputComponent<TProps> = React.ComponentType<TProps>;

export interface DatePickerBaseInputComponentProps<TValue>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: TValue;
}

export interface DatePickerBaseState {
  anchorEl: HTMLInputElement | null;
  onOpen: (event: React.MouseEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export function useDatePickerBaseState(): DatePickerBaseState {
  const [anchorEl, setAnchorEl] = useState<DatePickerBaseState['anchorEl']>(null);

  return {
    anchorEl,
    onOpen: event => setAnchorEl(event.currentTarget),
    onClose: () => setAnchorEl(null),
  };
}

export interface DatePickerBaseQuickSelectionItem<TValue> {
  label: string;
  value: TValue;
}

export interface DatePickerBaseProps<TValue> extends DayPickerProps {
  classNames?: DayPickerProps['classNames'];
  value?: TValue;
  quickSelectionItems?: Array<DatePickerBaseQuickSelectionItem<TValue>>;
  quickSelectionSelectedItem?: DatePickerBaseQuickSelectionItem<TValue>;
  InputComponent: DatePickerBaseInputComponent<DatePickerBaseInputComponentProps<TValue>>;
  onChange: (value: TValue) => void;
  footer?: React.ReactNode;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  disabled?: boolean;
}

function DatePickerBaseCaption({ date, localeUtils, classNames, ...props }: CaptionElementProps) {
  return (
    <Typography variant="h4" className={classNames.caption} {...props}>
      {localeUtils.formatMonthTitle(date)}
    </Typography>
  );
}

function DatePickerBaseWeekday({ weekday, className }: WeekdayElementProps) {
  const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Typography variant="h5" className={className}>
      {weekdaysShort[weekday]}
    </Typography>
  );
}

export function DatePickerBase<TValue extends DatePickerBaseValue>({
  InputComponent,
  classNames,
  value,
  onChange,
  anchorEl,
  onOpen,
  onClose,
  quickSelectionItems,
  quickSelectionSelectedItem,
  footer,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  disabled,
  ...props
}: DatePickerBaseProps<TValue> & DatePickerBaseState) {
  return (
    <>
      <InputComponent onClick={onOpen} value={value} readOnly={true} disabled={disabled} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={onClose}
      >
        <Paper>
          <Grid
            container={true}
            direction={anchorOrigin.horizontal === 'right' ? 'row-reverse' : 'row'}
          >
            {quickSelectionItems && (
              <>
                <Grid item={true} xs={12} sm="auto">
                  <List>
                    <ListItem>
                      <Typography variant="h4">Quick Selection</Typography>
                    </ListItem>

                    {quickSelectionItems.map(quickSelectionItem => (
                      <ListItem
                        key={quickSelectionItem.label}
                        button={true}
                        selected={quickSelectionSelectedItem === quickSelectionItem}
                        onClick={() => {
                          onChange(quickSelectionItem.value);
                          onClose();
                        }}
                      >
                        {quickSelectionItem.label}
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Hidden xsDown={true}>
                  <Grid item={true} sm="auto">
                    <Divider orientation="vertical" />
                  </Grid>
                </Hidden>

                <Hidden smUp={true}>
                  <Grid item={true} xs={12}>
                    <Divider orientation="horizontal" />
                  </Grid>
                </Hidden>
              </>
            )}

            <Grid item={true} xs={12} sm="auto">
              <DayPicker
                classNames={classNames}
                captionElement={DatePickerBaseCaption}
                weekdayElement={DatePickerBaseWeekday}
                {...props}
              />

              {footer && <div className={classNames && classNames.footer}>{footer}</div>}
            </Grid>
          </Grid>
        </Paper>
      </Popover>
    </>
  );
}
