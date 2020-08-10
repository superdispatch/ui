import '@testing-library/jest-dom/extend-expect';

import { spyLogs } from '@superdispatch/jestutils';

process.env.TZ = 'US/Arizona';

spyLogs({ warn: 'forbid', error: 'forbid' });

// Mock `getComputedStyle` to workaround `accessible-name-and-description`
// selector of the `dom-accessibility-api`.
Object.defineProperty(window, 'getComputedStyle', {
  writable: false,
  enumerable: false,
  configurable: false,
  value: () => ({ getPropertyValue: () => '' }),
});
