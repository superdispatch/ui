import { Chip } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiChip).toMatchInlineSnapshot(`
    Object {
      "deleteIcon": <div>
        <WithStyles(ForwardRef(SvgIcon))>
          <path
            clipRule="evenodd"
            d="M13.239 12L17 8.239 15.761 7 12 10.761 8.239 7 7 8.239 10.761 12 7 15.761 8.239 17 12 13.239 15.761 17 17 15.761 13.239 12z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </WithStyles(ForwardRef(SvgIcon))>
      </div>,
      "size": "small",
    }
  `);
});

it('checks component css', () => {
  expect(renderCSS(<Chip />, ['MuiChip'])).toMatchInlineSnapshot(`
  .MuiChip-root {
    border: none;
    cursor: default;
    display: inline-flex;
    outline: 0;
    padding: 0;
    font-size: 14px;
    box-sizing: border-box;
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    font-family: SF Pro Text;
    font-weight: 400;
    line-height: 20px;
    white-space: nowrap;
    border-radius: 4px;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: Color.Silver200;
  }
  
  .MuiChip-root.Mui-disabled {
    color: Color.Grey100;
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
  
  @media (min-width: 0px) and (max-width: 599.95px) {
    .MuiChip-root {
      font-size: 16px;
      line-height: 24px;
    }
  }
  
  .MuiChip-colorPrimary {
    color: Color.White;
    background-color: Color.Blue300;
  }
  
  .MuiChip-colorSecondary {
    color: Color.White;
    background-color: #f50057;
  }
  
  .MuiChip-clickable {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  
  .MuiChip-clickable:focus {
    box-shadow: 0 0 0 2px Color.Silver300;
  }
  
  .MuiChip-clickable:active,
  .MuiChip-clickable:hover {
    background-color: Color.Silver300;
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
    box-shadow: 0 0 0 2px Color.Silver300;
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
    color: Color.Grey100;
    font-size: 1em;
    margin-left: 5px;
  }
  
  .MuiChip-iconSmall {
    margin-left: 8px;
  }
  
  @media (min-width: 600px) {
    .MuiChip-iconSmall {
      margin-left: 4px;
    }
  }
  
  .MuiChip-iconColorPrimary {
    color: inherit;
  }
  
  .MuiChip-iconColorSecondary {
    color: inherit;
  }
  
  .MuiChip-label {
    overflow: hidden;
    white-space: nowrap;
    padding-left: 12px;
    padding-right: 12px;
    text-overflow: ellipsis;
  }
  
  .MuiChip-labelSmall {
    padding-left: 6px;
    padding-right: 6px;
  }
  
  @media (min-width: 600px) {
    .MuiChip-labelSmall {
      padding-left: 4px;
      padding-right: 4px;
    }
  }
  
  .MuiChip-deleteIcon {
    color: rgba(25, 35, 52, 0.26);
    cursor: pointer;
    margin: 0 5px 0 -6px;
    display: flex;
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    -webkit-tap-highlight-color: transparent;
  }
  
  .MuiChip-deleteIcon:hover {
    color: rgba(25, 35, 52, 0.4);
  }
  
  .MuiChip-deleteIcon > svg {
    color: Color.Grey200;
    font-size: 1em;
    border-radius: 50%;
  }
  
  .MuiChip-deleteIcon:active > svg,
  .MuiChip-deleteIcon:hover > svg,
  .MuiChip-deleteIcon:focus > svg {
    background-color: Color.Silver400;
  }
  
  .MuiChip-deleteIconSmall {
    padding: 4px;
    margin-left: -4px;
    margin-right: 2px;
  }
  
  @media (min-width: 600px) {
    .MuiChip-deleteIconSmall {
      margin-right: 0;
    }
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
