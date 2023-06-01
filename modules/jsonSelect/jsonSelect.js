const fs = require('fs');
const path = require('path');

function jsonSelect(keyword) {
  const jsonFolderPath = path.join(__dirname, 'jsonQuoteResponses');
  const jsonFiles = fs.readdirSync(jsonFolderPath).filter(file => file.endsWith('.json'));

  // Find files with titles containing the keyword
  const matchingFiles = jsonFiles.filter(file => file.includes(keyword));

  if (matchingFiles.length === 0) {
    throw new Error('No matching JSON file found.');
  }

  // Retrieve the first matching file
  const firstMatchingFile = matchingFiles[0];
  const filePath = path.join(jsonFolderPath, firstMatchingFile);

  // Read the JSON file
  const jsonData = fs.readFileSync(filePath, 'utf8');

  // Return the JSON data as-is
  return jsonData;
}

module.exports = {
  jsonSelect
};

