import { defineConfig } from '@playwright/test';
// Inspice default config — used only when the repo ships none (sparse checkout
// keeps app source out of the IDE workspace, so customer configs usually are
// absent). Evidence capture is always on: video every run, trace on failure,
// screenshots on failure, and HAR via contextOptions (PW >= 1.44).
export default defineConfig({
  testDir: '.',
  outputDir: 'test-results',
  reporter: [['json', { outputFile: process.env.PLAYWRIGHT_JSON_OUTPUT_NAME ? process.env.PLAYWRIGHT_JSON_OUTPUT_NAME + '.json' : 'report.json' }], ['line']],
  use: {
    video: 'on',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    contextOptions: {
      recordHar: { path: 'test-results/network.har', content: 'embed' },
    },
  },
});
