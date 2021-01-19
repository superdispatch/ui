it('takes snapshots', () => {
  cy.visitStorybook();

  cy.takeStorySnapshot('Layout/Columns', 'Responsive Space', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Columns', 'Responsive Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Columns', 'Responsive Reverse', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Columns', 'Collapse Below Tablet', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Columns', 'Collapse Below Desktop', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Columns', 'Reverse And Collapse Below Tablet', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Columns', 'Available Widths', ['desktop']);

  cy.takeStorySnapshot('Layout/Columns', 'Responsive Widths', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Columns', 'Overflow Text', ['desktop']);
});
