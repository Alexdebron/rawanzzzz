import { askAI } from "../lib/feelbetter-client.js";

export default async function handler(req, res) {

  try {

    const text = req.query.text;
    const prompt = req.query.prompt || 
    "You are an AI assistant created by WhiteShadow.";

    if (!text) {
      return res.json({
        creator: "WhiteShadow",
        status: false,
        error: "text parameter required"
      });
    }

    const result = await askAI(text, prompt);

    res.json({
      creator: "WhiteShadow",
      status: true,
      result
    });

  } catch (e) {

    res.json({
      creator: "WhiteShadow",
      status: false,
      error: e.message
    });

  }

}
