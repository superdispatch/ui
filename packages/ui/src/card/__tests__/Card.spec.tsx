import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiCard).toMatchInlineSnapshot(`
    Object {
      "elevation": 0,
    }
  `);
  expect(props.MuiCardHeader).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiCardContent).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiCardActions).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <Card>
        <CardHeader />
        <CardContent />
        <CardActions />
      </Card>,
      ['MuiCard', 'MuiCardHeader', 'MuiCardContent', 'MuiCardActions'],
    ),
  ).toMatchInlineSnapshot(`
.MuiCard-root {
  overflow: hidden;
}

.MuiCardActions-root {
  display: flex;
  padding: 8px;
  align-items: center;
}

.MuiCardActions-spacing > :not(:first-child) {
  margin-left: 8px;
}

.MuiCardContent-root {
  padding: 16px;
}

.MuiCardHeader-root {
  display: flex;
  padding: 16px;
  align-items: center;
}

.MuiCardHeader-avatar {
  flex: 0 0 auto;
  margin-right: 16px;
}

.MuiCardHeader-action {
  flex: 0 0 auto;
  align-self: flex-start;
  margin-top: -8px;
  margin-right: -8px;
}

.MuiCardHeader-content {
  flex: 1 1 auto;
}
`);
});
