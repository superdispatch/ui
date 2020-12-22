beforeEach(() => {
  cy.visitStorybook();
  cy.get('body').then(($body) => {
    $body.css({ padding: 0, margin: 0 });
  });
});

it('selects sidebar by title', () => {
  cy.selectStory('Lab/Sidebar', 'Basic');
  cy.findByLabelText('Settings').within(() => {
    cy.findByText('Settings').should('not.exist');
    cy.findAllByRole('button').should('have.length', 9);
  });
});

it('docks to the screen', () => {
  cy.viewport('macbook-11');
  cy.get('#root').invoke('css', { height: 3000 });

  cy.selectStory('Lab/Sidebar', 'Basic');
  cy.findByLabelText('Settings').should('exist');

  cy.scrollTo('bottom');
});

it('takes snapshots', () => {
  cy.takeStorySnapshot('Lab/Sidebar', 'Basic', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/Sidebar', 'Avatar', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/Sidebar', 'Avatar Checkbox', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/Sidebar', 'Complex', ['mobile', 'desktop']);
});
