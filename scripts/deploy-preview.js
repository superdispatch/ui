'use strict';

const execa = require('execa');
const { Octokit } = require('@octokit/rest');

deployPreview().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function deployPreview() {
  const {
    GITHUB_SHA,
    GITHUB_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_PULL_REQUEST_NUMBER,
  } = process.env;
  const [owner, repo] = GITHUB_REPOSITORY.split('/');

  if (!GITHUB_PULL_REQUEST_NUMBER) {
    throw new Error('Please provide `GITHUB_PULL_REQUEST_NUMBER`.');
  }

  const github = new Octokit({ auth: GITHUB_TOKEN });
  const { data: user } = await github.users.getAuthenticated();
  const { data: comments } = await github.issues.listComments({
    repo,
    owner,
    issue_number: GITHUB_PULL_REQUEST_NUMBER,
  });

  for (const comment of comments) {
    if (
      comment.user.login === user.login &&
      comment.body.startsWith('Preview is ready!')
    ) {
      await github.issues.deleteComment({
        owner,
        repo,
        comment_id: comment.id,
      });
    }
  }

  await execa(
    'yarn',
    [
      '--silent',
      'netlify',
      'deploy',
      '--dir=docs',
      `--alias=preview-${GITHUB_PULL_REQUEST_NUMBER}`,
    ],
    {
      stdio: 'inherit',
    },
  );

  await github.issues.createComment({
    owner,
    repo,
    issue_number: GITHUB_PULL_REQUEST_NUMBER,
    body: [
      'Preview is ready!',
      `Built with commit ${GITHUB_SHA}`,
      `https://preview-${GITHUB_PULL_REQUEST_NUMBER}--ui-superdispatch.netlify.app/`,
    ].join('\n'),
  });
}
