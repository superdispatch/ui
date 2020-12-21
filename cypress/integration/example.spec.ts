import { ClientApi } from '@storybook/client-api';

function getStoryAPI(): Cypress.Chainable<ClientApi> {
  return cy
    .window()
    .then((win) => Cypress._.get(win, '__STORYBOOK_CLIENT_API__') as ClientApi);
}

interface StoryBackgroundOptions {
  grid?: boolean;
}

function storyBackground({ grid = false }: StoryBackgroundOptions) {
  getStoryAPI().then((api) => {
    // #F8F8F8
    api.store().updateGlobals({ backgrounds: { grid, value: '#333333' } });
  });
}

function visitStory(kind: string, name: string) {
  cy.visit('http://localhost:5000/iframe.html');

  getStoryAPI().then((api) => {
    const store = api.store();
    const story = store.getRawStory(kind, name);

    expect(story).to.have.property('id');

    store.setSelection({ viewMode: 'story', storyId: story.id });
  });
}

it('hey', () => {
  visitStory('Lab/Box', 'Basic');
  storyBackground({ grid: true });
});
