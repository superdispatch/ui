import { Card, CardContent } from '@material-ui/core';
import { MoreHoriz, Save, Send } from '@material-ui/icons';
import { boolean, select } from '@storybook/addon-knobs';
import {
  Button,
  ButtonProps,
  Color,
  GridStack,
  InlineGrid,
} from '@superdispatch/ui';
import React, { MouseEvent, useEffect, useState } from 'react';

type State = 'stale' | 'disabled' | 'active' | 'loading';

const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large'];
const variants: Array<ButtonProps['variant']> = [
  'text',
  'outlined',
  'contained',
];

export default function ButtonDemo() {
  const hasEndIcon = boolean('Has End Icon', false);
  const hasStartIcon = boolean('Has Start Icon', false);
  const state = select(
    'State',
    {
      Stale: 'stale',
      Disabled: 'disabled',
      Active: 'active',
      Loading: 'loading',
    },
    'stale',
  );

  const color = select(
    'Color',
    {
      Primary: 'primary',
      Error: 'error',
      Success: 'success',
      White: 'white',
    },
    'primary',
  );

  const [buttonStateMap, setButtonStateMap] = useState<Map<string, State>>(
    new Map(),
  );

  useEffect(() => {
    if (buttonStateMap.size === 0) {
      return;
    }

    const timeout = setTimeout(() => setButtonStateMap(new Map()), 1000);
    return () => clearTimeout(timeout);
  }, [buttonStateMap]);

  return (
    <Card
      style={{
        backgroundColor: color === 'white' ? Color.Grey500 : undefined,
      }}
    >
      <CardContent>
        <InlineGrid spacing={2}>
          {variants.map((variant) => (
            <GridStack spacing={1} key={variant}>
              {sizes.map((size) => {
                const buttonKey = `${variant}-${size}`;
                const buttonState = buttonStateMap.get(buttonKey) || state;
                const props: ButtonProps = {
                  size,
                  color,
                  variant,
                  disabled: buttonState === 'disabled',
                  isActive: buttonState === 'active',
                  isLoading: buttonState === 'loading',
                  onClick: (event: MouseEvent) => {
                    if (event.shiftKey) {
                      return;
                    }

                    setButtonStateMap((prev) =>
                      new Map(prev).set(
                        buttonKey,
                        event.altKey ? 'disabled' : 'loading',
                      ),
                    );
                  },
                };

                return (
                  <InlineGrid key={size} spacing={1}>
                    <Button
                      {...props}
                      startIcon={hasStartIcon && <Save />}
                      endIcon={hasEndIcon && <Send />}
                    >
                      Button
                    </Button>

                    <Button {...props}>
                      <MoreHoriz />
                    </Button>
                  </InlineGrid>
                );
              })}
            </GridStack>
          ))}
        </InlineGrid>
      </CardContent>
    </Card>
  );
}
