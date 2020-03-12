import { isEmpty } from 'lodash';
import { parse } from 'qs';

export function setupLocationSerializer() {
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

    print({ hash, search, pathname }: Location, serialize) {
      const searchParams = parse(search, {
        ignoreQueryPrefix: true,
        decoder: (str, defaultDecoder, charset) => {
          const decoded = defaultDecoder(str, defaultDecoder, charset);

          try {
            return JSON.parse(decoded);
          } catch (e) {
            return decoded;
          }
        },
      });

      return serialize({
        pathname,
        ...(!!hash && { hash }),
        ...(!isEmpty(searchParams) && { searchParams }),
      });
    },
  });
}
