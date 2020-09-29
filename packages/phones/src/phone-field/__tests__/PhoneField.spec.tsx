import { renderComponent, renderCSS } from '@superdispatch/ui-testutils';
import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';

import { PhoneField, PhoneFieldProps } from '../PhoneField';

function UncontrolledPhoneField({ value, ...props }: PhoneFieldProps) {
  const [phone, setPhone] = useState(value);

  useEffect(() => {
    setPhone(value);
  }, [value]);

  return <PhoneField {...props} value={phone} onChange={setPhone} />;
}

test('basic', () => {
  const { getByRole } = renderComponent(<PhoneField />);

  expect(getByRole('button')).toHaveTextContent('+1');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  expect(getByRole('button')).toContainElement(
    getByRole('img', { name: 'US' }),
  );

  expect(getByRole('textbox')).toHaveAttribute('placeholder', '(201) 555-0123');
});

test('controlled', async () => {
  const { getByRole } = renderComponent(<PhoneField value="+123" />);

  expect(getByRole('textbox')).toHaveValue('23');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  await userEvent.type(getByRole('textbox'), '123123');

  expect(getByRole('textbox')).toHaveValue('23');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  userEvent.click(getByRole('button'));
  userEvent.click(getByRole('menuitem', { name: /Australia/ }));

  expect(getByRole('textbox')).toHaveValue('23');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');
});

test('interactive', async () => {
  const { getByRole } = renderComponent(<UncontrolledPhoneField />);

  expect(getByRole('textbox')).toHaveValue('');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  userEvent.click(getByRole('button'));
  userEvent.click(getByRole('menuitem', { name: /Australia/ }));

  expect(getByRole('textbox')).toHaveValue('');
  expect(getByRole('button')).toHaveAttribute('title', 'Australia: +61');

  await userEvent.type(getByRole('textbox'), '123');

  expect(getByRole('textbox')).toHaveValue('123');
  expect(getByRole('button')).toHaveAttribute('title', 'Australia: +61');
});

test('local state sync with the props', async () => {
  const { rerender, getByRole } = renderComponent(<UncontrolledPhoneField />);

  expect(getByRole('textbox')).toHaveValue('');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  await userEvent.type(getByRole('textbox'), '!5@0#6$ %2^3&4* (5)6-7_8=');

  expect(getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  // Using same phone as in the state.
  rerender(<UncontrolledPhoneField value="+15062345678" />);

  expect(getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  // Using same phone number with the different format
  rerender(<UncontrolledPhoneField value="+1 (506) 234-5678" />);

  expect(getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(getByRole('button')).toHaveAttribute('title', 'Canada: +1');
});

test('css', () => {
  expect(
    renderCSS(<PhoneField />, [
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
