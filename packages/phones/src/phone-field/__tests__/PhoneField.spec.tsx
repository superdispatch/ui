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
  userEvent.click(getByRole('menuitem', { name: /Canada/ }));

  expect(getByRole('textbox')).toHaveValue('23');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');
});

test('local state sync with the props', async () => {
  const { rerender, getByRole } = renderComponent(<UncontrolledPhoneField />);

  expect(getByRole('textbox')).toHaveValue('');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  await userEvent.type(getByRole('textbox'), '(506) 234-567');

  expect(getByRole('textbox')).toHaveValue('506234567');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  await userEvent.type(getByRole('textbox'), '8');

  expect(getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  // Using same phone as in the state.
  rerender(<UncontrolledPhoneField value="+15062345678" />);

  expect(getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  // Using same phone number with the different format
  rerender(<UncontrolledPhoneField value="+1 (506) 234-5678" />);

  expect(getByRole('textbox')).toHaveValue('(506) 234-5678');
  expect(getByRole('button')).toHaveAttribute('title', 'United States: +1');

  // Using different phone number
  rerender(<UncontrolledPhoneField value="+1 (506) 234-5679" />);

  expect(getByRole('textbox')).toHaveValue('(506) 234-5679');
  expect(getByRole('button')).toHaveAttribute('title', 'Canada: +1');
});

test('interactive', async () => {
  const { getByRole } = renderComponent(<UncontrolledPhoneField />);

  await userEvent.type(getByRole('textbox'), 'qwe 123 qwe 123');

  expect(getByRole('textbox')).toHaveValue('123123');

  userEvent.click(getByRole('button'));
  userEvent.click(getByRole('menuitem', { name: /Canada/ }));

  expect(getByRole('button')).toHaveAttribute('title', 'Canada: +1');
  expect(getByRole('textbox')).toHaveValue('123123');

  userEvent.click(getByRole('button'));
  userEvent.click(getByRole('menuitem', { name: /New Zealand/ }));

  expect(getByRole('button')).toHaveAttribute('title', 'New Zealand: +64');
  expect(getByRole('textbox')).toHaveValue('123123');

  await userEvent.type(getByRole('textbox'), '456');

  expect(getByRole('button')).toHaveAttribute('title', 'New Zealand: +64');
  expect(getByRole('textbox')).toHaveValue('012 312 3456');
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
