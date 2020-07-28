import { Box } from '@material-ui/core';
import {
  ComponentType,
  createElement,
  FunctionComponent,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

function getDisplayName(node: ReactNode): string {
  if (!isValidElement(node)) {
    return 'INVALID_ELEMENT';
  }

  const { type } = node as ReactElement<unknown, FunctionComponent>;
  let displayName =
    typeof type == 'string' ? type : type.displayName || type.name || 'UNKNOWN';

  for (const regExp of [
    // Remove `Styled(…)`, `ForwardRef(…)`, `WithStyles(…)`.
    /Styled\((.+)\)/,
    /WithStyles\((.+)\)/,
    /ForwardRef\((.+)\)/,
    // Remove `Mui` prefix.
    /^Mui(.+)/,
  ]) {
    const match = regExp.exec(displayName);

    if (match) {
      displayName = match[1];
    }
  }

  return displayName;
}

export interface PlayroomStoryWrapperProps {
  children: ReactElement;
}

export interface PlayroomStoryOptions {
  wrapper?: ComponentType<PlayroomStoryWrapperProps>;
}

export function makePlayroomStory(
  element: ReactElement,
  { wrapper: Wrapper = () => element }: PlayroomStoryOptions = {},
) {
  function Component() {
    return createElement(Wrapper, null, element);
  }

  const code = reactElementToJSXString(
    createElement(Box, { padding: 2 }, element),
    { showFunctions: true, displayName: getDisplayName },
  );

  Object.assign(Component, {
    story: {
      parameters: { playroom: { code, disabled: false } },
    },
  });

  return Component;
}
