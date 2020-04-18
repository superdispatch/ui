expect.addSnapshotSerializer({
  test(value: unknown) {
    return value instanceof Blob;
  },

  print(blob, serialize) {
    const { type, size } = blob as Blob;

    if (blob instanceof File) {
      return serialize({ type, size, name: blob.name }).replace(
        /^Object/,
        'File',
      );
    }

    return serialize({ type, size }).replace(/^Object/, 'Blob');
  },
});
