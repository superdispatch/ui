it('take snapshots', () => {
  cy.visitStorybook();

  cy.takeStorySnapshot('Lab/Inline', 'Responsive Space', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Inline', 'Responsive Horizontal Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Inline', 'Responsive Vertical Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Inline', 'No Wrap', ['desktop']);
});
