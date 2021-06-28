import { renderComponent } from '@superdispatch/ui-testutils';
import { screen, waitFor } from '@testing-library/react';
import { PhoneText } from './PhoneText';

test('basic', async () => {
  const view = renderComponent(<PhoneText phone="+12015550123" />);

  await screen.findByText(/201/);

  expect(view.container).toMatchInlineSnapshot(`
    <div>
      +1 201-555-0123
    </div>
  `);
});

test('format', async () => {
  const view = renderComponent(
    <PhoneText phone="+12015550123" format="national" />,
  );

  await screen.findByText(/201/);

  expect(view.container).toMatchInlineSnapshot(`
    <div>
      (201) 555-0123
    </div>
  `);
});

test('country', async () => {
  const view = renderComponent(<PhoneText phone="2015550123" country="NZ" />);

  await screen.findByText(/64/);

  expect(view.container).toMatchInlineSnapshot(`
    <div>
      +64 20 1555 0123
    </div>
  `);
});

test('invalid', async () => {
  const view = renderComponent(<PhoneText phone="noop" />);

  await waitFor(() => {
    expect(screen.queryByText('Suspended…')).toBeNull();
  });

  expect(view.container).toMatchInlineSnapshot(`<div />`);
});

test('fallback', async () => {
  const view = renderComponent(<PhoneText phone="noop" fallback="Invalid." />);

  await waitFor(() => {
    expect(screen.queryByText('Suspended…')).toBeNull();
  });

  expect(view.container).toMatchInlineSnapshot(`
    <div>
      Invalid.
    </div>
  `);
});
