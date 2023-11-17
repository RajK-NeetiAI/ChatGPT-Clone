const express = require('express');
const router = express.Router();

const { chatCompletion } = require('../utils/openaiCalls');

router.post('/', async (req, res) => {
    let body = req.body;
    let messages = body.chatlog;
    let formatedMessages = [{
        role: 'system',
        content: 'You are a helpful assistant.'
    }]
    messages.forEach(m => {
        formatedMessages.push({
            role: m.role,
            content: m.content
        })
    });
    let response = await chatCompletion(messages);
    res.json({
        response: response
    });
});

module.exports = {
    router
};
