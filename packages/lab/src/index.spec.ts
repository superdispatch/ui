import * as api from '.';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Box": React.forwardRef(Box),
      "Column": React.forwardRef(Column),
      "Columns": React.forwardRef(Columns),
      "DescriptionItem": React.forwardRef(DescriptionItem),
      "Inline": React.forwardRef(Inline),
      "Sidebar": React.forwardRef(Sidebar),
      "SidebarDivider": React.forwardRef(SidebarDivider),
      "SidebarMenuItem": React.forwardRef(SidebarMenuItem),
      "SidebarMenuItemAction": React.forwardRef(SidebarMenuItemAction),
      "SidebarMenuItemAvatar": React.forwardRef(SidebarMenuItemAvatar),
      "SidebarSubheader": React.forwardRef(SidebarSubheader),
      "Stack": React.forwardRef(Stack),
      "TextBox": React.forwardRef(TextBox),
    }
  `);
});
