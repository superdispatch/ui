import { setupTestUtils } from '../../setupTestUtils';

setupTestUtils();

it('serializes empty FormData', () => {
  expect(new FormData()).toMatchInlineSnapshot(`FormData {}`);
});

it('serializes FormData with some data', () => {
  const formData = new FormData();

  formData.append('name', 'John');

  expect(formData).toMatchInlineSnapshot(`
    FormData {
      "name": "John",
    }
  `);
});

it('serialize composed FormData', () => {
  const formData = new FormData();
  formData.append('name', 'John');

  expect({ foo: 'bar', form: formData }).toMatchInlineSnapshot(`
Object {
  "foo": "bar",
  "form": FormData {
    "name": "John",
  },
}
`);
});
