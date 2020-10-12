import { Typography } from '@material-ui/core';
import { mockDate, renderComponent } from '@superdispatch/ui-testutils';
import { DateTime } from 'luxon';
import React from 'react';

import { FormattedRelativeTime } from '..';

beforeEach(() => {
  mockDate();
});

describe('FormattedRelativeTime', () => {
  const now = DateTime.fromMillis(Date.now());

  test('basic', () => {
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
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 1 yr.
        in 7 mo.
        in 1 yr.
      </div>
    `);
  });

  test('base', () => {
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
