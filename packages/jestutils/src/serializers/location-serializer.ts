import { parse } from 'qs';

expect.addSnapshotSerializer({
  test(value: unknown) {
    return (
      typeof value === 'object' &&
      value != null &&
      'hash' in value &&
      'search' in value &&
      'pathname' in value
    );
  },

  print(location, serialize) {
    const { hash, search, pathname } = location as Location;

    const searchParams = parse(search, {
      ignoreQueryPrefix: true,
      decoder: (str, defaultDecoder, charset) => {
        const decoded = defaultDecoder(str, defaultDecoder, charset);

        try {
          return JSON.parse(decoded) as unknown;
        } catch {
          return decoded;
        }
      },
    });

    return serialize({
      pathname,
      ...(!!hash && { hash }),
      ...(Object.keys(searchParams).length > 0 && { searchParams }),
    });
  },
});
