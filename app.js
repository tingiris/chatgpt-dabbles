const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const fs = require('fs');

// Get command line arguments
const args = process.argv.slice(2);
const color = args[0] || 'red';
const text = args[1] || 'Hello, world!';
const prompt = args[2] || `a cyberpunk girl close up of a gray eye with a red iris and a black pupil.`;

// Create a canvas object
const canvas = createCanvas(1280, 720);
const ctx = canvas.getContext('2d');

// Set the background color
ctx.fillStyle = color;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Request an image from the DALL-E API
axios.post('https://api.openai.com/v1/images/generations', {
  model: 'image-alpha-001',
  prompt: prompt,
  size: "1024x1024",
  response_format: 'url'
}, {
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
})
.then(async response => {
  // Load the image returned by the API
  const img = await loadImage(response.data.data[0].url);
  // Calculate the x and y positions to center the image on the canvas
  const x = (canvas.width - img.width) / 2;
  const y = (canvas.height - img.height) / 2;
  // Draw the image on the canvas
  ctx.drawImage(img, x, y);
  // Add text to the center of the image
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  // Save the canvas as a JPEG image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync('output.jpg', buffer);
})
.catch(error => {
  console.error(error);
});
