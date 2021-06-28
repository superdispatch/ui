import { renderComponent } from '@superdispatch/ui-testutils';
import { screen, waitFor } from '@testing-library/react';
import { PhoneLink } from './PhoneLink';

test('basic', async () => {
  renderComponent(<PhoneLink phone="+12015550123" />);
  const link = await screen.findByRole('link');

  expect(link).toHaveTextContent('+1 201-555-0123');
  expect(link).toHaveAttribute('href', 'tel:+1-201-555-0123');
});

test('format', async () => {
  renderComponent(<PhoneLink phone="+12015550123" format="national" />);

  const link = await screen.findByRole('link');

  expect(link).toHaveTextContent('(201) 555-0123');
  expect(link).toHaveAttribute('href', 'tel:+1-201-555-0123');
});

test('country', async () => {
  renderComponent(<PhoneLink phone="2015550123" country="NZ" />);

  const link = await screen.findByRole('link');

  expect(link).toHaveTextContent('+64 20 1555 0123');
  expect(link).toHaveAttribute('href', 'tel:+64-20-1555-0123');
});

test('invalid', async () => {
  const view = renderComponent(
    <PhoneLink phone="Phone: (585) 617-1234 (Home) | (585) 489-1234 (Cell)" />,
  );

  await waitFor(() => {
    expect(screen.queryByText('Suspended…')).toBeNull();
  });

  expect(view.container).toMatchInlineSnapshot(`<div />`);
});

test('fallback', async () => {
  const view = renderComponent(
    <PhoneLink
      phone="Phone: (585) 617-1234 (Home) | (585) 489-1234 (Cell)"
      fallback="Phone: (585) 617-1234 (Home) | (585) 489-1234 (Cell)"
    />,
  );

  await waitFor(() => {
    expect(screen.queryByText('Suspended…')).toBeNull();
  });

  expect(view.container).toMatchInlineSnapshot(`
    <div>
      Phone: (585) 617-1234 (Home) | (585) 489-1234 (Cell)
    </div>
  `);
});
