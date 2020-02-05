import { Chip } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiCheckbox).toMatchInlineSnapshot(`
    Object {
      "checkedIcon": <WithStyles(ForwardRef(SvgIcon))>
        <rect
          fill="currentColor"
          height="18"
          rx="2"
          width="18"
          x="3"
          y="3"
        />
        <path
          d="M15.73 8l-.63.63c-1.43 1.43-2.94 3.05-4.37 4.5l-1.9-1.57-.7-.57L7 12.38l.7.57 2.53 2.09.63.52.58-.58c1.6-1.62 3.35-3.5 4.93-5.08l.63-.63L15.73 8z"
          fill="#fff"
        />
      </WithStyles(ForwardRef(SvgIcon))>,
      "color": "primary",
      "icon": <WithStyles(ForwardRef(SvgIcon))>
        <rect
          fill="#fff"
          height="17"
          rx="1.5"
          stroke="currentColor"
          width="17"
          x="3.5"
          y="3.5"
        />
      </WithStyles(ForwardRef(SvgIcon))>,
      "indeterminateIcon": <WithStyles(ForwardRef(SvgIcon))>
        <rect
          fill="currentIcon"
          height="18"
          rx="2"
          width="18"
          x="3"
          y="3"
        />
        <path
          d="M7 11h10v2H7v-2z"
          fill="#fff"
        />
      </WithStyles(ForwardRef(SvgIcon))>,
    }
  `);
});

