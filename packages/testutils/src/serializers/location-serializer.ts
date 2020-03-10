import { parse } from 'qs';

expect.addSnapshotSerializer({
  test(value: unknown) {
    return (
      typeof value === 'object' &&
      value != null &&
      'key' in value &&
      'hash' in value &&
      'search' in value &&
      'pathname' in value
    );
  },

  print({ hash, search, pathname }: Location, serialize) {
    return serialize({
      hash,
      pathname,
      searchParams: parse(search, {
        ignoreQueryPrefix: true,
        decoder: (str, defaultDecoder, charset) => {
          const decoded = defaultDecoder(str, defaultDecoder, charset);

          try {
            return JSON.parse(decoded);
          } catch (e) {
            return decoded;
          }
        },
      }),
    });
  },
});
