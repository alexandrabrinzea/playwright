# Prerequisites:
1. JaveScript
2. Node.js
3. npm
4. Git
5. dotenv

# SetUp Steps:
1. git clone: https://github.com/alexandrabrinzea/playwright.git
2. npm install
3. npx playwright

# Running tests
1. All test are executed using "npx playwright test" command(npx playwright test <pathToFile>/<name>.spec.js)
2. Additional commands:
    npx playwright test --headed(runs in visible mode)
    npx playwright test --retries=3
    npx playwright test --workers=3
    npx playwright test --debug (opens playwright inspector)