import { extractCSS, renderComponent } from '@superdispatch/ui-testutils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { PhoneField, PhoneFieldProps } from './PhoneField';

function UncontrolledPhoneField({ value, ...props }: PhoneFieldProps) {
  const [phone, setPhone] = useState(value);

  useEffect(() => {
    setPhone(value);
  }, [value]);

  return <PhoneField {...props} value={phone} onChange={setPhone} />;
}

test('basic', async () => {
  renderComponent(<PhoneField />);

  await screen.findByRole('textbox');

  expect(screen.getByRole('textbox')).toHaveAttribute(
    'placeholder',
    '(201) 555-0123',
  );

  expect(screen.getByRole('button')).toHaveTextContent('+1');
  expect(screen.getByRole('button')).toHaveAttribute(
    'title',
    'United States: +1',
  );

  expect(screen.getByRole('button')).toContainElement(
    screen.getByRole('img', { name: 'US' }),
  );
});

test('controlled', async () => {
  renderComponent(<PhoneField value="+123" />);

  await screen.findByRole('textbox');

  expect(screen.getByRole('textbox')).toHaveValue('23');
  expect(screen.getByRole('button')).toHaveAttribute(
    'title',
    'United States: +1',
  );

  userEvent.type(screen.getByRole('textbox'), '123123');

  expect(screen.getByRole('textbox')).toHaveValue('23');
  expect(screen.getByRole('button')).toHaveAttribute(
    'title',
    'United States: +1',
  );

  userEvent.click(screen.getByRole('button'));
  userEvent.click(screen.getByRole('menuitem', { name: /Australia/ }));

  expect(screen.getByRole('textbox')).toHaveValue('23');
  expect(screen.getByRole('button')).toHaveAttribute(
    'title',
    'United States: +1',
  );
});

test('interactive', async () => {
  renderComponent(<UncontrolledPhoneField />);

  await screen.findByRole('textbox');

  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(screen.getByRole('button')).toHaveAttribute(
    'title',
    'United States: +1',
  );

  userEvent.click(screen.getByRole('button'));
  userEvent.click(screen.getByRole('menuitem', { name: /Australia/ }));

  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(screen.getByRole('button')).toHaveAttribute('title', 'Australia: +61');

  userEvent.type(screen.getByRole('textbox'), '123');

  expect(screen.getByRole('textbox')).toHaveValue('123');
  expect(screen.getByRole('button')).toHaveAttribute('title', 'Australia: +61');
});

test('local state sync with the props', async () => {
  const view = renderComponent(<UncontrolledPhoneField />);

  await screen.findByRole('textbox');

  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(screen.getByRole('button')).toHaveAttribute(
    'title',
    'United States: +1',
  );

  userEvent.type(screen.getByRole('textbox'), '!5@0#6$ %2^3&4* (5)6-7_8=');

  expect(screen.getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(screen.getByRole('button')).toHaveAttribute(
    'title',
    'United States: +1',
  );

  // Using same phone as in the state.
  view.rerender(<UncontrolledPhoneField value="+15062345678" />);

  expect(screen.getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(screen.getByRole('button')).toHaveAttribute(
    'title',
    'United States: +1',
  );

  // Using same phone number with the different format
  view.rerender(<UncontrolledPhoneField value="+1 (506) 234-5678" />);

  expect(screen.getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(screen.getByRole('button')).toHaveAttribute('title', 'Canada: +1');
});

test('css', async () => {
  renderComponent(<PhoneField />);

  await screen.findByRole('textbox');

  expect(
    extractCSS([
      'SD-PhoneFieldFlag',
      'SD-PhoneFieldMenu',
      'SD-PhoneFieldStartAdornment',
    ]),
  ).toMatchInlineSnapshot(`
    .SD-PhoneFieldFlag-root {
      min-width: 22px;
      min-height: 16px;
    }

    .SD-PhoneFieldMenu-paper {
      max-height: 240px;
    }

    .SD-PhoneFieldStartAdornment-root {
      margin-left: -8px;
      margin-right: 0;
    }

    .SD-PhoneFieldStartAdornment-button {
      color: Color.Blue300;
      padding: 4px 4px 4px 8px;
      border-radius: 4px 0px 0px 4px;
    }

    .SD-PhoneFieldStartAdornment-button:hover,
    .SD-PhoneFieldStartAdornment-button:focus {
      background-color: Color.Blue50;
    }
  `);
});
