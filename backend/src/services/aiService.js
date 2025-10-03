const axios = require('axios');

async function summarizeAndEvaluate(content, type) {
  const prompt = `Summarize this ${type} content: "${content}". Provide a concise summary. Rate it on a scale of 1-10 for quality, originality, and complexity (average the scores). Estimate a market price in USD (0-100) based on potential value, length, and uniqueness. Respond in strict JSON format: {"summary": "your summary", "rating": number, "price": number}`;
  
  try {
    const res = await axios.post('https://api.cerebras.ai/v1/chat/completions', {
      model: 'llama3.1-70b', // Use Llama 4 if available; fallback to 3.1 as of 2025
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.CEREBRAS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    const outputText = res.data.choices[0].message.content;
    return JSON.parse(outputText);
  } catch (err) {
    console.error(err);
    throw new Error('AI API error');
  }
}

module.exports = { summarizeAndEvaluate };