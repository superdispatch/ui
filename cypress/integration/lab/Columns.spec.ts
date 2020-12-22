it('take snapshots', () => {
  cy.visitStorybook();

  cy.takeStorySnapshot('Lab/Columns', 'Responsive Space', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Columns', 'Responsive Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Columns', 'Responsive Reverse', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Columns', 'Collapse Below Tablet', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Columns', 'Collapse Below Desktop', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Columns', 'Reverse And Collapse Below Tablet', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Columns', 'Available Widths', ['desktop']);

  cy.takeStorySnapshot('Lab/Columns', 'Responsive Widths', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Columns', 'Overflow Text', ['desktop']);
});
