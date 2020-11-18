import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "FormikCheckboxField": [Function],
      "FormikDateField": [Function],
      "FormikEnhanced": [Function],
      "FormikPhoneField": React.forwardRef(FormikPhoneField),
      "FormikRadioGroupField": React.forwardRef(FormikRadioGroupField),
      "FormikTextField": React.forwardRef(FormikTextField),
      "FormsProvider": [Function],
      "SuspendedFormikPhoneField": React.forwardRef(SuspendedFormikPhoneField),
      "useFormikEnhanced": [Function],
      "useFormsContext": [Function],
    }
  `);
});
