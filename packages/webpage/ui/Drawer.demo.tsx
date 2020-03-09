import {
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemTextProps,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { ArrowBack, Close, Delete } from '@material-ui/icons';
import { boolean } from '@storybook/addon-knobs';
import {
  Button,
  DrawerActions,
  DrawerContent,
  DrawerList,
  DrawerTitle,
  GridStack,
  InlineGrid,
} from '@superdispatch/ui';
import { loremIpsum } from 'lorem-ipsum';
import React, { useRef, useState } from 'react';

const listItems = Array.from(
  { length: 10 },
  (): ListItemTextProps => ({
    primary: loremIpsum({ units: 'words', count: 3 }),
    secondary: loremIpsum({ units: 'words', count: 3 }),
  }),
);

export default function DrawerDemo() {
  const isInitiallyOpen = boolean('Initially Opened', true);
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const [title, setTitle] = useState('Drawer Title');
  const [subtitle, setSubtitle] = useState('');
  const [hasStartAction, setHasStartAction] = useState(false);
  const [hasEndAction, setHasEndAction] = useState(true);
  const [hasLongContent, setHasLongContent] = useState(false);
  const [listItemsLimit, setListItemsLimit] = useState(3);
  const [hasListItemAction, setHasListItemAction] = useState(true);
  const [hasPrimaryAction, setHasPrimaryAction] = useState(true);
  const [hasSecondaryAction, setHasSecondaryAction] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
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
                <IconButton edge="start">
                  <ArrowBack />
                </IconButton>
              )
            }
            endAction={
              hasEndAction && (
                <IconButton edge="end" onClick={() => setIsOpen(false)}>
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
              <FormLabel>List Items</FormLabel>

              <FormControlLabel
                checked={hasListItemAction}
                label="Has List Item Action"
                control={<Switch />}
                onChange={(_, checked) => setHasListItemAction(checked)}
              />
            </FormControl>

            <div>
              <Typography>List Items Limit</Typography>

              <Slider
                min={0}
                max={10}
                step={1}
                marks={true}
                valueLabelDisplay="auto"
                value={listItemsLimit}
                onChange={(_, value) => setListItemsLimit(value as number)}
              />
            </div>

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
          </GridStack>
        </DrawerContent>

        <DrawerList ref={ref}>
          {listItems.slice(0, listItemsLimit).map((item, idx) => (
            <ListItem key={idx} button={true} ContainerComponent="div">
              <ListItemText {...item} />

              {hasListItemAction && (
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </DrawerList>

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
    </>
  );
}
