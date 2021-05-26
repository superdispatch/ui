it('takes snapshots', () => {
  cy.visitStorybook();

  cy.takeStorySnapshot('Layout/Inline', 'Empty Elements', ['desktop']);

  cy.takeStorySnapshot('Layout/Inline', 'Responsive Space', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Inline', 'Responsive Horizontal Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Inline', 'Responsive Vertical Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Inline', 'No Wrap', ['desktop']);
});
