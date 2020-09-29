import { renderComponent } from '@superdispatch/ui-testutils';
import React from 'react';

import { PhoneText } from '../PhoneText';

test('basic', () => {
  const { container } = renderComponent(<PhoneText phone="+12015550123" />);

  expect(container).toMatchInlineSnapshot(`
    <div>
      +1 201-555-0123
    </div>
  `);
});

test('possible', () => {
  const { container } = renderComponent(<PhoneText phone="123" />);

  expect(container).toMatchInlineSnapshot(`
    <div>
      +1 123
    </div>
  `);
});

test('invalid', () => {
  const { container } = renderComponent(<PhoneText phone="noop" />);

  expect(container).toMatchInlineSnapshot(`
    <div/>
  `);
});

test('fallback', () => {
  const { container } = renderComponent(
    <PhoneText phone="noop" fallback="Invalid." />,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      Invalid.
    </div>
  `);
});
