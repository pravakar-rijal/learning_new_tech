const fs = require('fs');

function extractCucumberSteps(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const steps = new Set();
    
    // This regex captures all @When, @Then, @And annotations with their text
    const regex = /@(?:When|Then|And|Test\s*\n\s*@(?:When|Then|And))\("([^"]+)"\)/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
        steps.add(match[1]);
    }
    
    return Array.from(steps);
}

// Usage
if (process.argv.length < 3) {
    console.log('Usage: node extractSteps.js <java-file>');
    process.exit(1);
}

const inputFile = process.argv[2];
const steps = extractCucumberSteps(inputFile);

console.log('Extracted Test Steps:');
console.log('====================');
steps.forEach(step => console.log(step));

// Save to file
fs.writeFileSync('test_steps.txt', steps.join('\n'));
console.log('\nSteps saved to test_steps.txt');