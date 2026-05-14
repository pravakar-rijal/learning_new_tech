const fs = require('fs');

function addQuotesToFile(inputFile) {
    try {
        // Read the file content
        const content = fs.readFileSync(inputFile, 'utf8');
        
        // Process all lines at once with regex
        // This handles Windows (\r\n) and Unix (\n) line endings
        const newContent = content
            .split(/\r?\n/)  // Split by both \r\n and \n
            .map(line => line.trim() ? `"${line.replace(/\r$/, '')}",` : '')
            .join('\n');
        
        // Write back to the file
        fs.writeFileSync(inputFile, newContent, 'utf8');
        
        console.log(`Successfully added quotes to ${inputFile}`);
    } catch (error) {
        console.error(`Error processing file: ${error.message}`);
    }
}

// Usage
if (process.argv.length < 3) {
    console.log('Usage: node add-quotes.js <input-file>');
    console.log('Example: node add-quotes.js input.txt');
} else {
    addQuotesToFile(process.argv[2]);
}