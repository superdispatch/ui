it('takes snapshots', () => {
  cy.visitStorybook();

  cy.takeStorySnapshot('Layout/Stack', 'Responsive Space', [
    'mobile',
    'tablet',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Stack', 'Responsive Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Layout/Stack', 'Dynamic Width', ['mobile', 'desktop']);
});
