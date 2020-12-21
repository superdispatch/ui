it('take snapshots', () => {
  cy.takeStorySnapshot('Lab/Box', 'Basic', ['mobile', 'tablet', 'desktop']);
});
