import '../location-serializer';

import { parse } from 'url';

function makeLocation(url: string) {
  const { pathname, search, hash } = parse(url);

  return { pathname, search, hash };
}

it('serializes location pathname', () => {
  expect(makeLocation('/hello')).toMatchInlineSnapshot(`
Object {
  "pathname": "/hello",
}
`);
});

it('serializes location hash', () => {
  expect(makeLocation('/hello#there')).toMatchInlineSnapshot(`
Object {
  "hash": "#there",
  "pathname": "/hello",
}
`);
});

it('serializes location search', () => {
  expect(makeLocation('/hello?foo=bar&baz=3')).toMatchInlineSnapshot(`
Object {
  "pathname": "/hello",
  "searchParams": Object {
    "baz": 3,
    "foo": "bar",
  },
}
`);
});

it('serializes json values inside location search', () => {
  expect(
    makeLocation(
      `/hello?foo=bar&baz=${JSON.stringify({
        this: { is: { nested: { value: 'foo' } } },
      })}`,
    ),
  ).toMatchInlineSnapshot(`
Object {
  "pathname": "/hello",
  "searchParams": Object {
    "baz": Object {
      "this": Object {
        "is": Object {
          "nested": Object {
            "value": "foo",
          },
        },
      },
    },
    "foo": "bar",
  },
}
`);
});
