import { ComponentType, createElement, ReactElement } from 'react';

export interface PlayroomStoryWrapperProps {
  children: ReactElement;
}

export interface PlayroomStoryOptions {
  wrapper?: ComponentType<PlayroomStoryWrapperProps>;
}

export function makePlayroomStory(
  element: ReactElement,
  { wrapper: Wrapper = () => element }: PlayroomStoryOptions = {},
  sourceCode?: string,
) {
  const storyFn = () => createElement(Wrapper, null, element);

  Object.assign(storyFn, {
    story: {
      parameters: {
        playroom: { disabled: false, code: sourceCode },
      },
    },
  });

  return storyFn;
}
