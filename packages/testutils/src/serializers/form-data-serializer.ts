export function setupFormDataSerializer() {
  expect.addSnapshotSerializer({
    test(value: unknown) {
      return value instanceof FormData;
    },

    print(formData: FormData, serialize) {
      const serialized = Object.fromEntries(formData.entries());
      serialized.constructor = FormData;
      return serialize(serialized);
    },
  });
}
