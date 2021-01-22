import * as api from '.';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "AnchorButton": React.forwardRef(AnchorButton),
      "Box": React.forwardRef(Box),
      "Button": React.forwardRef(Button),
      "DescriptionItem": React.forwardRef(DescriptionItem),
      "Sidebar": React.forwardRef(Sidebar),
      "SidebarContainer": React.forwardRef(SidebarContainer),
      "SidebarDivider": React.forwardRef(SidebarDivider),
      "SidebarMenuItem": React.forwardRef(SidebarMenuItem),
      "SidebarMenuItemAction": React.forwardRef(SidebarMenuItemAction),
      "SidebarMenuItemAvatar": React.forwardRef(SidebarMenuItemAvatar),
      "SidebarSubheader": React.forwardRef(SidebarSubheader),
      "TextBox": React.forwardRef(TextBox),
    }
  `);
});
