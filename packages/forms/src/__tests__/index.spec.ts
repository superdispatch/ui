import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "AppFormikProvider": [Function],
      "FormikCheckboxField": [Function],
      "FormikDateField": [Function],
      "FormikPhoneField": [Function],
      "FormikRadioGroupField": [Function],
      "FormikTextField": [Function],
      "useAppFormik": [Function],
      "useAppFormikContext": [Function],
      "validatePhone": [Function],
    }
  `);
});
