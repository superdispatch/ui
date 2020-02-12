import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Switch,
  TextField,
} from '@material-ui/core';
import { ArrowBack, Close } from '@material-ui/icons';
import {
  Button,
  DrawerActions,
  DrawerContent,
  DrawerTitle,
  GridStack,
} from '@superdispatch/ui';
import React, { useState } from 'react';

export default function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState('Drawer Title');
  const [subtitle, setSubtitle] = useState('');
  const [hasStartAction, setHasStartAction] = useState(false);
  const [hasEndAction, setHasEndAction] = useState(true);

  return (
    <Box padding={2}>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setIsOpen(true)}
      >
        Open Drawer
      </Button>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        {!!title && (
          <DrawerTitle
            title={title}
            subtitle={subtitle}
            startAction={
              hasStartAction && (
                <IconButton onClick={() => setIsOpen(false)}>
                  <ArrowBack />
                </IconButton>
              )
            }
            endAction={
              hasEndAction && (
                <IconButton onClick={() => setIsOpen(false)}>
                  <Close />
                </IconButton>
              )
            }
          />
        )}

        <DrawerContent>
          <GridStack spacing={2}>
            <TextField
              id="title"
              label="Title Text"
              value={title}
              fullWidth={true}
              onChange={event => setTitle(event.target.value)}
            />
            <TextField
              id="subtitle"
              label="Subtitle Text"
              value={subtitle}
              fullWidth={true}
              onChange={event => setSubtitle(event.target.value)}
            />

            <FormControl>
              <FormLabel>Title Options</FormLabel>

              <FormControlLabel
                checked={hasStartAction}
                label="Has Start Action"
                control={<Switch />}
                onChange={(_, checked) => setHasStartAction(checked)}
              />

              <FormControlLabel
                checked={hasEndAction}
                label="Has End Action"
                control={<Switch />}
                onChange={(_, checked) => setHasEndAction(checked)}
              />
            </FormControl>
          </GridStack>
        </DrawerContent>

        <DrawerActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setIsOpen(false)}
          >
            Submit
          </Button>
        </DrawerActions>
      </Drawer>
    </Box>
  );
}
