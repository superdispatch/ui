import { Card, CardContent, Typography } from '@material-ui/core';
import { Edit, Info } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { AvatarButton, Inline, Stack } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { MouseEvent, useEffect, useState } from 'react';

const sizes = ['small', 'large'] as const;

function randomString() {
  return Math.random()
    .toString(32)
    .replace(/[^a-z]+/g, '')
    .slice(0, 2);
}

export default function AvatarButtonDemo() {
  const [name, setName] = useState(randomString);
  const [stateMap, setStateMap] = useState(() => new Map<string, string>());

  useEffect(() => {
    if (stateMap.size === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setStateMap(new Map());
    }, 1000);

    return () => clearTimeout(timeout);
  }, [stateMap]);

  return (
    <Card>
      <CardContent>
        <Stack space={2}>
          <Alert icon={<Info />} color="info" variant="filled">
            Click with pressed <code>Alt</code> (<code>Option</code>) button to
            disable avatars.
            <br />
            Click with pressed <code>Shit</code> button to set a loading state.
            <br />
            Click with pressed <code>Alt + Shift</code> button to update avatar.
          </Alert>

          {sizes.map((size) => {
            const busy = stateMap.get(size) === 'busy';
            const disabled = stateMap.get(size) === 'disabled';
            const handleClick = ({
              altKey,
              shiftKey,
            }: MouseEvent<HTMLButtonElement>) => {
              if (altKey && shiftKey) {
                setName(randomString);
              } else if (altKey) {
                setStateMap((prev) => new Map(prev).set(size, 'disabled'));
              } else if (shiftKey) {
                setStateMap((prev) => new Map(prev).set(size, 'busy'));
              }
            };

            return (
              <Stack key={size} space={1}>
                <Typography variant="h3">{startCase(size)}</Typography>

                <Stack space={1}>
                  <Inline space={1}>
                    <AvatarButton
                      size={size}
                      isLoading={busy}
                      disabled={disabled}
                      onClick={handleClick}
                    >
                      {name}
                    </AvatarButton>

                    <AvatarButton
                      size={size}
                      isLoading={busy}
                      disabled={disabled}
                      onClick={handleClick}
                      src={`https://source.unsplash.com/featured/?avatar&${name}`}
                    />
                  </Inline>

                  <Typography variant="h5">With Icon</Typography>

                  <Inline space={1}>
                    <AvatarButton
                      size={size}
                      icon={<Edit />}
                      isLoading={busy}
                      disabled={disabled}
                      onClick={handleClick}
                    >
                      {name}
                    </AvatarButton>

                    <AvatarButton
                      size={size}
                      icon={<Edit />}
                      isLoading={busy}
                      disabled={disabled}
                      onClick={handleClick}
                      src={`https://source.unsplash.com/featured/?avatar&${name}`}
                    />
                  </Inline>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
