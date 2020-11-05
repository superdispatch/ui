import { renderComponent } from '@superdispatch/ui-testutils';
import { waitFor } from '@testing-library/react';
import React from 'react';

import { PhoneText } from './PhoneText';

test('basic', async () => {
  const wrapper = renderComponent(<PhoneText phone="+12015550123" />);

  await wrapper.findByText(/201/);

  expect(wrapper.container).toMatchInlineSnapshot(`
    <div>
      +1 201-555-0123
    </div>
  `);
});

test('format', async () => {
  const wrapper = renderComponent(
    <PhoneText phone="+12015550123" format="national" />,
  );

  await wrapper.findByText(/201/);

  expect(wrapper.container).toMatchInlineSnapshot(`
    <div>
      (201) 555-0123
    </div>
  `);
});

test('country', async () => {
  const wrapper = renderComponent(
    <PhoneText phone="2015550123" country="NZ" />,
  );

  await wrapper.findByText(/64/);

  expect(wrapper.container).toMatchInlineSnapshot(`
    <div>
      +64 20 1555 0123
    </div>
  `);
});

test('possible', async () => {
  const wrapper = renderComponent(<PhoneText phone="201" />);

  await wrapper.findByText(/201/);

  expect(wrapper.container).toMatchInlineSnapshot(`
    <div>
      +1 201
    </div>
  `);
});

test('invalid', async () => {
  const wrapper = renderComponent(<PhoneText phone="noop" />);

  await waitFor(() => {
    expect(wrapper.queryByText('Suspended…')).toBeNull();
  });

  expect(wrapper.container).toMatchInlineSnapshot(`<div />`);
});

test('fallback', async () => {
  const wrapper = renderComponent(
    <PhoneText phone="noop" fallback="Invalid." />,
  );

  await wrapper.findByText('Invalid.');

  expect(wrapper.container).toMatchInlineSnapshot(`
    <div>
      Invalid.
    </div>
  `);
});
