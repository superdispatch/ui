it('takes snapshots', () => {
  cy.visitStorybook();

  cy.takeStorySnapshot('Lab/TextBox', 'Basic', ['mobile', 'desktop']);

  cy.takeStorySnapshot('Lab/TextBox', 'Responsive Alignment', [
    'mobile',
    'desktop',
  ]);

  cy.takeStorySnapshot('Lab/TextBox', 'Colors', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/TextBox', 'Variants', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/TextBox', 'No Wrap', ['desktop']);
  cy.takeStorySnapshot('Lab/TextBox', 'Wrap Overflow', ['desktop']);
});
