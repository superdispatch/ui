import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "AdaptiveToolbar": React.forwardRef(AdaptiveToolbar),
      "AvatarButton": React.forwardRef(AvatarButton),
      "Button": React.forwardRef(Button),
      "CardButton": React.forwardRef(CardButton),
      "CheckboxField": React.forwardRef(CheckboxField),
      "CheckboxGroupField": React.forwardRef(CheckboxGroupField),
      "Color": Object {
        "Black": "#000",
        "Black20": "rgba(0, 0, 0, 0.2)",
        "Black50": "rgba(0, 0, 0, 0.5)",
        "Blue100": "#A8D1FF",
        "Blue200": "#66ADFF",
        "Blue300": "#0075FF",
        "Blue400": "#0063DB",
        "Blue50": "#EBF4FF",
        "Blue500": "#0050B2",
        "Blue75": "#CCE5FF",
        "Green100": "#90EAAE",
        "Green200": "#5DDA87",
        "Green300": "#1FA84D",
        "Green400": "#1E8F46",
        "Green50": "#ECF9EF",
        "Green500": "#19803D",
        "Green75": "#C8F4D1",
        "Grey100": "#8F949E",
        "Grey200": "#6A707C",
        "Grey300": "#5B6371",
        "Grey400": "#323C4E",
        "Grey450": "#222F44",
        "Grey500": "#192334",
        "Purple100": "#CBC8EE",
        "Purple200": "#A7A1E8",
        "Purple300": "#6559CF",
        "Purple400": "#473ABB",
        "Purple50": "#EFEEFC",
        "Purple500": "#3A2F9D",
        "Purple75": "#DCDBF5",
        "Red100": "#FDC2BA",
        "Red200": "#FE988B",
        "Red300": "#EE3017",
        "Red400": "#D9210D",
        "Red50": "#FFEDEB",
        "Red500": "#C31909",
        "Red75": "#FDD9D3",
        "Silver100": "#F6F7F8",
        "Silver200": "#F3F5F8",
        "Silver300": "#E8ECF0",
        "Silver400": "#E1E5EA",
        "Silver500": "#C4CDD5",
        "Teal100": "#91E3F8",
        "Teal200": "#61D3EF",
        "Teal300": "#00A0CC",
        "Teal400": "#008DB8",
        "Teal50": "#E3F6FC",
        "Teal500": "#007DA3",
        "Teal75": "#BEEDF9",
        "Transparent": "rgba(0, 0, 0, 0)",
        "White": "#fff",
        "White08": "rgba(255, 255, 255, 0.08)",
        "White10": "rgba(255, 255, 255, 0.1)",
        "White20": "rgba(255, 255, 255, 0.2)",
        "White40": "rgba(255, 255, 255, 0.4)",
        "White50": "rgba(255, 255, 255, 0.5)",
        "Yellow100": "#FFE494",
        "Yellow200": "#FFDC6B",
        "Yellow300": "#FFCB47",
        "Yellow400": "#FFA91F",
        "Yellow50": "#FFF9E5",
        "Yellow500": "#DB7500",
        "Yellow75": "#FFF1C2",
      },
      "Column": React.forwardRef(Column),
      "Columns": React.forwardRef(Columns),
      "DescriptionList": React.forwardRef(DescriptionList),
      "DescriptionListItem": React.forwardRef(DescriptionListItem),
      "DrawerActions": React.forwardRef(DrawerActions),
      "DrawerContent": React.forwardRef(DrawerContent),
      "DrawerList": React.forwardRef(DrawerList),
      "DrawerTitle": React.forwardRef(DrawerTitle),
      "GridStack": React.forwardRef(GridStack),
      "InfoCard": React.forwardRef(InfoCard),
      "Inline": React.forwardRef(Inline),
      "InlineGrid": React.forwardRef(InlineGrid),
      "OverflowText": React.forwardRef(OverflowText),
      "RadioField": React.forwardRef(RadioField),
      "RadioGroupField": React.forwardRef(RadioGroupField),
      "ResponsiveContextProvider": [Function],
      "Snackbar": React.forwardRef(Snackbar),
      "SnackbarContent": React.forwardRef(SnackbarContent),
      "SnackbarStackConsumer": [Function],
      "SnackbarStackProvider": [Function],
      "Stack": React.forwardRef(Stack),
      "Tag": React.forwardRef(Tag),
      "ThemeProvider": [Function],
      "Tiles": React.forwardRef(Tiles),
      "VisibilityObserver": [Function],
      "isColorProp": [Function],
      "isEmptyReactNode": [Function],
      "mergeRefs": [Function],
      "parseAlignProp": [Function],
      "parseCollapsedBelow": [Function],
      "parseResponsiveProp": [Function],
      "parseSpaceProp": [Function],
      "renderChildren": [Function],
      "useCollapseBreakpoint": [Function],
      "useResponsiveContext": [Function],
      "useResponsiveProp": [Function],
      "useResponsivePropRecord": [Function],
      "useResponsiveValue": [Function],
      "useSnackbarStack": [Function],
      "useUID": [Function],
      "useVisibilityObserver": [Function],
    }
  `);
});
