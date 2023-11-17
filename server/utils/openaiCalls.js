const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const chatCompletion = async (messages) => {
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content
}

module.exports = {
    chatCompletion
}
