it('take snapshots', () => {
  cy.visitStorybook();

  cy.takeStorySnapshot('Lab/DescriptionItem', 'Basic', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Wrap', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Fallback', [
    'mobile',
    'desktop',
  ]);
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Inset', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Complex', ['mobile', 'desktop']);
});
