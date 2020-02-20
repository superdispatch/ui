import { Autocomplete } from '@material-ui/lab';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  // FIXME Use proper type after after official release.
  expect((props as any).MuiAutocomplete).toMatchInlineSnapshot(`
    Object {
      "closeIcon": <WithStyles(ForwardRef(SvgIcon))>
        <path
          clipRule="evenodd"
          d="M13.239 12L17 8.239 15.761 7 12 10.761 8.239 7 7 8.239 10.761 12 7 15.761 8.239 17 12 13.239 15.761 17 17 15.761 13.239 12z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </WithStyles(ForwardRef(SvgIcon))>,
    }
  `);
});

it('checks component css', () => {
  expect(
    renderCSS(<Autocomplete options={[]} renderInput={() => <input />} />, [
      'MuiAutocomplete',
    ]),
  ).toMatchInlineSnapshot(`
.MuiAutocomplete-root:hover .MuiAutocomplete-clearIndicatorDirty,
.MuiAutocomplete-root.Mui-focused .MuiAutocomplete-clearIndicatorDirty {
  visibility: visible;
}

.MuiAutocomplete-tag {
  margin: 4px;
  max-width: calc(100% - 6px);
}

@media (min-width: 600px) {
  .MuiAutocomplete-tag {
    margin: 2px;
  }
}

.MuiAutocomplete-tagSizeSmall {
  margin: 2px;
  max-width: calc(100% - 4px);
}

.MuiAutocomplete-inputRoot {
  flex-wrap: wrap;
}

.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot,
.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot {
  padding-right: 30px;
}

.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon
  .MuiAutocomplete-inputRoot {
  padding-right: 56px;
}

.MuiAutocomplete-inputRoot .MuiAutocomplete-input {
  width: 0;
  min-width: 30px;
}

.MuiAutocomplete-inputRoot[class*='MuiInput-root'] {
  padding-bottom: 1px;
}

.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] {
  padding-left: 12px;
}

.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'][class*='MuiOutlinedInput-marginDense'] {
  padding: 6px;
}

.MuiAutocomplete-inputRoot[class*='MuiFilledInput-root'] {
  padding-top: 19px;
  padding-left: 8px;
}

.MuiAutocomplete-inputRoot[class*='MuiFilledInput-root'][class*='MuiFilledInput-marginDense'] {
  padding-bottom: 1px;
}

.MuiAutocomplete-inputRoot[class*='MuiFilledInput-root'][class*='MuiFilledInput-marginDense']
  .MuiAutocomplete-input {
  padding: 4.5px 4px;
}

.MuiAutocomplete-hasPopupIcon
  .MuiAutocomplete-inputRoot[class*='MuiFilledInput-root'],
.MuiAutocomplete-hasClearIcon
  .MuiAutocomplete-inputRoot[class*='MuiFilledInput-root'] {
  padding-right: 39px;
}

.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon
  .MuiAutocomplete-inputRoot[class*='MuiFilledInput-root'] {
  padding-right: 65px;
}

.MuiAutocomplete-inputRoot[class*='MuiFilledInput-root']
  .MuiAutocomplete-input {
  padding: 9px 4px;
}

.MuiAutocomplete-inputRoot[class*='MuiFilledInput-root']
  .MuiAutocomplete-endAdornment {
  right: 9px;
}

.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'][class*='MuiOutlinedInput-marginDense']
  .MuiAutocomplete-input {
  padding: 4.5px 4px;
}

.MuiAutocomplete-hasPopupIcon
  .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'],
.MuiAutocomplete-hasClearIcon
  .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] {
  padding-right: 39px;
}

.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon
  .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] {
  padding-right: 65px;
}

.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']
  .MuiAutocomplete-input {
  min-width: 96px;
}

.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']
  .MuiAutocomplete-input:first-child {
  padding-left: 6px;
}

.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']
  .MuiAutocomplete-endAdornment {
  right: 9px;
}

@media (min-width: 600px) {
  .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] {
    padding-left: 6px;
  }
}

.MuiAutocomplete-inputRoot[class*='MuiInput-root'][class*='MuiInput-marginDense']
  .MuiAutocomplete-input {
  padding: 4px 4px 5px;
}

.MuiAutocomplete-inputRoot[class*='MuiInput-root'][class*='MuiInput-marginDense']
  .MuiAutocomplete-input:first-child {
  padding: 3px 0 6px;
}

.MuiAutocomplete-inputRoot[class*='MuiInput-root'] .MuiAutocomplete-input {
  padding: 4px;
}

.MuiAutocomplete-inputRoot[class*='MuiInput-root']
  .MuiAutocomplete-input:first-child {
  padding: 6px 0;
}

.MuiAutocomplete-input {
  opacity: 0;
  flex-grow: 1;
  text-overflow: ellipsis;
}

.MuiAutocomplete-inputFocused {
  opacity: 1;
}

.MuiAutocomplete-endAdornment {
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  align-items: center;
}

.MuiAutocomplete-clearIndicator {
  color: rgba(0, 0, 0, 0.54);
  padding: 4px;
  visibility: hidden;
  margin-right: -2px;
}

.MuiAutocomplete-clearIndicator .MuiSvgIcon-root {
  color: Color.Grey100;
  font-size: 24px;
}

@media (min-width: 600px) {
  .MuiAutocomplete-clearIndicator .MuiSvgIcon-root {
    font-size: 16px;
  }
}

.MuiAutocomplete-popupIndicator {
  color: rgba(0, 0, 0, 0.54);
  padding: 2px;
  margin-right: -2px;
}

.MuiAutocomplete-popupIndicator .MuiSvgIcon-root {
  font-size: 24px;
}

.MuiAutocomplete-popupIndicatorOpen {
  transform: rotate(180deg);
}

.MuiAutocomplete-popper {
  z-index: 1300;
}

.MuiAutocomplete-popperDisablePortal {
  position: absolute;
}

.MuiAutocomplete-paper {
  margin: 4px 0;
  overflow: hidden;
  font-size: 14px;
  font-family: SF Pro Text;
  font-weight: 400;
  line-height: 20px;
}

@media (min-width: 0px) and (max-width: 599.95px) {
  .MuiAutocomplete-paper {
    font-size: 16px;
    line-height: 24px;
  }
}

.MuiAutocomplete-paper > ul {
  overflow: auto;
  max-height: 40vh;
}

.MuiAutocomplete-listbox {
  margin: 0;
  padding: 8px 0px;
  position: relative;
  list-style: none;
}

.MuiAutocomplete-loading {
  color: Color.Grey200;
  padding: 14px 16px;
}

.MuiAutocomplete-noOptions {
  color: Color.Grey200;
  padding: 14px 16px;
}

.MuiAutocomplete-option {
  cursor: pointer;
  display: flex;
  outline: 0;
  box-sizing: border-box;
  min-height: 48px;
  align-items: center;
  padding-top: 6px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 6px;
  justify-content: flex-start;
  -webkit-tap-highlight-color: transparent;
}

@media (min-width: 600px) {
  .MuiAutocomplete-option {
    min-height: auto;
  }
}

.MuiAutocomplete-option[aria-selected='true'] {
  background-color: Color.Silver300;
}

.MuiAutocomplete-option[data-focus='true'] {
  background-color: Color.Silver100;
}

.MuiAutocomplete-option:active {
  background-color: Color.Silver300;
}

.MuiAutocomplete-option[aria-disabled='true'] {
  opacity: 0.38;
  pointer-events: none;
}

.MuiAutocomplete-groupLabel {
  top: -8px;
  background-color: Color.White;
}

.MuiAutocomplete-groupUl {
  padding: 0;
}
`);
});
