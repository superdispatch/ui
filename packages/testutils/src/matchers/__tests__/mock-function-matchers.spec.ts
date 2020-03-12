import { setupMockFunctionMatchers } from '../mock-function-matchers';

setupMockFunctionMatchers();

describe('toHaveBeenLastCalledWithMatchingInlineSnapshot', () => {
  it('prints arguments of a function it was last called with', () => {
    const fn = jest.fn();

    fn(1, 'foo', { baz: 'quoz' });

    expect(fn).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
      Array [
        1,
        "foo",
        Object {
          "baz": "quoz",
        },
      ]
    `);
  });
});

describe('toHaveLastReturnedWithMatchingInlineSnapshot', () => {
  it('prints arguments of a function it was last called with', () => {
    const fn = jest.fn(x => x);

    fn({ foo: 'bar' });

    expect(fn).toHaveLastReturnedWithMatchingInlineSnapshot(`
      Object {
        "foo": "bar",
      }
    `);
  });

  it('prints arguments of a function it was last called with custom matcher', () => {
    const fn = jest.fn(() => ({ foo: Math.random(), bar: '1' }));

    fn();

    expect(fn).toHaveLastReturnedWithMatchingInlineSnapshot(
      { foo: expect.any(Number) },
      `
Object {
  "bar": "1",
  "foo": Any<Number>,
}
`,
    );
  });
});
