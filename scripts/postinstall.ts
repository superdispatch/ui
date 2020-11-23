'use strict';

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

  for (const hook of await fs.readdir(hooksDir)) {
    if (path.extname(hook) === '.js') {
      const hookPath = path.join(hooksDir, hook);

      await fs.chmod(hookPath, 777);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
