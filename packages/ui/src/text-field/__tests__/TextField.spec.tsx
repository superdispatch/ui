import { MenuItem, TextField } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiInputBase).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiInputLabel).toMatchInlineSnapshot(`
    Object {
      shrink: true,
    }
  `);
  expect(props.MuiFormLabel).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiOutlinedInput).toMatchInlineSnapshot(`
    Object {
      notched: false,
    }
  `);
  expect(props.MuiSelect).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiFormHelperText).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiTextField).toMatchInlineSnapshot(`
    Object {
      rows: 4,
      rowsMax: 4,
      variant: outlined,
    }
  `);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <>
        <TextField label="Text" helperText="Text" />
        <TextField select={true}>
          <MenuItem />
        </TextField>
      </>,
      [
        'MuiInputBase',
        'MuiInputLabel',
        'MuiFormLabel',
        'MuiOutlinedInput',
        'MuiSelect',
        'MuiFormHelperText',
        'MuiTextField',
      ],
    ),
  ).toMatchInlineSnapshot(`
    .MuiInputBase-root {
      color: Color.Grey500;
      cursor: text;
      display: inline-flex;
      position: relative;
      font-size: 1rem;
      box-sizing: border-box;
      align-items: center;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      line-height: 1.1875em;
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
      height: 1.1875em;
      margin: 0;
      display: block;
      padding: 6px 0 7px;
      min-width: 0;
      background: none;
      box-sizing: content-box;
      animation-name: MuiInputBase-keyframes-auto-fill-cancel;
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
      animation-name: MuiInputBase-keyframes-auto-fill;
      animation-duration: 5000s;
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

    @keyframes MuiInputBase-keyframes-auto-fill {
    }

    @keyframes MuiInputBase-keyframes-auto-fill-cancel {
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
      color: Color.Grey400;
      display: block;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 4px;
      transform-origin: top left;
    }

    @media (min-width: 600px) {
      .MuiInputLabel-root {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .MuiInputLabel-marginDense {
      transform: translate(0, 21px) scale(1);
    }

    .MuiInputLabel-shrink {
      transform-origin: top left;
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

    .MuiInputLabel-outlined {
      z-index: 1;
    }

    .MuiInputLabel-outlined.MuiInputLabel-marginDense {
      transform: translate(14px, 12px) scale(1);
    }

    .MuiFormLabel-root {
      color: Color.Grey200;
      padding: 0;
      font-size: 16px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 24px;
    }

    @media (min-width: 600px) {
      .MuiFormLabel-root {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .MuiFormLabel-colorSecondary.Mui-focused {
      color: #f50057;
    }

    .MuiFormLabel-asterisk.Mui-error {
      color: Color.Red300;
    }

    .MuiOutlinedInput-root {
      position: relative;
      border-radius: 4px;
    }

    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border-color: Color.Grey100;
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

    .MuiOutlinedInput-root .MuiInputAdornment-root > .MuiSvgIcon-root {
      font-size: 24px;
    }

    .MuiOutlinedInput-root
      .MuiInputAdornment-root.MuiInputAdornment-positionEnd
      > .MuiIconButton-root {
      padding: 8px;
      margin-right: -4px;
    }

    .MuiOutlinedInput-root
      .MuiInputAdornment-root.MuiInputAdornment-positionStart
      > .MuiIconButton-root {
      padding: 8px;
      margin-left: -4px;
    }

    @media (min-width: 600px) {
      .MuiOutlinedInput-root .MuiInputAdornment-root > .MuiSvgIcon-root {
        font-size: 20px;
      }
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
      border-color: rgba(0, 0, 0, 0.23);
    }

    .MuiOutlinedInput-input {
      height: 24px;
      padding: 10px 16px;
      font-size: 16px;
      line-height: 24px;
    }

    .MuiOutlinedInput-input:-webkit-autofill {
      border-radius: inherit;
    }

    @media (min-width: 600px) {
      .MuiOutlinedInput-input {
        height: 20px;
        padding: 6px 8px;
        font-size: 14px;
        line-height: 20px;
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
      line-height: 24px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    @media (min-width: 600px) {
      .MuiSelect-selectMenu {
        line-height: 20px;
      }
    }

    .MuiSelect-selectMenu.MuiSelect-selectMenu {
      padding-right: 28px;
    }

    .MuiSelect-icon {
      top: calc(50% - 12px);
      color: rgba(0, 0, 0, 0.54);
      right: 0;
      position: absolute;
      font-size: 24px;
      pointer-events: none;
    }

    .Mui-disabled .MuiSelect-icon {
      color: Color.Grey100;
    }

    .MuiSelect-iconOpen {
      transform: rotate(180deg);
    }

    .MuiSelect-iconFilled {
      right: 7px;
    }

    .MuiSelect-iconOutlined {
      right: 4px;
    }

    .MuiFormHelperText-root {
      color: Color.Grey200;
      margin: 0;
      font-size: 16px;
      margin-top: 8px;
      min-height: 1em;
      text-align: left;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 24px;
    }

    .MuiFormHelperText-root.Mui-disabled {
      color: Color.Grey100;
    }

    .MuiFormHelperText-root.Mui-error {
      color: Color.Red300;
    }

    @media (min-width: 600px) {
      .MuiFormHelperText-root {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .MuiFormHelperText-marginDense {
      margin-top: 4px;
    }

    .MuiFormHelperText-contained {
      margin: 4px 0px 0px 0px;
    }
  `);
});
