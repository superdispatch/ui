import * as api from '.';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Box": React.forwardRef(Box),
      "Column": React.forwardRef(Column),
      "Columns": React.forwardRef(Columns),
      "Inline": React.forwardRef(Inline),
      "LabProvider": [Function],
      "Stack": React.forwardRef(Stack),
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
