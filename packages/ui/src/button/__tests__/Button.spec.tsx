import { SheetsRegistry } from 'jss';
import React, { ComponentType } from 'react';
import { renderCSS } from '@superdispatch/testutils';

import { ThemeProvider } from '../..';

let sheetsRegistry: SheetsRegistry;
const Wrapper: ComponentType = ({ children }) => (
  <ThemeProvider sheetsRegistry={sheetsRegistry}>{children}</ThemeProvider>
);

beforeEach(() => {
  sheetsRegistry = new SheetsRegistry();
});

it('foo', () => {
  renderCSS();

  // const  = renderCSS([
  //   <Button color="primary" variant="contained">
  //     Hello
  //   </Button>,
  //   <Button color="success" variant="contained">
  //     Hello
  //   </Button>,
  //   <Button color="success" variant="contained">
  //     Hello
  //   </Button>,
  // ])

  console.log(sheetsRegistry.toString({ indent: 0 }));
});
