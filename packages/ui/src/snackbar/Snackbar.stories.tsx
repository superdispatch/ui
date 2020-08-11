import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import { UseState } from '@superdispatch/ui-playroom/UseState';
import React from 'react';

import { Button, Inline, SnackbarStackConsumer } from '..';
import { Snackbar } from './Snackbar';

export default {
  title: 'Feedback/Snackbar',
  component: Snackbar,
};

export const basic = makePlayroomStory(
  <UseState
    initialState={false}
    render={(open, setOpen) => (
      <>
        <Button onClick={() => setOpen(!open)}>
          Toggle snackbar visibility
        </Button>

        <Snackbar open={open}>This is a basic snackbar</Snackbar>
      </>
    )}
  />,
);

export const closable = makePlayroomStory(
  <UseState
    initialState={false}
    render={(open, setOpen) => (
      <>
        <Button onClick={() => setOpen(!open)}>
          Toggle snackbar visibility
        </Button>

        <Snackbar open={open} onClose={() => setOpen(false)}>
          This snackbar has a close button
        </Snackbar>
      </>
    )}
  />,
);

export const undoable = makePlayroomStory(
  <UseState
    initialState={{}}
    render={({ open = false, undid = false }, setState) => (
      <>
        <Button onClick={() => setState({ open: true })}>Perform action</Button>

        <Snackbar
          open={open}
          onClose={() => setState({})}
          action={
            <Button
              size="small"
              color="white"
              variant="contained"
              onClick={() => setState({ undid: true })}
            >
              Undo
            </Button>
          }
        >
          Action performed
        </Snackbar>

        <Snackbar open={undid} onClose={() => setState({})}>
          Action undid
        </Snackbar>
      </>
    )}
  />,
);

export const variants = makePlayroomStory(
  <UseState
    initialState={{}}
    render={(props, setProps) => (
      <>
        <FormGroup row={true}>
          <FormControlLabel
            label="Default"
            control={<Switch />}
            checked={!!props.open && !props.variant}
            onChange={(_, checked) =>
              setProps({
                ...props,
                open: checked,
                variant: undefined,
              })
            }
          />

          <FormControlLabel
            label="Success"
            control={<Switch />}
            checked={props.variant === 'success'}
            onChange={(_, checked) =>
              setProps({
                ...props,
                open: checked,
                variant: checked ? 'success' : undefined,
              })
            }
          />

          <FormControlLabel
            label="Error"
            control={<Switch />}
            checked={props.variant === 'error'}
            onChange={(_, checked) =>
              setProps({
                ...props,
                open: checked,
                variant: checked ? 'error' : undefined,
              })
            }
          />
        </FormGroup>

        <Snackbar {...props}>This is snackbar content</Snackbar>
      </>
    )}
  />,
);

export const stack = makePlayroomStory(
  <SnackbarStackConsumer>
    {({ addSnackbar, clearStack }) => {
      const getTime = () => new Date().toISOString().slice(11, 23);

      return (
        <Inline>
          <Button
            onClick={() => {
              addSnackbar(`This is default snackbar (${getTime()})`);
            }}
          >
            Add default snackbar
          </Button>
          <Button
            onClick={() => {
              addSnackbar(`This is success snackbar (${getTime()})`, {
                variant: 'success',
              });
            }}
          >
            Add success snackbar
          </Button>
          <Button
            onClick={() => {
              addSnackbar(`This is error snackbar (${getTime()})`, {
                variant: 'error',
              });
            }}
          >
            Add error snackbar
          </Button>

          <Button onClick={() => clearStack()}>Clear stack</Button>
        </Inline>
      );
    }}
  </SnackbarStackConsumer>,
);
