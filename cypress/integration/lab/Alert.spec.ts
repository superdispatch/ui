it('takes snapshots', () => {
  cy.visitStorybook();
  cy.takeStorySnapshot('Lab/Alert', 'Basic', ['mobile', 'desktop']);
});
