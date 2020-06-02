import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "FormikCheckboxField": [Function],
      "FormikDateField": [Function],
      "FormikPhoneField": [Function],
      "FormikRadioGroupField": [Function],
      "FormikTextField": [Function],
      "FormsProvider": [Function],
      "useFormikEnhanced": [Function],
      "useFormikEnhancedContext": [Function],
      "useFormsContext": [Function],
      "validatePhone": [Function],
    }
  `);
});
