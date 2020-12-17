import * as faker from 'faker';

export type MockSchemaOverrides = Record<string, any>;

function makeProxy<T extends Record<string, (...args: any[]) => any>>(
  category: T,
  initialSeed = 0,
): T {
  const seeds = new Map<string, number>();

  return new Proxy<T>({} as T, {
    get(_, key: string) {
      const fn = category[key];

      if (typeof fn !== 'function') {
        return fn;
      }

      return (...args: any[]) => {
        const prevSeed = seeds.get(key) || initialSeed;
        const currentSeed = prevSeed + 1;

        faker.seed(currentSeed);
        seeds.set(key, currentSeed);

        return fn.apply(category, args) as unknown;
      };
    },
  });
}

export abstract class MockSchema {
  protected readonly address = makeProxy(faker.address);
  protected readonly commerce = makeProxy(faker.commerce);
  protected readonly company = makeProxy(faker.company);
  protected readonly database = makeProxy(faker.database);
  protected readonly date = makeProxy(faker.date);
  protected readonly finance = makeProxy(faker.finance);
  protected readonly hacker = makeProxy(faker.hacker);
  protected readonly helpers = makeProxy(faker.helpers);
  protected readonly image = makeProxy(faker.image);
  protected readonly internet = makeProxy(faker.internet);
  protected readonly lorem = makeProxy(faker.lorem);
  protected readonly name = makeProxy(faker.name);
  protected readonly phone = makeProxy(faker.phone);
  protected readonly random = makeProxy(faker.random);
  protected readonly system = makeProxy(faker.system);
}
