// frontend.js

// Send a message when user clicks "Send" button
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Also allow sending by pressing Enter key
document.getElementById('userInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Function to send the user prompt
async function sendMessage() {
  const input = document.getElementById('userInput');
  const userPrompt = input.value.trim();

  if (!userPrompt) return;

  addMessage(userPrompt, 'user'); // Add user's message to chat window
  input.value = '';

  const thinkingMsg = addMessage('Thinking...', 'ai'); // Temporary "Thinking..." message

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userPrompt })
    });

    const data = await response.json();
    thinkingMsg.remove();

    if (data.aiResponse) {
      addMessage(data.aiResponse, 'ai');
    } else {
      addMessage('Error: No AI response.', 'ai');
    }
  } catch (error) {
    console.error('Error connecting to server:', error);
    thinkingMsg.remove();
    addMessage('Error connecting to server.', 'ai');
  }
}

// Function to add messages to the chat container
function addMessage(text, sender) {
  const chatContainer = document.getElementById('chat-container');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.innerText = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Auto scroll to bottom
  return messageDiv;
}
