import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@material-ui/core';
import {
  Button,
  GridStack,
  InlineGrid,
  Snackbar,
  SnackbarStackOptions,
  SnackbarVariant,
  useSnackbarStack,
} from '@superdispatch/ui';
import { startCase } from 'lodash';
import { loremIpsum } from 'lorem-ipsum';
import React, { ReactNode, useCallback, useState } from 'react';
import { useWhenValueChanges } from 'utility-hooks';

const variants: SnackbarVariant[] = ['default', 'success', 'error'];

const AUTO_HIDE_DURATION = 5000;

function makeMessage(isLong: boolean) {
  return loremIpsum({ units: 'sentences', count: isLong ? 3 : 1 });
}

interface State {
  isOpen: boolean;
  isLong: boolean;
  hasUndo: boolean;
  hasClose: boolean;
  hasAutoHide: boolean;
  variant: SnackbarVariant;
  message: ReactNode;
}

export default function SnackbarDemo() {
  const { addSnackbar, clearStack } = useSnackbarStack();

  const [
    { isOpen, isLong, hasUndo, hasClose, hasAutoHide, variant, message },
    setState,
  ] = useState<State>(() => ({
    isOpen: true,
    isLong: false,
    hasUndo: false,
    hasClose: true,
    hasAutoHide: false,
    variant: 'default',
    message: makeMessage(false),
  }));

  const updateState = useCallback(
    (partial: Partial<State>) => setState((prev) => ({ ...prev, ...partial })),
    [],
  );

  const key = [hasUndo, hasClose, variant, message, hasAutoHide].join('-');

  useWhenValueChanges(isLong, () =>
    updateState({ message: makeMessage(isLong) }),
  );

  return (
    <GridStack spacing={2}>
      <FormControl>
        <FormLabel>Visual</FormLabel>

        <FormGroup row={true}>
          <FormControlLabel
            label="Open"
            control={<Switch />}
            checked={isOpen}
            onChange={(_, checked) => updateState({ isOpen: checked })}
          />

          <FormControlLabel
            label="Long"
            control={<Switch />}
            checked={isLong}
            onChange={(_, checked) => updateState({ isLong: checked })}
          />

          <FormControlLabel
            label="Auto Hide"
            control={<Switch />}
            checked={hasAutoHide}
            onChange={(_, checked) => updateState({ hasAutoHide: checked })}
          />

          <FormControlLabel
            label="Undoable"
            control={<Switch />}
            checked={hasUndo}
            onChange={(_, checked) => updateState({ hasUndo: checked })}
          />

          <FormControlLabel
            label="Closable"
            control={<Switch />}
            checked={hasClose}
            onChange={(_, checked) => updateState({ hasClose: checked })}
          />
        </FormGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Variant</FormLabel>
        <RadioGroup
          row={true}
          name="variant"
          value={variant}
          onChange={(_, value) =>
            updateState({ variant: value as SnackbarVariant })
          }
        >
          {variants.map((x) => (
            <FormControlLabel
              key={x}
              value={x}
              control={<Radio />}
              label={startCase(x)}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <InlineGrid spacing={1}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            const snackMessage = makeMessage(isLong);

            const options: SnackbarStackOptions = {
              variant,
              hasCloseButton: hasClose,
              key: Math.random(),
              autoHideDuration: !hasAutoHide ? undefined : AUTO_HIDE_DURATION,
            };

            addSnackbar(snackMessage, {
              ...options,
              action: hasUndo && (
                <Button
                  size="small"
                  variant="contained"
                  color="white"
                  onClick={() => {
                    addSnackbar(
                      <span>
                        <strong>Undid:</strong> <em>{snackMessage}</em>
                      </span>,
                      options,
                    );
                  }}
                >
                  Undo
                </Button>
              ),
            });
          }}
        >
          Add To Stack
        </Button>

        <Button color="primary" variant="outlined" onClick={() => clearStack()}>
          Clear Stack
        </Button>
      </InlineGrid>

      <Snackbar
        key={key}
        open={isOpen}
        variant={variant}
        hasCloseButton={hasClose}
        onClose={() => updateState({ isOpen: false })}
        autoHideDuration={!hasAutoHide ? undefined : AUTO_HIDE_DURATION}
        action={
          hasUndo && (
            <Button
              size="small"
              variant="contained"
              color="white"
              onClick={() =>
                updateState({
                  hasUndo: false,
                  message: (
                    <span>
                      <strong>Undid:</strong> <em>{message}</em>
                    </span>
                  ),
                })
              }
            >
              Undo
            </Button>
          )
        }
      >
        {message}
      </Snackbar>
    </GridStack>
  );
}
