it('takes snapshots', () => {
  cy.visitStorybook();
  cy.takeStorySnapshot('Lab/Button', 'Basic', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/Button', 'Sizes', ['mobile', 'desktop']);
});
