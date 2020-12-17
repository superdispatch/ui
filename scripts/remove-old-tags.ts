'use strict';

import * as execa from 'execa';
import * as semver from 'semver';

import * as lerna from '../lerna.json';

const version = semver.parse(lerna.version);

if (!version) {
  throw new Error('Failed to parse lerna version');
}

const { stdout: rawTags } = execa.sync('git', ['tag']);
const versionRange = `>=${version.major}.${Math.max(0, version.minor - 1)}`;

const tags = rawTags
  .trim()
  .split('\n')
  .filter((tag) => !semver.valid(tag) || !semver.satisfies(tag, versionRange));

if (tags.length > 0) {
  console.log('Removing %d tags…', tags.length);
  execa.sync('git', ['tag', '-d', ...tags]);
  execa.sync('git', ['push', '--delete', 'origin', ...tags]);
} else {
  console.log('There are no outdated tags 🎉');
}
