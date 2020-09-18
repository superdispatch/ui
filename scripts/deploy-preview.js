'use strict';

const execa = require('execa');
const { request } = require('@octokit/request');

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

  const { data: comments } = await request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      repo,
      owner,
      issue_number: GITHUB_PULL_REQUEST_NUMBER,
      headers: { authorization: `Token ${GITHUB_TOKEN}` },
    },
  );

  for (const comment of comments) {
    if (
      comment.body.startsWith('Preview is ready!') &&
      comment.user.login === '"github-actions[bot]"'
    ) {
      await request('DELETE /repos/:owner/:repo/issues/comments/:comment_id', {
        repo,
        owner,
        comment_id: comment.id,
        headers: { authorization: `Token ${GITHUB_TOKEN}` },
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
    { stdio: 'inherit' },
  );

  await request('POST /repos/:owner/:repo/issues/:issue_number/comments', {
    repo,
    owner,
    issue_number: GITHUB_PULL_REQUEST_NUMBER,
    headers: { authorization: `Token ${GITHUB_TOKEN}` },
    body: [
      'Preview is ready!',
      `Built with commit ${GITHUB_SHA}`,
      `https://preview-${GITHUB_PULL_REQUEST_NUMBER}--ui-superdispatch.netlify.app/`,
    ].join('\n'),
  });
}
