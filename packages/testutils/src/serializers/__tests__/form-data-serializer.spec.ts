import { setupFormDataSerializer } from '../form-data-serializer';

setupFormDataSerializer();

it('serializes form data', () => {
  expect(new FormData()).toMatchInlineSnapshot(`
    FormData {
      "constructor": [Function],
    }
  `);

  {
    const formData = new FormData();

    formData.append('name', 'John');
    formData.append('file', new Blob([], { type: 'image/jpg' }));

    expect(formData).toMatchInlineSnapshot(`
      FormData {
        "constructor": [Function],
        "file": File {},
        "name": "John",
      }
    `);
  }

  {
    const formData = new FormData();
    formData.append('name', 'John');

    expect({ form: formData, foo: 'bar' }).toMatchInlineSnapshot(`
      Object {
        "foo": "bar",
        "form": FormData {
          "constructor": [Function],
          "name": "John",
        },
      }
    `);
  }
});
