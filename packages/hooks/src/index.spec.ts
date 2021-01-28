import * as api from '.';

test('public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "useConstant": [Function],
      "useDeepEqualMemo": [Function],
      "useDeepEqualValue": [Function],
      "useEventHandler": [Function],
      "useIsMounted": [Function],
      "useValueObserver": [Function],
    }
  `);
});
