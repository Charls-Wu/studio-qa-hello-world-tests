# Hello World QA tests

Standard version 2 follows PM-4: `node main.mjs` must emit exactly `Hello World 2` and one LF, and exit with code 0.

Run the approved cases separately:

```sh
node verify.mjs <application-directory> greeting-stdout-v2
node verify.mjs <application-directory> greeting-exit-zero
```

Run `node verify.mjs <application-directory>` to check both cases in one process execution.
