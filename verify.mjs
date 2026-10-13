import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const [applicationDir, caseKey] = process.argv.slice(2);
const cases = ['greeting-stdout-v2', 'greeting-exit-zero'];
if (!applicationDir || (caseKey && !cases.includes(caseKey))) {
  throw new Error(`Usage: node verify.mjs <application-directory> [${cases.join('|')}]`);
}

const standard = JSON.parse(readFileSync(fileURLToPath(new URL('./checks/hello-world.json', import.meta.url)), 'utf8'));
const result = spawnSync(standard.command[0], standard.command.slice(1), {
  cwd: applicationDir,
  encoding: 'buffer',
});
if (result.error) throw result.error;

for (const key of caseKey ? [caseKey] : cases) {
  if (key === 'greeting-stdout-v2') {
    assert.deepEqual(result.stdout, Buffer.from(standard.expectedStdout, 'utf8'));
  } else {
    assert.equal(result.status, standard.expectedExitCode);
  }
  console.log(JSON.stringify({
    caseKey: key,
    checkId: standard.id,
    standardVersion: standard.version,
    passed: true,
    stdoutHex: result.stdout.toString('hex'),
    exitCode: result.status,
  }));
}
