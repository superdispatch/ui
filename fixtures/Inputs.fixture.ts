import { ButtonDemo } from '../packages/ui/src/button/Button.demo';
import {
  DatePickerDemo,
  DateRangePickerDemo,
  DateRangePickerDisabled,
  DateRangePickerQuickSelectionDemo,
} from '../packages/ui/src/date-picker/DatePicker.demo';
import { IconButtonDemo } from '../packages/ui/src/icon-button/IconButton.demo';

export default {
  Button: ButtonDemo,
  IconButton: IconButtonDemo,
  'Date Picker': DatePickerDemo,
  'Date Range Picker': DateRangePickerDemo,
  'Date Quick Selection': DateRangePickerQuickSelectionDemo,
  'Date Disabled Input': DateRangePickerDisabled,
};
