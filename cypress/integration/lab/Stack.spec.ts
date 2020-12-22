it('take snapshots', () => {
  cy.visitStorybook();

  cy.takeStorySnapshot('Lab/Stack', 'Responsive Space', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Stack', 'Responsive Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/Stack', 'Dynamic Width', ['mobile', 'desktop']);
});
