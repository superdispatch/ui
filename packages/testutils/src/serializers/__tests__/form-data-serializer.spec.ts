import { setupFormDataSerializer } from '../form-data-serializer';

setupFormDataSerializer();

it('serializes form data', () => {
  expect(new FormData()).toMatchInlineSnapshot(`FormData {}`);

  {
    const formData = new FormData();

    formData.append('name', 'John');
    formData.append('file', new Blob([], { type: 'image/jpg' }));

    expect(formData).toMatchInlineSnapshot(`
      FormData {
        "file": File {},
        "name": "John",
      }
    `);
  }

  {
    const formData = new FormData();
    formData.append('name', 'John');

    expect({ form: formData, foo: 'bar' }).toMatchInlineSnapshot(`
      FormData {
        "foo": "bar",
        "form": FormData {
          "name": "John",
        },
      }
    `);
  }
});
