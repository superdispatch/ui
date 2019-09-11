import { Grid, List, ListItem, Paper, Popover, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import DayPicker, {
  CaptionElementProps,
  DayPickerProps,
  WeekdayElementProps,
} from 'react-day-picker';

export type DatePickerBaseValue = Date | [Date?, Date?];

export type DatePickerBaseInputComponent<TProps> = React.ComponentType<TProps>;

export interface DatePickerBaseInputComponentProps<TValue>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: TValue;
}

export interface DatePickerBaseState {
  anchorEl: HTMLInputElement | null;
  onOpen: (event: React.MouseEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export interface DatePickerBaseQuickSelectionItem {
  label: string;
  value: DatePickerBaseValue;
}

export interface DatePickerBaseProps extends DayPickerProps {
  classNames?: DayPickerProps['classNames'] & { quickSelection: string };
  value?: DatePickerBaseValue;
  quickSelectionItems?: DatePickerBaseQuickSelectionItem[];
  quickSelectionSelectedItem?: DatePickerBaseQuickSelectionItem;
  InputComponent: DatePickerBaseInputComponent<any>;
  onChange: (value: any) => void;
  footer?: React.ReactNode;
}

export function useDatePickerBaseState() {
  const [anchorEl, setAnchorEl] = useState<DatePickerBaseState['anchorEl']>(null);
  const onOpen: DatePickerBaseState['onOpen'] = event => setAnchorEl(event.currentTarget);
  const onClose: DatePickerBaseState['onClose'] = () => setAnchorEl(null);

  return {
    anchorEl,
    onOpen,
    onClose,
  };
}

const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const captionElement = ({ date, localeUtils, classNames, ...props }: CaptionElementProps) => (
  <Typography variant="h4" className={classNames.caption} {...props}>
    {localeUtils.formatMonthTitle(date)}
  </Typography>
);

const weekdayElement = ({ weekday, className }: WeekdayElementProps) => (
  <Typography variant="h5" className={className}>
    {weekdaysShort[weekday]}
  </Typography>
);

export function DatePickerBase({
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
  ...props
}: DatePickerBaseProps & DatePickerBaseState) {
  return (
    <>
      <InputComponent onClick={onOpen} value={value} readOnly={true} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={onClose}
      >
        <Paper>
          <Grid container={true}>
            {quickSelectionItems && (
              <Grid
                item={true}
                xs={12}
                sm="auto"
                className={classNames && classNames.quickSelection}
              >
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
            )}

            <Grid item={true} xs={12} sm="auto">
              <DayPicker
                classNames={classNames}
                captionElement={captionElement}
                weekdayElement={weekdayElement}
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
