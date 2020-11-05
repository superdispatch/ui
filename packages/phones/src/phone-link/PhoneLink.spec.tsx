import { renderComponent } from '@superdispatch/ui-testutils';
import { waitFor } from '@testing-library/react';
import React from 'react';

import { PhoneLink } from './PhoneLink';

test('basic', async () => {
  const wrapper = renderComponent(<PhoneLink phone="+12015550123" />);
  const link = await wrapper.findByRole('link');

  expect(link).toHaveTextContent('+1 201-555-0123');
  expect(link).toHaveAttribute('href', 'tel:+1-201-555-0123');
});

test('format', async () => {
  const wrapper = renderComponent(
    <PhoneLink phone="+12015550123" format="national" />,
  );

  const link = await wrapper.findByRole('link');

  expect(link).toHaveTextContent('(201) 555-0123');
  expect(link).toHaveAttribute('href', 'tel:+1-201-555-0123');
});

test('country', async () => {
  const wrapper = renderComponent(
    <PhoneLink phone="2015550123" country="NZ" />,
  );

  const link = await wrapper.findByRole('link');

  expect(link).toHaveTextContent('+64 20 1555 0123');
  expect(link).toHaveAttribute('href', 'tel:+64-20-1555-0123');
});

test('possible', async () => {
  const wrapper = renderComponent(<PhoneLink phone="123" />);
  const link = await wrapper.findByRole('link');

  expect(link).toHaveTextContent('+1 123');
  expect(link).toHaveAttribute('href', 'tel:+1-123');
});

test('invalid', async () => {
  const wrapper = renderComponent(<PhoneLink phone="noop" />);

  await waitFor(() => {
    expect(wrapper.queryByText('Suspended…')).toBeNull();
  });

  expect(wrapper.container).toMatchInlineSnapshot(`<div />`);
});

test('fallback', async () => {
  const wrapper = renderComponent(
    <PhoneLink phone="noop" fallback="Invalid." />,
  );

  await wrapper.findByText('Invalid.');

  expect(wrapper.container).toMatchInlineSnapshot(`
    <div>
      Invalid.
    </div>
  `);
});
