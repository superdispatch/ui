import { fromPairs } from 'lodash';

expect.addSnapshotSerializer({
  test(value: unknown) {
    return value instanceof FormData;
  },

  print(formData, serialize) {
    return serialize(fromPairs(Array.from(formData as FormData))).replace(
      /^Object/,
      'FormData',
    );
  },
});
