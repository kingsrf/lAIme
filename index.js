// Use require for imports
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
  // API key stored in .env file
  const apiKey = process.env.VITE_GEMINI_API_KEY; 

  if (!apiKey) {
    console.error("Error: API Key not found.");
    process.exit(1);
    return;
  }

  // Initializes the client with the API key
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userRequest = "Explain AI to a 50+ year old, non-technical person. in 3 sentences.";

    // (Commented out) For developer console testing only
    // console.log(`User: '${userRequest}'`);

    const result = await model.generateContent(userRequest);
    const response = result.response;
    const text = response.text();

    // (Commented out) Developer logs
    // console.log("\n--- Generated Text ---");
    // console.log(text);
    // console.log("----------------------");

    // frontend
    const outputElement = document.getElementById('output');
    if (outputElement) {
        // Shows the response
      outputElement.innerText = text;
    } else {
      console.error("Output element not found in HTML.");
    }

  } catch (error) {
    console.error("An error occurred during API call:", error);
  }
}

// Commented out direct run for now
// run();

module.exports = { run };
