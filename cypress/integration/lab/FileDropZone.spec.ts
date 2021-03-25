beforeEach(() => {
  cy.visitStorybook();
});

it('takes snapshots', () => {
  cy.takeStorySnapshot('Lab/FileDropZone', 'Basic', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/FileDropZone', 'Accept', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/FileDropZone', 'Max Size', ['mobile', 'desktop']);
});
