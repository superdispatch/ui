import { Radio } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiRadio).toMatchInlineSnapshot(`
    Object {
      "checkedIcon": <WithStyles(ForwardRef(SvgIcon))>
        <circle
          cx="12"
          cy="12"
          fill="currentColor"
          r="8.5"
          stroke="currentColor"
        />
        <circle
          cx="12"
          cy="12"
          fill="#fff"
          r="4"
        />
      </WithStyles(ForwardRef(SvgIcon))>,
      "color": "primary",
      "icon": <WithStyles(ForwardRef(SvgIcon))>
        <circle
          cx="12"
          cy="12"
          fill="#fff"
          r="8.5"
          stroke="currentColor"
        />
      </WithStyles(ForwardRef(SvgIcon))>,
    }
  `);
});

it('checks component css', () => {
  expect(renderCSS(<Radio />, ['MuiRadio'])).toMatchInlineSnapshot(`
.MuiRadio-root {
  color: Color.Grey100;
  margin-top: -5px;
  margin-bottom: -5px;
}

.MuiRadio-colorPrimary.Mui-checked {
  color: Color.Blue300;
}

.MuiRadio-colorPrimary.Mui-disabled {
  color: Color.Silver400;
}

.MuiRadio-colorPrimary.Mui-checked.Mui-disabled {
  color: Color.Silver500;
}

.MuiRadio-colorPrimary:hover:not(.Mui-checked) {
  color: Color.Grey100;
}

.MuiRadio-colorPrimary.Mui-checked:hover {
  background-color: rgba(0, 117, 255, 0.04);
}

@media (hover: none) {
  .MuiRadio-colorPrimary.Mui-checked:hover {
    background-color: transparent;
  }
}

.MuiRadio-colorSecondary.Mui-checked {
  color: #f50057;
}

.MuiRadio-colorSecondary.Mui-disabled {
  color: Color.Silver400;
}

.MuiRadio-colorSecondary.Mui-checked:hover {
  background-color: rgba(245, 0, 87, 0.04);
}

@media (hover: none) {
  .MuiRadio-colorSecondary.Mui-checked:hover {
    background-color: transparent;
  }
}
`);
});
