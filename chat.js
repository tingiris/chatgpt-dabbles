const axios = require('axios');
const fs = require('fs');

// Get the API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Set the API endpoint URL
const endpointUrl = 'https://api.openai.com/v1/chat/completions';

// Read the request body from a JSON file
const requestBody = JSON.parse(fs.readFileSync('chat-request.json', 'utf8'));

// Set the request headers
const requestHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
};

// Generate a timestamp to use as part of the filename
const timestamp = new Date().toISOString().replace(/:/g, '-');

// Set the filename for the response file
const responseFilename = `response-${timestamp}.json`;

// Send the POST request to the API
axios.post(endpointUrl, requestBody, { headers: requestHeaders })
  .then(response => {
    // Save the response to a file with the generated filename
    fs.writeFileSync(responseFilename, JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
