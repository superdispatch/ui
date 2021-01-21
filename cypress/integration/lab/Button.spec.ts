beforeEach(() => {
  cy.visitStorybook();
});

it('takes snapshots', () => {
  cy.takeStorySnapshot('Lab/Button', 'Basic', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/Button', 'Sizes', ['mobile', 'desktop']);
});

it('check focus states', () => {
  cy.selectStory('Lab/Button', 'Basic');

  for (const name of [
    'Primary',
    'Default',
    'Neutral',
    'Text',
    'Critical',
    'Inverted',
  ]) {
    cy.findByRole('button', { name }).focus();
    cy.wait(300);
    cy.takeSnapshots(`Lab/Button: Basic - Focus ${name}`);
  }
});
