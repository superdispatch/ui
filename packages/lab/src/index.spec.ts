import * as api from '.';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Box": React.forwardRef(Box),
      "LabProvider": [Function],
      "TextBox": React.forwardRef(TextBox),
      "css": [Function],
      "styled": [Function],
      "toResponsivePropTuple": [Function],
    }
  `);
});
