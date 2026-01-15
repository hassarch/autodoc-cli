"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAISummary = getAISummary;
const prompt_1 = require("./prompt");
async function getAISummary(input) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey)
        return null;
    const prompt = (0, prompt_1.buildPrompt)(input);
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3
            })
        });
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (!content)
            return null;
        return JSON.parse(content);
    }
    catch {
        return null;
    }
}
