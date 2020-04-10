import { InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiInputBase).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiInputLabel).toMatchInlineSnapshot(`
    Object {
      "shrink": true,
    }
  `);
  expect(props.MuiFormLabel).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiOutlinedInput).toMatchInlineSnapshot(`
    Object {
      "notched": false,
    }
  `);
  expect(props.MuiSelect).toMatchInlineSnapshot(`
    Object {
      "IconComponent": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "SelectIcon",
        "render": [Function],
      },
    }
  `);
  expect(props.MuiFormHelperText).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiTextField).toMatchInlineSnapshot(`
    Object {
      "rows": 4,
      "rowsMax": 4,
      "variant": "outlined",
    }
  `);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <>
        <TextField
          label="Text"
          helperText="Text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <div />
              </InputAdornment>
            ),
          }}
        />
        <TextField select={true}>
          <MenuItem />
        </TextField>
      </>,
      [
        'MuiFormControl',
        'MuiFormHelperText',
        'MuiFormLabel',
        'MuiInputAdornment',
        'MuiInputBase',
        'MuiInputLabel',
        'MuiOutlinedInput',
        'MuiSelect',
        'MuiTextField',
        'PrivateNotchedOutline',
      ],
    ),
  ).toMatchInlineSnapshot(`
    .MuiFormControl-root {
      border: 0;
      margin: 0;
      display: inline-flex;
      padding: 0;
      position: relative;
      min-width: 0;
      flex-direction: column;
      vertical-align: top;
    }

    .MuiFormControl-marginNormal {
      margin-top: 16px;
      margin-bottom: 8px;
    }

    .MuiFormControl-marginDense {
      margin-top: 8px;
      margin-bottom: 4px;
    }

    .MuiFormControl-fullWidth {
      width: 100%;
    }

    .MuiFormHelperText-root {
      color: Color.Grey200;
      margin: 0;
      font-size: 14px;
      margin-top: 4px;
      text-align: left;
      font-family: SF Pro Text;
      font-weight: 400;
      line-height: 20px;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiFormHelperText-root {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .MuiFormHelperText-root.Mui-disabled {
      color: Color.Grey100;
    }

    .MuiFormHelperText-root.Mui-error {
      color: Color.Red300;
    }

    .MuiFormHelperText-marginDense {
      margin-top: 4px;
    }

    .MuiFormLabel-root {
      color: Color.Grey400;
      padding: 0;
      font-size: 14px;
      font-family: SF Pro Text;
      font-weight: 400;
      line-height: 20px;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiFormLabel-root {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .MuiFormLabel-colorSecondary.Mui-focused {
      color: #f50057;
    }

    .MuiFormLabel-asterisk.Mui-error {
      color: Color.Red300;
    }

    .MuiInputAdornment-root {
      height: 0.01em;
      display: flex;
      max-height: 2em;
      align-items: center;
      white-space: nowrap;
    }

    .MuiInputAdornment-root .MuiSvgIcon-root {
      font-size: 24px;
    }

    .MuiInputAdornment-root .MuiIconButton-root {
      padding: 8px;
    }

    @media (min-width: 600px) {
      .MuiInputAdornment-root .MuiSvgIcon-root {
        font-size: 20px;
      }
    }

    .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel) {
      margin-top: 16px;
    }

    .MuiInputAdornment-positionStart {
      margin-right: 8px;
    }

    .MuiInputAdornment-positionStart .MuiIconButton-root {
      margin-left: -4px;
    }

    @media (min-width: 600px) {
      .MuiInputAdornment-positionStart .MuiIconButton-root {
        margin-left: -6px;
      }
    }

    .MuiInputAdornment-positionEnd {
      margin-left: 8px;
    }

    .MuiInputAdornment-positionEnd .MuiIconButton-root {
      margin-right: -4px;
    }

    @media (min-width: 600px) {
      .MuiInputAdornment-positionEnd .MuiIconButton-root {
        margin-right: -6px;
      }
    }

    .MuiInputAdornment-disablePointerEvents {
      pointer-events: none;
    }

    @keyframes mui-auto-fill {
    }

    @keyframes mui-auto-fill-cancel {
    }

    .MuiInputBase-root {
      color: Color.Grey500;
      cursor: text;
      display: inline-flex;
      position: relative;
      font-size: 14px;
      box-sizing: border-box;
      align-items: center;
      font-family: SF Pro Text;
      font-weight: 400;
      line-height: 20px;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiInputBase-root {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .MuiInputBase-root.Mui-disabled {
      color: Color.Grey100;
      cursor: default;
      background-color: Color.Silver100;
    }

    .MuiInputBase-multiline {
      padding: 6px 0 7px;
    }

    .MuiInputBase-multiline.MuiInputBase-marginDense {
      padding-top: 3px;
    }

    .MuiInputBase-fullWidth {
      width: 100%;
    }

    .MuiInputBase-input {
      font: inherit;
      color: currentColor;
      width: 100%;
      border: 0;
      height: 24px;
      margin: 0;
      display: block;
      padding: 6px 0 7px;
      min-width: 0;
      background: none;
      box-sizing: content-box;
      text-overflow: ellipsis;
      animation-name: mui-auto-fill-cancel;
      -webkit-tap-highlight-color: transparent;
    }

    .MuiInputBase-input::-webkit-input-placeholder {
      color: currentColor;
      opacity: 0.42;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .MuiInputBase-input::-moz-placeholder {
      color: currentColor;
      opacity: 0.42;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .MuiInputBase-input:-ms-input-placeholder {
      color: currentColor;
      opacity: 0.42;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .MuiInputBase-input::-ms-input-placeholder {
      color: currentColor;
      opacity: 0.42;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .MuiInputBase-input:focus {
      outline: 0;
    }

    .MuiInputBase-input:invalid {
      box-shadow: none;
    }

    .MuiInputBase-input::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    .MuiInputBase-input.Mui-disabled {
      opacity: 1;
    }

    .MuiInputBase-input:-webkit-autofill {
      animation-name: mui-auto-fill;
      animation-duration: 5000s;
    }

    @media (min-width: 600px) {
      .MuiInputBase-input {
        height: 20px;
      }
    }

    label[data-shrink='false']
      + .MuiInputBase-formControl
      .MuiInputBase-input::-webkit-input-placeholder {
      opacity: 0 !important;
    }

    label[data-shrink='false']
      + .MuiInputBase-formControl
      .MuiInputBase-input::-moz-placeholder {
      opacity: 0 !important;
    }

    label[data-shrink='false']
      + .MuiInputBase-formControl
      .MuiInputBase-input:-ms-input-placeholder {
      opacity: 0 !important;
    }

    label[data-shrink='false']
      + .MuiInputBase-formControl
      .MuiInputBase-input::-ms-input-placeholder {
      opacity: 0 !important;
    }

    label[data-shrink='false']
      + .MuiInputBase-formControl
      .MuiInputBase-input:focus::-webkit-input-placeholder {
      opacity: 0.42;
    }

    label[data-shrink='false']
      + .MuiInputBase-formControl
      .MuiInputBase-input:focus::-moz-placeholder {
      opacity: 0.42;
    }

    label[data-shrink='false']
      + .MuiInputBase-formControl
      .MuiInputBase-input:focus:-ms-input-placeholder {
      opacity: 0.42;
    }

    label[data-shrink='false']
      + .MuiInputBase-formControl
      .MuiInputBase-input:focus::-ms-input-placeholder {
      opacity: 0.42;
    }

    .MuiInputBase-inputMarginDense {
      padding-top: 3px;
    }

    .MuiInputBase-inputMultiline {
      height: auto;
      resize: vertical;
      padding: 0;
    }

    .MuiInputBase-inputTypeSearch {
      -moz-appearance: textfield;
      -webkit-appearance: textfield;
    }

    .MuiInputLabel-root {
      display: block;
      margin-bottom: 4px;
    }

    .MuiInputLabel-marginDense {
      transform: translate(0, 21px) scale(1);
    }

    .MuiInputLabel-animated {
      transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
        transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    }

    .MuiInputLabel-filled {
      z-index: 1;
      transform: translate(12px, 20px) scale(1);
      pointer-events: none;
    }

    .MuiInputLabel-filled.MuiInputLabel-marginDense {
      transform: translate(12px, 17px) scale(1);
    }

    .MuiInputLabel-filled.MuiInputLabel-shrink {
      transform: translate(12px, 10px) scale(0.75);
    }

    .MuiInputLabel-filled.MuiInputLabel-shrink.MuiInputLabel-marginDense {
      transform: translate(12px, 7px) scale(0.75);
    }

    .MuiInputLabel-outlined.MuiInputLabel-marginDense {
      transform: translate(14px, 12px) scale(1);
    }

    .MuiOutlinedInput-root {
      position: relative;
      border-radius: 4px;
    }

    @media (hover: none) {
      .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: rgba(0, 0, 0, 0.23);
      }
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: Color.Blue300;
      border-width: 2px;
    }

    .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
      border-color: Color.Red300;
    }

    .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
      border-color: Color.Silver400;
    }

    .MuiOutlinedInput-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #f50057;
    }

    .MuiOutlinedInput-adornedStart {
      padding-left: 8px;
    }

    .MuiOutlinedInput-adornedEnd {
      padding-right: 8px;
    }

    .MuiOutlinedInput-multiline {
      padding: 6px 8px;
    }

    .MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense {
      padding-top: 10.5px;
      padding-bottom: 10.5px;
    }

    .MuiOutlinedInput-notchedOutline {
      top: 0;
      border-color: Color.Silver500;
    }

    .MuiOutlinedInput-notchedOutline legend {
      display: none;
    }

    .MuiOutlinedInput-input {
      padding: 10px 12px;
    }

    .MuiOutlinedInput-input:-webkit-autofill {
      border-radius: inherit;
    }

    @media (min-width: 600px) {
      .MuiOutlinedInput-input {
        padding: 6px 8px;
      }
    }

    .MuiOutlinedInput-inputMarginDense {
      padding-top: 10.5px;
      padding-bottom: 10.5px;
    }

    .MuiOutlinedInput-inputMultiline {
      padding: 0;
    }

    .MuiOutlinedInput-inputAdornedStart {
      padding-left: 0;
    }

    .MuiOutlinedInput-inputAdornedEnd {
      padding-right: 0;
    }

    .MuiSelect-select {
      cursor: pointer;
      min-width: 16px;
      user-select: none;
      border-radius: 0;
      -moz-appearance: none;
      -webkit-appearance: none;
    }

    .MuiSelect-select:focus {
      border-radius: 0;
      background-color: rgba(0, 0, 0, 0.05);
    }

    .MuiSelect-select::-ms-expand {
      display: none;
    }

    .MuiSelect-select.Mui-disabled {
      cursor: default;
    }

    .MuiSelect-select[multiple] {
      height: auto;
    }

    .MuiSelect-select:not([multiple]) option,
    .MuiSelect-select:not([multiple]) optgroup {
      background-color: Color.White;
    }

    .MuiSelect-select.MuiSelect-select {
      padding-right: 24px;
    }

    .MuiSelect-filled.MuiSelect-filled {
      padding-right: 32px;
    }

    .MuiSelect-outlined {
      border-radius: 4px;
    }

    .MuiSelect-outlined.MuiSelect-outlined {
      padding-right: 32px;
    }

    .MuiSelect-selectMenu {
      height: auto;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .MuiSelect-selectMenu.MuiSelect-selectMenu {
      padding-right: 36px;
    }

    @media (min-width: 600px) {
      .MuiSelect-selectMenu.MuiSelect-selectMenu {
        right: 32px;
      }
    }

    .MuiSelect-icon {
      top: calc(50% - 0.5em);
      color: rgba(0, 0, 0, 0.54);
      right: 0;
      position: absolute;
      font-size: 24px;
      pointer-events: none;
    }

    .MuiSelect-icon.Mui-disabled {
      color: Color.Silver400;
    }

    .Mui-disabled .MuiSelect-icon {
      color: Color.Grey100;
    }

    @media (min-width: 600px) {
      .MuiSelect-icon {
        font-size: 16px;
      }
    }

    .MuiSelect-iconOpen {
      transform: rotate(180deg);
    }

    .MuiSelect-iconFilled {
      right: 7px;
    }

    .MuiSelect-iconOutlined {
      right: 12px;
    }

    @media (min-width: 600px) {
      .MuiSelect-iconOutlined {
        right: 8px;
      }
    }

    .PrivateNotchedOutline-root-73 {
      top: -5px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 0;
      position: absolute;
      border-style: solid;
      border-width: 1px;
      padding-left: 8px;
      border-radius: inherit;
      pointer-events: none;
    }

    .PrivateNotchedOutline-legend-74 {
      padding: 0;
      text-align: left;
      transition: width 150ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      line-height: 11px;
    }

    .PrivateNotchedOutline-legendLabelled-75 {
      width: auto;
      height: 11px;
      display: block;
      padding: 0;
      font-size: 0.75em;
      max-width: 0.01px;
      text-align: left;
      transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      visibility: hidden;
    }

    .PrivateNotchedOutline-legendLabelled-75 > span {
      display: inline-block;
      padding-left: 5px;
      padding-right: 5px;
    }

    .PrivateNotchedOutline-legendNotched-76 {
      max-width: 1000px;
      transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
    }
  `);
});
