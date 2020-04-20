import '@testing-library/jest-dom/extend-expect';

import { spyLogs } from '@superdispatch/jestutils';

spyLogs({ warn: 'forbid', error: 'forbid' });
