import { Typography } from '@material-ui/core';
import { mockDate, renderComponent } from '@superdispatch/ui-testutils';
import { DateTime } from 'luxon';

import { FormattedRelativeTime } from '../formatted-relative-time/FormattedRelativeTime';

beforeEach(() => {
  mockDate();
});

describe('FormattedRelativeTime', () => {
  test('basic', () => {
    const now = DateTime.fromMillis(Date.now());
    const { container } = renderComponent(
      <>
        <FormattedRelativeTime date={now} />
        <FormattedRelativeTime date={now.startOf('minute')} />
        <FormattedRelativeTime date={now.endOf('minute')} />
        <FormattedRelativeTime date={now.startOf('hour')} />
        <FormattedRelativeTime date={now.endOf('hour')} />
        <FormattedRelativeTime date={now.startOf('day')} />
        <FormattedRelativeTime date={now.endOf('day')} />
        <FormattedRelativeTime date={now.startOf('week')} />
        <FormattedRelativeTime date={now.endOf('week')} />
        <FormattedRelativeTime date={now.startOf('month')} />
        <FormattedRelativeTime date={now.endOf('month')} />
        <FormattedRelativeTime date={now.startOf('year')} />
        <FormattedRelativeTime date={now.endOf('year')} />
      </>,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        in 0 sec.
        14 sec. ago
        in 45 sec.
        13 min. ago
        in 46 min.
        7 hr. ago
        in 16 hr.
        4 days ago
        in 2 days
        23 days ago
        in 7 days
        4 mo. ago
        in 7 mo.
      </div>
    `);
  });

  test('base', () => {
    const now = DateTime.fromMillis(Date.now());
    const { container } = renderComponent(
      <FormattedRelativeTime
        date={now.plus({ days: 10 })}
        base={now.minus({ days: 10 })}
      />,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        in 20 days
      </div>
    `);
  });

  test('invalid', () => {
    const now = DateTime.fromMillis(Date.now());
    const { container } = renderComponent(
      <>
        <FormattedRelativeTime date={NaN} />
        <FormattedRelativeTime date={now.startOf('month')} base={NaN} />
        <FormattedRelativeTime
          date={NaN}
          fallback={<Typography color="textSecondary">N/A</Typography>}
        />
      </>,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        Invalid Date
        Invalid Date
        <p
          class="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary"
        >
          N/A
        </p>
      </div>
    `);
  });
});
