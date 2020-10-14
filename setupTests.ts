import '@testing-library/jest-dom';

import { spyLogs } from '@superdispatch/jestutils';
import { resetMockDate } from '@superdispatch/ui-testutils';

if (process.env.CI) {
  spyLogs({ warn: 'forbid', error: 'forbid' });
}

afterEach(resetMockDate);

// Mock `getComputedStyle` to workaround `accessible-name-and-description`
// selector of the `dom-accessibility-api`.
Object.defineProperty(window, 'getComputedStyle', {
  writable: false,
  enumerable: false,
  configurable: false,
  value: () => ({ getPropertyValue: () => '' }),
});
