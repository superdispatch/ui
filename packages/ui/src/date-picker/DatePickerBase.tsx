import { Grid, List, ListItem, Paper, Popover, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import DayPicker, {
  CaptionElementProps,
  DayPickerProps,
  WeekdayElementProps,
} from 'react-day-picker';

export type Value = Date | [Date?, Date?];

export type DatePickerBaseInputComponent<TProps> = React.ComponentType<TProps>;

export interface DatePickerBaseInputComponentProps<TValue>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: TValue;
}

export interface DatePickerBaseState {
  anchorEl: HTMLInputElement | null;
  handleOpen: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}

export interface DatePickerBaseQuickSelectionItem {
  label: string;
  value: Value;
}

export interface DatePickerBaseProps extends DayPickerProps {
  classNames?: DayPickerProps['classNames'] & { quickSelection: string };
  value?: Value;
  quickSelectionItems?: DatePickerBaseQuickSelectionItem[];
  InputComponent: DatePickerBaseInputComponent<any>;
  onChange: (value: any) => void;
}

export function useDatePickerBaseState() {
  const [anchorEl, setAnchorEl] = useState<DatePickerBaseState['anchorEl']>(null);
  const handleOpen: DatePickerBaseState['handleOpen'] = event => setAnchorEl(event.currentTarget);
  const handleClose: DatePickerBaseState['handleClose'] = () => setAnchorEl(null);

  return {
    anchorEl,
    handleOpen,
    handleClose,
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
  handleOpen,
  handleClose,
  quickSelectionItems,
  ...props
}: DatePickerBaseProps & DatePickerBaseState) {
  return (
    <>
      <InputComponent onClick={handleOpen} value={value} readOnly={true} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
      >
        <Paper>
          <Grid container={true}>
            {quickSelectionItems && (
              <Grid className={classNames && classNames.quickSelection}>
                <List>
                  <ListItem>
                    <Typography variant="h4">Quick Selection</Typography>
                  </ListItem>

                  {quickSelectionItems.map(quickSelectionItem => (
                    <ListItem
                      key={quickSelectionItem.label}
                      button={true}
                      onClick={() => {
                        onChange(quickSelectionItem.value);
                        handleClose();
                      }}
                    >
                      {quickSelectionItem.label}
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}

            <Grid>
              <DayPicker
                classNames={classNames}
                captionElement={captionElement}
                weekdayElement={weekdayElement}
                {...props}
              />
            </Grid>
          </Grid>
        </Paper>
      </Popover>
    </>
  );
}
