import '@testing-library/jest-dom/extend-expect';

import { spyLogs } from '@superdispatch/jestutils';

process.env.TZ = 'US/Arizona';

spyLogs({ warn: 'forbid', error: 'forbid' });
