import { setupTestUtils } from '../../setupTestUtils';

setupTestUtils();

it('serializes empty FormData', () => {
  expect(new FormData()).toMatchInlineSnapshot(`FormData {}`);
});

it('serializes FormData with some data', () => {
  const formData = new FormData();

  formData.append('name', 'John');
  formData.append('file', new Blob([], { type: 'image/jpg' }));

  expect(formData).toMatchInlineSnapshot(`
    FormData {
      "file": File {},
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
