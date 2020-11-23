'use strict';

import { ExecaError } from 'execa';
import { promises as fs } from 'fs';
import path = require('path');
import execa = require('execa');

async function main() {
  if (process.env.CI) {
    return;
  }

  const cwd = process.cwd();
  const hooksDir = path.join(cwd, '.githooks');

  await execa('git', ['config', 'core.hooksPath', hooksDir], {
    stdio: 'inherit',
  });

  await execa('git', ['lfs', 'install'], {
    stdio: 'inherit',
  });

  for (const hook of await fs.readdir(hooksDir)) {
    await fs.chmod(path.join(hooksDir, hook), 0o777);
  }
}

main().catch((error: unknown) => {
  process.exitCode = 1;

  if (error instanceof Error) {
    const { exitCode } = error as Partial<ExecaError>;

    if (exitCode != null) {
      process.exitCode = exitCode;
    }
  } else {
    console.error(error);
  }
});
