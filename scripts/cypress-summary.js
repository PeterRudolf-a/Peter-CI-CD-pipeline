const fs = require('fs');

const resultsPath = 'cypress/results/mochawesome.json';

// Check if the results file exists
if (!fs.existsSync(resultsPath)) {
  console.log('No test results found.');
  process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

const passed = results.stats.passes;
const failed = results.stats.failures;
const skipped = results.stats.skipped;
const duration = (results.stats.duration / 1000).toFixed(2); // Convert to seconds

const summary = `
## Cypress Test Summary

| Result  | Passed ✅ | Failed ❌ | Skipped ⏭ | Duration ⏱ |
|---------|---------|---------|---------|---------|
| **Status** | ${passed} | ${failed} | ${skipped} | ${duration}s |
`;

fs.writeFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
