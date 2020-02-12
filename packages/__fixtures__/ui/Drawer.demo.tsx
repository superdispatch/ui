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
  Color,
  DrawerActions,
  DrawerContent,
  DrawerTitle,
  GridStack,
  InlineGrid,
} from '@superdispatch/ui';
import React, { useState } from 'react';

export default function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState('Drawer Title');
  const [subtitle, setSubtitle] = useState('');
  const [hasStartAction, setHasStartAction] = useState(false);
  const [hasEndAction, setHasEndAction] = useState(true);
  const [hasLongContent, setHasLongContent] = useState(false);
  const [hasPrimaryAction, setHasPrimaryAction] = useState(true);
  const [hasSecondaryAction, setHasSecondaryAction] = useState(false);

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
                <IconButton>
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

            <FormControl>
              <FormLabel>Content</FormLabel>

              <FormControlLabel
                checked={hasLongContent}
                label="Long Content"
                control={<Switch />}
                onChange={(_, checked) => setHasLongContent(checked)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Actions</FormLabel>

              <FormControlLabel
                checked={hasPrimaryAction}
                label="Has Primary Action"
                control={<Switch />}
                onChange={(_, checked) => setHasPrimaryAction(checked)}
              />

              <FormControlLabel
                checked={hasSecondaryAction}
                label="Has Secondary Action"
                control={<Switch />}
                onChange={(_, checked) => setHasSecondaryAction(checked)}
              />
            </FormControl>

            {hasLongContent &&
              Array.from({ length: 20 }, (_, idx) => (
                <div
                  key={idx}
                  style={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Color.Blue100,
                  }}
                >
                  {idx + 1}
                </div>
              ))}
          </GridStack>
        </DrawerContent>

        {(hasPrimaryAction || hasSecondaryAction) && (
          <DrawerActions>
            <InlineGrid spacing={2}>
              {hasPrimaryAction && (
                <Button color="primary" variant="contained">
                  Primary
                </Button>
              )}

              {hasSecondaryAction && (
                <Button color="primary" variant="outlined">
                  Secondary
                </Button>
              )}
            </InlineGrid>
          </DrawerActions>
        )}
      </Drawer>
    </Box>
  );
}
