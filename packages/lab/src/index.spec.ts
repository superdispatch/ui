import * as api from '.';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Box": React.forwardRef(styled.div),
      "LabProvider": [Function],
      "TextBox": React.forwardRef(styled.span),
      "css": [Function],
      "styled": [Function],
      "toResponsivePropTuple": [Function],
    }
  `);
});
