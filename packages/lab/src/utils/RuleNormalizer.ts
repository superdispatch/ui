export type RuleNormalizer = (input: unknown) => string | undefined;
export type RuleNormalizerRecord<T extends string = string> = Readonly<
  Record<T, undefined | RuleNormalizer>
>;

export function createRuleNormalizer<TKey extends string>(
  rules: Record<TKey, unknown>,
): RuleNormalizer {
  return (input) => {
    if (typeof input == 'string') {
      const value = rules[input as TKey];

      if (typeof value == 'number') {
        return `${value}px`;
      }

      if (typeof value == 'string') {
        return value;
      }
    }

    return undefined;
  };
}