it('checks component css', () => {
  expect(renderCSS(<Chip />, ['MuiChip'])).toMatchInlineSnapshot(`
    .MuiChip-root {
      color: rgba(0, 0, 0, 0.87);
      border: none;
      cursor: default;
      display: inline-flex;
      outline: 0;
      padding: 0;
      font-size: 0.8125rem;
      box-sizing: border-box;
      align-items: center;
      font-family: SF Pro Text;
      white-space: nowrap;
      border-radius: 4px;
      vertical-align: middle;
      justify-content: center;
      text-decoration: none;
      background-color: Color.Silver200;
    }

    .MuiChip-root.Mui-disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .MuiChip-root .MuiChip-avatar {
      color: #616161;
      width: 24px;
      height: 24px;
      font-size: 0.75rem;
      margin-left: 5px;
      margin-right: -6px;
    }

    .MuiChip-root .MuiChip-avatarColorPrimary {
      color: Color.White;
      background-color: rgb(0, 81, 178);
    }

    .MuiChip-root .MuiChip-avatarColorSecondary {
      color: Color.White;
      background-color: #c51162;
    }

    .MuiChip-root .MuiChip-avatarSmall {
      width: 18px;
      height: 18px;
      font-size: 0.625rem;
      margin-left: 4px;
      margin-right: -4px;
    }

    .MuiChip-root .MuiChip-deleteIcon {
      color: Color.Grey200;
      width: 1em;
      height: 1em;
      margin: 0 4px 0 0;
      font-size: 14px;
      border-radius: 50%;
      background-color: Color.Silver400;
    }

    .MuiChip-root .MuiChip-deleteIcon:hover {
      color: Color.Grey400;
    }

    .MuiChip-root:active,
    .MuiChip-root:hover {
      background-color: Color.Silver300;
    }

    .MuiChip-root:focus {
      box-shadow: 0 0 0 2px Color.Silver300;
    }

    .MuiChip-root:active .MuiChip-deleteIcon,
    .MuiChip-root:hover .MuiChip-deleteIcon {
      background-color: Color.Silver500;
    }

    @media (min-width: 600px) {
      .MuiChip-root .MuiChip-deleteIcon {
        margin: 0 6px 0 0;
        font-size: 12px;
      }
    }

    .MuiChip-sizeSmall {
      height: 24px;
    }

    .MuiChip-colorPrimary {
      color: Color.White;
      background-color: Color.Blue300;
    }

    .MuiChip-colorSecondary {
      color: Color.White;
      background-color: #f50057;
    }

    .Mui-disabled .MuiChip-label,
    .Mui-disabled .MuiChip-deleteIcon {
      color: Color.Grey100;
    }

    .MuiChip-clickable {
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .MuiChip-clickable:hover,
    .MuiChip-clickable:focus {
      background-color: rgb(206, 206, 206);
    }

    .MuiChip-clickable:active {
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }

    .MuiChip-clickableColorPrimary:hover,
    .MuiChip-clickableColorPrimary:focus {
      background-color: rgb(20, 128, 255);
    }

    .MuiChip-clickableColorSecondary:hover,
    .MuiChip-clickableColorSecondary:focus {
      background-color: rgb(245, 20, 100);
    }

    .MuiChip-deletable:focus {
      background-color: rgb(206, 206, 206);
    }

    .MuiChip-deletableColorPrimary:focus {
      background-color: rgb(51, 144, 255);
    }

    .MuiChip-deletableColorSecondary:focus {
      background-color: rgb(247, 51, 120);
    }

    .MuiChip-outlined {
      border: 1px solid rgba(0, 0, 0, 0.23);
      background-color: transparent;
    }

    .MuiChip-clickable.MuiChip-outlined:hover,
    .MuiChip-clickable.MuiChip-outlined:focus,
    .MuiChip-deletable.MuiChip-outlined:focus {
      background-color: rgba(25, 35, 52, 0.04);
    }

    .MuiChip-outlined .MuiChip-avatar {
      margin-left: 4px;
    }

    .MuiChip-outlined .MuiChip-avatarSmall {
      margin-left: 2px;
    }

    .MuiChip-outlined .MuiChip-icon {
      margin-left: 4px;
    }

    .MuiChip-outlined .MuiChip-iconSmall {
      margin-left: 2px;
    }

    .MuiChip-outlined .MuiChip-deleteIcon {
      margin-right: 5px;
    }

    .MuiChip-outlined .MuiChip-deleteIconSmall {
      margin-right: 3px;
    }

    .MuiChip-outlinedPrimary {
      color: Color.Blue300;
      border: 1px solid Color.Blue300;
    }

    .MuiChip-clickable.MuiChip-outlinedPrimary:hover,
    .MuiChip-clickable.MuiChip-outlinedPrimary:focus,
    .MuiChip-deletable.MuiChip-outlinedPrimary:focus {
      background-color: rgba(0, 117, 255, 0.04);
    }

    .MuiChip-outlinedSecondary {
      color: #f50057;
      border: 1px solid #f50057;
    }

    .MuiChip-clickable.MuiChip-outlinedSecondary:hover,
    .MuiChip-clickable.MuiChip-outlinedSecondary:focus,
    .MuiChip-deletable.MuiChip-outlinedSecondary:focus {
      background-color: rgba(245, 0, 87, 0.04);
    }

    .MuiChip-icon {
      color: #616161;
      margin-left: 5px;
      margin-right: -6px;
    }

    .MuiChip-iconSmall {
      width: 18px;
      height: 18px;
      margin-left: 4px;
      margin-right: -4px;
    }

    .MuiChip-iconColorPrimary {
      color: inherit;
    }

    .MuiChip-iconColorSecondary {
      color: inherit;
    }

    .MuiChip-label {
      overflow: hidden;
      font-size: 16px;
      white-space: nowrap;
      padding-left: 6px;
      padding-right: 6px;
      text-overflow: ellipsis;
    }

    @media (min-width: 600px) {
      .MuiChip-label {
        font-size: 14px;
        padding-left: 4px;
        padding-right: 4px;
      }
    }

    .MuiChip-labelSmall {
      padding-left: 8px;
      padding-right: 8px;
    }

    .MuiChip-deleteIcon {
      color: rgba(25, 35, 52, 0.26);
      width: 22px;
      cursor: pointer;
      height: 22px;
      margin: 0 5px 0 -6px;
      -webkit-tap-highlight-color: transparent;
    }

    .MuiChip-deleteIcon:hover {
      color: rgba(25, 35, 52, 0.4);
    }

    .MuiChip-deleteIconSmall {
      width: 16px;
      height: 16px;
      margin-left: -4px;
      margin-right: 4px;
    }

    .MuiChip-deleteIconColorPrimary {
      color: rgba(255, 255, 255, 0.7);
    }

    .MuiChip-deleteIconColorPrimary:hover,
    .MuiChip-deleteIconColorPrimary:active {
      color: Color.White;
    }

    .MuiChip-deleteIconColorSecondary {
      color: rgba(255, 255, 255, 0.7);
    }

    .MuiChip-deleteIconColorSecondary:hover,
    .MuiChip-deleteIconColorSecondary:active {
      color: Color.White;
    }

    .MuiChip-deleteIconOutlinedColorPrimary {
      color: rgba(0, 117, 255, 0.7);
    }

    .MuiChip-deleteIconOutlinedColorPrimary:hover,
    .MuiChip-deleteIconOutlinedColorPrimary:active {
      color: Color.Blue300;
    }

    .MuiChip-deleteIconOutlinedColorSecondary {
      color: rgba(245, 0, 87, 0.7);
    }

    .MuiChip-deleteIconOutlinedColorSecondary:hover,
    .MuiChip-deleteIconOutlinedColorSecondary:active {
      color: #f50057;
    }
  `);
});
