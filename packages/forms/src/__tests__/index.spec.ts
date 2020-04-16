import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "FormikCheckboxField": [Function],
      "FormikDateField": [Function],
      "FormikEnhancedProvider": [Function],
      "FormikPhoneField": [Function],
      "FormikRadioGroupField": [Function],
      "FormikTextField": [Function],
      "useFormikEnhanced": [Function],
      "useFormikEnhancedContext": [Function],
      "validatePhone": [Function],
    }
  `);
});
