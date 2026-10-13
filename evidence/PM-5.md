# PM-5: Hello World 2 QA evidence

## Requirement and source

- PM-4 explicitly requires `Hello World 2` followed by exactly one LF.
- Application PR: https://github.com/Charls-Wu/studio-qa-hello-world/pull/1
- Application branch: `agent/PM-4`
- Application commit: `2bb7ffca4d307907a31efb896eb3ee88ce540906`
- The application directory below was a detached Git worktree at that exact commit. `git rev-parse HEAD` in it returned the full application commit above. The worktree was removed after verification.
- Test baseline commit: `8acb40d043b4f89f2b0ddc16f36c1b8292fd91f8`

## Standard change

`checks/hello-world.json` advances from version 1 to version 2, links `requirementIssue` to `PM-4`, and changes `expectedStdout` from `"Hello World\n"` to `"Hello World 2\n"`. The check ID, command, expected exit code 0, and human acceptance requirement remain. `verify.mjs` is unchanged because it already compares the process exit code and full stdout exactly. The README now describes version 2.

## Verification

Working directory for both commands: `studio-qa-hello-world-tests`.

```sh
node verify.mjs /home/wuhao/work/nb3/app/studio-docs/.local/runner-work/nb-studio/PM-5/.nocobase-runner/tmp/pm5-dev-pr-1
```

With version 1, the verifier exited `1` with `AssertionError [ERR_ASSERTION]` at `verify.mjs:10:8`: actual stdout was `'Hello World 2\n'`, while expected stdout was `'Hello World\n'`. This is the PM-4 requirement change, not an application regression. The application process itself exited `0`, produced stdout hex `48656c6c6f20576f726c6420320a`, and had empty stderr.

With version 2, the same command exited `0` and printed exactly:

```json
{"checkId":"stdout-greeting","standardVersion":2,"passed":true,"stdout":"Hello World 2\n"}
```

The application process again exited `0`, produced stdout hex `48656c6c6f20576f726c6420320a`, and had empty stderr. This verification covers the deterministic Node.js script against the specified application commit; it is not human acceptance. No deployment, Preview, or GitHub checks were required for this task.
