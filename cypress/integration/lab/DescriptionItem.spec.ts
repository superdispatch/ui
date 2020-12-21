beforeEach(() => {
  cy.visitStorybook();
});

it('selects by label', () => {
  cy.selectStory('Lab/DescriptionItem', 'Basic');

  cy.findByLabelText('payment').should('contain.text', '$1,503');
  cy.findByLabelText('Posted').should('have.text', '4 hr. ago');
  cy.findByLabelText('address').should(
    'have.text',
    '167 Zosh Rd, Dallas, PA 18612',
  );
  cy.findByLabelText('ID').should(
    'have.text',
    '202CB962AC59075B964B07152D234B70',
  );
  cy.findByLabelText('Notes').should(
    'have.text',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  );
});

it('take snapshots', () => {
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Basic', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Wrap', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Fallback', [
    'mobile',
    'desktop',
  ]);
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Inset', ['mobile', 'desktop']);
  cy.takeStorySnapshot('Lab/DescriptionItem', 'Complex', ['mobile', 'desktop']);
});
