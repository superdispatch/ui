import { Card, CardContent } from '@material-ui/core';
import { Info, MoreHoriz, Save, Send } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { boolean, select } from '@storybook/addon-knobs';
import { Button, ButtonProps, Color, Inline, Stack } from '@superdispatch/ui';
import React, { useEffect, useState } from 'react';

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
        <Stack space={2}>
          <Alert icon={<Info />} color="info" variant="filled">
            Click with pressed <code>Alt</code> (<code>Option</code>) key to
            disable button.
            <br />
            Click with pressed <code>Shift</code> key to set a loading state.
          </Alert>

          <Inline space={2}>
            {variants.map((variant) => (
              <Inline key={variant} space={2}>
                {['Button', <MoreHoriz key="icon" />].map((child, idx) => (
                  <Stack space={2} key={idx} align="center">
                    {sizes.map((size) => {
                      const buttonKey = `${variant}-${size}-${idx}`;
                      const buttonState =
                        buttonStateMap.get(buttonKey) || state;

                      return (
                        <Button
                          key={buttonKey}
                          size={size}
                          color={color}
                          variant={variant}
                          disabled={buttonState === 'disabled'}
                          isActive={buttonState === 'active'}
                          isLoading={buttonState === 'loading'}
                          startIcon={hasStartIcon && <Save />}
                          endIcon={hasEndIcon && <Send />}
                          onClick={({ altKey, shiftKey }) => {
                            if (altKey || shiftKey) {
                              setButtonStateMap((prev) =>
                                new Map(prev).set(
                                  buttonKey,
                                  altKey ? 'disabled' : 'loading',
                                ),
                              );
                            }
                          }}
                        >
                          {child}
                        </Button>
                      );
                    })}
                  </Stack>
                ))}
              </Inline>
            ))}
          </Inline>
        </Stack>
      </CardContent>
    </Card>
  );
}
