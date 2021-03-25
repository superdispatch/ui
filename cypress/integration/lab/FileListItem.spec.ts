beforeEach(() => {
  cy.visitStorybook();
});

it('takes snapshots', () => {
  cy.takeStorySnapshot('Lab/FileListItem', 'Basic', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/FileListItem', 'Status', ['mobile', 'desktop']);
});
