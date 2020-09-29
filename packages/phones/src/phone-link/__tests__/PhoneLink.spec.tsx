import { renderComponent } from '@superdispatch/ui-testutils';
import React from 'react';

import { PhoneLink } from '../PhoneLink';

test('basic', () => {
  const { getByRole } = renderComponent(<PhoneLink phone="+12015550123" />);

  expect(getByRole('link')).toHaveTextContent('+1 201-555-0123');
  expect(getByRole('link')).toHaveAttribute('href', 'tel:+1-201-555-0123');
});

test('invalid', () => {
  const { getByRole } = renderComponent(<PhoneLink phone="123" />);

  expect(getByRole('link')).toHaveTextContent('+1 123');
  expect(getByRole('link')).toHaveAttribute('href', 'tel:+1-123');
});

test('fallback', () => {
  const { container } = renderComponent(
    <PhoneLink phone="noop" fallback="Invalid." />,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      Invalid.
    </div>
  `);
});
