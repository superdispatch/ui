import { fromPairs } from 'lodash';

export function setupFormDataSerializer() {
  expect.addSnapshotSerializer({
    test(value: unknown) {
      return value instanceof FormData;
    },

    print(formData: FormData, serialize) {
      const serialized = fromPairs(Array.from(formData));
      return `FormData${serialize(serialized).replace(/^Object/, '')}`;
    },
  });
}
