import { IconButton } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiIconButton).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(renderCSS(<IconButton />, ['MuiIconButton'])).toMatchInlineSnapshot(`
.MuiIconButton-root {
  flex: 0 0 auto;
  color: Color.Grey100;
  padding: 12px;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  background-color: Color.Transparent;
}

.MuiIconButton-root:hover {
  background-color: Color.Transparent;
}

.MuiIconButton-root.Mui-disabled {
  color: Color.Silver500;
  background-color: transparent;
}

.MuiIconButton-root:active {
  color: Color.Grey500;
}

.MuiIconButton-root:hover {
  color: Color.Grey300;
}

.MuiIconButton-root:focus {
  background-color: Color.Silver400;
}

@media (hover: none) {
  .MuiIconButton-root:hover {
    background-color: transparent;
  }
}

.MuiIconButton-edgeStart {
  margin-left: -8px;
}

.MuiIconButton-sizeSmall.MuiIconButton-edgeStart {
  margin-left: -3px;
}

.MuiIconButton-edgeEnd {
  margin-right: -8px;
}

.MuiIconButton-sizeSmall.MuiIconButton-edgeEnd {
  margin-right: -3px;
}

.MuiIconButton-colorInherit {
  color: inherit;
}

.MuiIconButton-colorPrimary {
  color: Color.Blue300;
}

.MuiIconButton-colorPrimary:hover {
  background-color: rgba(0, 117, 255, 0.04);
}

.MuiIconButton-colorPrimary:active {
  color: Color.Blue500;
}

.MuiIconButton-colorPrimary:hover {
  color: Color.Blue300;
}

.MuiIconButton-colorPrimary:focus {
  background-color: Color.Blue50;
}

@media (hover: none) {
  .MuiIconButton-colorPrimary:hover {
    background-color: transparent;
  }
}

.MuiIconButton-colorSecondary {
  color: #f50057;
}

.MuiIconButton-colorSecondary:hover {
  background-color: rgba(245, 0, 87, 0.04);
}

@media (hover: none) {
  .MuiIconButton-colorSecondary:hover {
    background-color: transparent;
  }
}

.MuiIconButton-sizeSmall {
  padding: 3px;
  font-size: 1.125rem;
}

.MuiIconButton-label {
  width: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
}
`);
});
