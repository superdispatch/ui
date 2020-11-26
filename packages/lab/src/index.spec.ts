import * as api from '.';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Box": React.forwardRef(Box),
      "Column": React.forwardRef(Column),
      "Columns": React.forwardRef(Columns),
      "LabProvider": [Function],
      "TextBox": React.forwardRef(TextBox),
      "css": [Function],
      "isCollapsedBelow": [Function],
      "normalizeSpace": [Function],
      "styled": [Function],
      "toResponsivePropTuple": [Function],
      "useResponsivePropTuple": [Function],
    }
  `);
});
