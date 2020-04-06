import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "FormikCheckboxField": [Function],
      "FormikCurrencyField": [Function],
      "FormikDateField": [Function],
      "FormikNumberField": [Function],
      "FormikPhoneField": [Function],
      "FormikRadioGroupField": [Function],
      "FormikTextField": [Function],
      "useAppFormik": [Function],
      "validatePhone": [Function],
    }
  `);
});
