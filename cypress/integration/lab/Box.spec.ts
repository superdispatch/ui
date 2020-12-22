it('takes snapshots', () => {
  cy.visitStorybook();
  cy.takeStorySnapshot('Lab/Box', 'Basic', ['mobile', 'tablet', 'desktop']);
});
