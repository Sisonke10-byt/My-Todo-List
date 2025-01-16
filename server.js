const express = require('express');
const app = express();
const port = 3001;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Define a default route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Serve the main HTML file
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
