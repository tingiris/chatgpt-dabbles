# ChatGPT Dabbles - Part 1

This was my first attempt at using ChatGPT to build a complete app. I wanted to see if I could build a simple YouTube thumbnail generator using just ChatGPT. I wanted to see if I could build a complete app using just ChatGPT. Without writing any code myself. Could someone who doesn't know how to code do it? How challenging would it be? How hard would it be to add features?

## What do I want to learn?

1. Can I build a complete app using just ChatGPT? 
2. Without writing any code myself? 
3. Could someone who doesn't know how to code do it? 
4. How challenging would it be? 
5. How hard would it be to add features?

## Initial Steps

The following is the YouTube video that I created to document the process.

<iframe width="560" height="315" src="https://www.youtube.com/embed/JncWed3gAOA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

These are the steps or prompts I sent to ChatGPT. 

1. Create a simple node.js command line app that generates an jpeg image.
2. Do I need to install any npm packages?
3. Make the dimentions of the image the size requrired for a YouTube thumbnail.
4. I need text on the image.
5. I need to pass the color and text as command line args
6. Use the OpenAI dalle API to add an image.
7. I need pass the prompt in as a command line arg.
8. The size prop in the axios post should be "1024x1024" (in quotes) it's a string value.
9. the image should be centered as much as possible for both x and y

This is the code that ChatGPT generated for me.

```javascript
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const fs = require('fs');

// Get command line arguments
const args = process.argv.slice(2);
const color = args[0] || 'red';
const text = args[1] || 'Hello, world!';
const prompt = args[2] || `a ${color} square with the text "${text}" on it`;

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
```
In the end the code worked pretty well. I must admit I was surprised. I didn't expect it to work so well. I was expecting to run into a lot of issues. But I didn't. There was one bug in the code that I had to figure out. I suspect that would have been challenging for someone who doesn't know how to code. But I think I could have avoided it had I spent more time planning the app. 

In the next video I'll attempt to add some features to the app.
