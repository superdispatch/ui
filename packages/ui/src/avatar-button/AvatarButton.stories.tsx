import { Meta } from '@storybook/react';
import { UseState } from '@superdispatch/ui-docs';
import React from 'react';

import { Inline, Stack } from '..';
import { AvatarButton } from './AvatarButton';

export default {
  title: 'Inputs/Avatar Button',
  component: AvatarButton,
} as Meta;

export const basic = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton />
    <AvatarButton size="large" />
  </Inline>
);

export const disabled = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton disabled={true} />
    <AvatarButton size="large" disabled={true} />
  </Inline>
);

export const loading = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton isLoading={true} />
    <AvatarButton size="large" isLoading={true} />
  </Inline>
);

export const textBasic = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton>AB</AvatarButton>
    <AvatarButton size="large">AB</AvatarButton>
  </Inline>
);

export const textDisabled = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton disabled={true}>AB</AvatarButton>
    <AvatarButton size="large" disabled={true}>
      AB
    </AvatarButton>
  </Inline>
);

export const textLoading = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton isLoading={true}>AB</AvatarButton>
    <AvatarButton size="large" isLoading={true}>
      AB
    </AvatarButton>
  </Inline>
);

export const pictureBasic = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton src="https://source.unsplash.com/featured/256x256/?avatar" />
    <AvatarButton
      size="large"
      src="https://source.unsplash.com/featured/256x256/?avatar"
    />
  </Inline>
);

export const pictureDisabled = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton
      disabled={true}
      src="https://source.unsplash.com/featured/256x256/?avatar"
    />
    <AvatarButton
      size="large"
      disabled={true}
      src="https://source.unsplash.com/featured/256x256/?avatar"
    />
  </Inline>
);

export const pictureLoading = () => (
  <Inline space={2} verticalAlign="center">
    <AvatarButton
      isLoading={true}
      src="https://source.unsplash.com/featured/256x256/?avatar"
    />
    <AvatarButton
      size="large"
      isLoading={true}
      src="https://source.unsplash.com/featured/256x256/?avatar"
    />
  </Inline>
);

export const interactive = () => (
  <UseState initialState={false}>
    {(state, setState) => {
      const handleClick = () => {
        setState(true);
        setTimeout(() => setState(false), 500);
      };

      return (
        <Stack space={2}>
          <Inline space={2} verticalAlign="center">
            <AvatarButton disabled={state} onClick={handleClick}>
              SM
            </AvatarButton>
            <AvatarButton size="large" disabled={state} onClick={handleClick}>
              SM
            </AvatarButton>

            <AvatarButton isLoading={state} onClick={handleClick}>
              SM
            </AvatarButton>
            <AvatarButton size="large" isLoading={state} onClick={handleClick}>
              SM
            </AvatarButton>
          </Inline>

          <Inline space={2} verticalAlign="center">
            <AvatarButton
              disabled={state}
              onClick={handleClick}
              src="https://source.unsplash.com/featured/?face"
            />
            <AvatarButton
              size="large"
              disabled={state}
              onClick={handleClick}
              src="https://source.unsplash.com/featured/?face"
            />

            <AvatarButton
              isLoading={state}
              onClick={handleClick}
              src="https://source.unsplash.com/featured/?face"
            />
            <AvatarButton
              size="large"
              isLoading={state}
              onClick={handleClick}
              src="https://source.unsplash.com/featured/?face"
            />
          </Inline>
        </Stack>
      );
    }}
  </UseState>
);
