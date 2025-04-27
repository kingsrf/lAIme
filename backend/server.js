// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('node:path');
const { run } = require('./backend');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Correct static path

// Redirect "/" to "/chat.html"
app.get('/', (req, res) => {
  res.redirect('/chat.html');
});

// Route to process AI chat
app.post('/api/ask', async (req, res) => {
  const { userPrompt } = req.body;

  if (!userPrompt) {
    return res.status(400).json({ error: 'Missing user prompt' });
  }

  try {
    const aiResponse = await run(userPrompt);
    res.json({ aiResponse });
  } catch (error) {
    console.error('Error handling AI request:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
