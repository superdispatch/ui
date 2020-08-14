'use strict';

const execa = require('execa');
const semver = require('semver');

const { version } = require('../lerna');
const { stdout: rawTags } = execa.sync('git', ['tag']);

const { major, minor } = semver.parse(version);

const actualVersionRange = `>=${major}.${Math.max(0, minor - 1)}`;
const tags = rawTags
  .trim()
  .split('\n')
  .filter(
    (tag) => !semver.valid(tag) || !semver.satisfies(tag, actualVersionRange),
  );

if (tags.length > 0) {
  console.log('Removing %d tags…', tags.length);
  execa.sync('git', ['tag', '-d', ...tags]);
  execa.sync('git', ['push', '--delete', 'origin', ...tags]);
} else {
  console.log('There are no outdated tags 🎉');
}
