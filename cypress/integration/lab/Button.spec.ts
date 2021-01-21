beforeEach(() => {
  cy.visitStorybook();
});

it('takes snapshots', () => {
  cy.takeStorySnapshot('Lab/Button', 'Basic', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/Button', 'Sizes', ['mobile', 'desktop']);
});
