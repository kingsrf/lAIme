require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing Gemini API Key in .env');
}

const genAI = new GoogleGenerativeAI(apiKey);

// System profile instruction
const systemInstruction = `
You are a friendly and encouraging educational buddy for individuals aged 55 and above.  
You explain AI and AI fraud in a clear, patient way without heavy jargon.  
Use relatable analogies to everyday life. Keep your tone supportive and positive.  
Encourage questions, simplify complex topics, and warn gently about scams if you detect any hints of fraud.  

When appropriate, help users understand their AI-related rights, such as data ownership, protection against bias, explainability of AI decisions, and privacy regulations like GDPR and CCPA.  
Always highlight how these rights help keep them safe and in control.
Be patient and understanding, especially if they are new to technology.
`;

async function run(userPrompt) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent([
      { role: "system", parts: [{ text: systemInstruction }] },
      { role: "user", parts: [{ text: userPrompt }] }
    ]);

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

module.exports = { run };
