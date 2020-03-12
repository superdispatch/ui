export function setupFormDataSerializer() {
  expect.addSnapshotSerializer({
    test(value: unknown) {
      return value instanceof FormData;
    },

    print(formData: FormData, serialize) {
      const serialized = Object.fromEntries(formData.entries());
      serialized.__proto__.constructor = FormData;
      return serialize(serialized);
    },
  });
}
