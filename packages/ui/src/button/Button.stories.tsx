import { CloudUpload, MoreHoriz, Save } from '@material-ui/icons';
import { Meta } from '@storybook/react';
import { Box } from '@superdispatch/ui-lab';

import { Button, ButtonProps } from './Button';

const formatUnionType = (types: readonly unknown[]): string =>
  types.map((x) => JSON.stringify(x)).join(' | ');

const sizes: ReadonlyArray<NonNullable<ButtonProps['size']>> = [
  'small',
  'medium',
  'large',
];
const colors: ReadonlyArray<NonNullable<ButtonProps['color']>> = [
  'primary',
  'success',
  'error',
  'white',
];
const variants: ReadonlyArray<NonNullable<ButtonProps['variant']>> = [
  'text',
  'outlined',
  'contained',
];

const booleanProps: ReadonlyArray<keyof ButtonProps> = [
  'disabled',
  'isActive',
  'isLoading',
  'fullWidth',
];

export default {
  title: 'Inputs/Button',
  component: Button,
  argTypes: {
    children: {
      description: '',
      control: { type: 'select', options: ['Text', 'Icon'] },
    },

    startIcon: {
      description: '',
      table: { type: { summary: 'ReactNode' } },
      control: { type: 'select', options: ['none', 'Save', 'CloudUpload'] },
    },
    endIcon: {
      description: '',
      table: { type: { summary: 'ReactNode' } },
      control: { type: 'select', options: ['none', 'Save', 'CloudUpload'] },
    },

    color: {
      description: '',
      defaultValue: { summary: 'primary' },
      control: { type: 'select', options: colors },
      table: { type: { summary: formatUnionType(colors) } },
    },
    variant: {
      description: '',
      defaultValue: { summary: 'outlined' },
      control: { type: 'select', options: variants },
      table: { type: { summary: formatUnionType(variants) } },
    },
    size: {
      description: '',
      defaultValue: { summary: 'medium' },
      control: { type: 'select', options: sizes },
      table: { type: { summary: formatUnionType(sizes) } },
    },

    href: {
      description: '',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },

    ...Object.fromEntries(
      booleanProps.map((name) => [
        name,
        {
          description: '',
          table: { type: { summary: 'boolean' } },
        },
      ]),
    ),
  },
} as Meta;

export const basic = ({
  color,
  children,
  endIcon,
  startIcon,
  href,
  target = href != null ? '_blank' : undefined,
  ...props
}: ButtonProps) => {
  const button = (
    <Button
      {...props}
      href={href}
      color={color}
      target={target}
      startIcon={
        startIcon === 'Save' ? (
          <Save />
        ) : startIcon === 'CloudUpload' ? (
          <CloudUpload />
        ) : null
      }
      endIcon={
        endIcon === 'Save' ? (
          <Save />
        ) : endIcon === 'CloudUpload' ? (
          <CloudUpload />
        ) : null
      }
    >
      {children === 'Text' ? 'Text' : <MoreHoriz />}
    </Button>
  );

  if (color === 'white') {
    return (
      <Box padding="small" borderRadius="small" backgroundColor="Grey300">
        {button}
      </Box>
    );
  }

  return button;
};

basic.args = {
  size: 'medium',
  color: 'primary',
  children: 'Text',
  variant: 'outlined',
} as ButtonProps;
