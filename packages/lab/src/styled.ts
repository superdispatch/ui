import { SuperDispatchTheme } from '@superdispatch/ui';
// eslint-disable-next-line no-restricted-imports
import * as styledComponents from 'styled-components';

export const styled = styledComponents.default as styledComponents.ThemedStyledInterface<SuperDispatchTheme>;
export const css = styledComponents.css as styledComponents.ThemedCssFunction<SuperDispatchTheme>;
