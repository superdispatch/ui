import { DateConfigProvider, defaultDateConfig } from '@superdispatch/dates';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateTime } from 'luxon';
import MockDate from 'mockdate';
import { ReactElement } from 'react';
import { FormikEnhancedConfig } from '../enhanced/useFormikEnhanced';
import { renderFormField } from '../__testutils__/renderFormField';
import { FormikDateField } from './FormikDateField';

function renderDateField<T, R>(
  element: ReactElement,
  formProps: FormikEnhancedConfig<T, R>,
) {
  return renderFormField(
    <DateConfigProvider>{element}</DateConfigProvider>,
    formProps,
  );
}

beforeEach(() => {
  MockDate.set(Date.UTC(2019, 4, 24, 1, 2, 3, 45));
});

afterEach(() => {
  MockDate.reset();
});

test('changes', async () => {
  const handleBlur = jest.fn();
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const view = renderDateField(
    <FormikDateField
      name="date"
      label="Date"
      onBlur={handleBlur}
      onChange={handleChange}
    />,
    {
      onSubmit: handleSubmit,
      initialValues: { date: '2019-05-30T01:02:03.045-05:00' },
    },
  );

  const field = screen.getByLabelText('Date');

  userEvent.click(field);
  userEvent.click(screen.getByLabelText('Wed May 29 2019'));

  expect(handleBlur).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: expect.any(DateTime),
    stringValue: '2019-05-29T01:02:03.045-05:00',
  });

  view.submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  expect(handleSubmit).toHaveBeenLastCalledWith({
    date: '2019-05-29T01:02:03.045-05:00',
  });
});

test('format', async () => {
  const handleSubmit = jest.fn();
  const view = renderDateField(
    <FormikDateField name="date" format="DateISO" />,
    {
      onSubmit: handleSubmit,
      initialValues: { date: '2019-05-29T01:02:03.045-05:00' },
    },
  );

  view.submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  expect(handleSubmit).toHaveBeenLastCalledWith({
    date: '2019-05-29T01:02:03.045-05:00',
  });

  userEvent.click(screen.getByRole('textbox'));
  userEvent.click(screen.getByLabelText(/May 24/));

  view.submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  expect(handleSubmit).toHaveBeenLastCalledWith({
    date: '2019-05-24',
  });
});

test('errors', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  renderDateField(
    <FormikDateField
      name="date"
      label="Date"
      onChange={handleChange}
      validate={({ dateValue }) => {
        if (!dateValue.isValid) return 'Required';
        if (dateValue.valueOf() < Date.now()) return 'Invalid';
        return undefined;
      }}
    />,
    { onSubmit: handleSubmit, initialValues: { date: undefined } },
  );

  userEvent.click(screen.getByLabelText('Date'));
  userEvent.click(screen.getByLabelText(/May 20/));

  expect(handleSubmit).not.toHaveBeenCalled();

  await screen.findByText('Invalid');
});
