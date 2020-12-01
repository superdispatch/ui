import 'styled-components';

import { SuperDispatchTheme } from '@superdispatch/ui';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends SuperDispatchTheme {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  export interface StyledConfig<O extends object = {}> {
    displayName?: string;
  }
}
