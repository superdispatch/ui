'use strict';

import { ESLintUtils } from '@typescript-eslint/experimental-utils';

import { rule } from './no-color-literals';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
});

ruleTester.run('prefer-design-system-colors', rule, {
  valid: [
    'const color = "#FFF8E7"',
    'const Icon = () => <svg fill="#FFF8E7"/>',
    'const Icon = () => <svg fill={`#FFF8E7`}/>',
    'const Icon = ({ fill = "#FFF8E7" }) => <svg fill={fill}/>',
    'const Icon = () => <svg style={{color: "#FFF8E7"}}/>',
    'const Icon = () => <svg style={{color: `#FFF8E7`}}/>',
    'const Icon = styled.svg`color: #FFF8E7;`',
    'const Icon = () => <svg css="color: #FFF8E7"/>',
    'const Icon = () => <svg css={`color: #FFF8E7`}/>',
  ],
  invalid: [
    {
      code: [
        'const a = "#FFF"',
        'const b = "#fff"',
        'const c = "#FFFFFF"',
        'const d = "#ffffff"',
      ].join('\n'),
      errors: [
        {
          line: 1,
          column: 11,
          endColumn: 17,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
        {
          line: 2,
          column: 11,
          endColumn: 17,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
        {
          line: 3,
          column: 11,
          endColumn: 20,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
        {
          line: 4,
          column: 11,
          endColumn: 20,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },
    {
      code: 'const Icon = () => <svg fill="#FFF"/>',
      errors: [
        {
          line: 1,
          column: 30,
          endColumn: 36,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = () => <svg fill={`#FFF`}/>',
      errors: [
        {
          line: 1,
          column: 31,
          endColumn: 37,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = ({ fill = "#FFF" }) => <svg fill={fill}/>',
      errors: [
        {
          line: 1,
          column: 24,
          endColumn: 30,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = ({ fill = `#FFF` }) => <svg fill={fill}/>',
      errors: [
        {
          line: 1,
          column: 24,
          endColumn: 30,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = () => <svg style={{color: "#FFF"}}/>',
      errors: [
        {
          line: 1,
          column: 40,
          endColumn: 46,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = () => <svg style={{color: `#FFF`}}/>',
      errors: [
        {
          line: 1,
          column: 40,
          endColumn: 46,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = styled.svg`color: #FFF;`',
      errors: [
        {
          line: 1,
          column: 24,
          endColumn: 38,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = styled.svg`color: #FFF; background-color: #6a707c`',
      errors: [
        {
          line: 1,
          column: 24,
          endColumn: 64,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
        {
          line: 1,
          column: 24,
          endColumn: 64,
          messageId: 'suggestColor',
          data: { name: 'Grey200' },
        },
      ],
    },

    {
      code:
        'const Icon = styled.svg`color: ${Color.White}; background-color: #6a707c`',
      errors: [
        {
          line: 1,
          column: 24,
          messageId: 'suggestColor',
          data: { name: 'Grey200' },
        },
      ],
    },

    {
      code: 'const Icon = styled.svg`display: flex; ${() => "color: #FFF"}`',
      errors: [
        {
          line: 1,
          column: 48,
          endColumn: 61,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code:
        'const Icon = styled.svg`display: flex; ${() => `color: ${"#FFF"}`}`',
      errors: [
        {
          line: 1,
          column: 58,
          endColumn: 64,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code:
        'const Icon = styled.svg`display: flex; ${() => `color: ${`#FFF`}`}`',
      errors: [
        {
          line: 1,
          column: 58,
          endColumn: 64,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = () => <svg css="color: #FFF"/>',
      errors: [
        {
          line: 1,
          column: 29,
          endColumn: 42,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },

    {
      code: 'const Icon = () => <svg css={`color: #FFF`}/>',
      errors: [
        {
          line: 1,
          column: 30,
          endColumn: 43,
          messageId: 'suggestColor',
          data: { name: 'White' },
        },
      ],
    },
  ],
});
