import { fromPairs } from 'lodash';

export function setupFormDataSerializer() {
  expect.addSnapshotSerializer({
    test(value: unknown) {
      return value instanceof FormData;
    },

    print(formData, serialize) {
      const serialized = fromPairs(Array.from(formData as FormData));
      return serialize(serialized).replace(/^Object/, 'FormData');
    },
  });
}
