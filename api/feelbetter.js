import { askAI } from "../lib/feelbetter-client.js";

export default async function handler(req, res) {
  try {
    const question = req.query.text;

    if (!question) {
      return res.json({
        creator: "WhiteShadow",
        status: false,
        error: "text parameter required"
      });
    }

    const data = await askAI(question);

    res.json({
      creator: "WhiteShadow",
      status: true,
      result: data
    });

  } catch (e) {
    res.json({
      creator: "WhiteShadow",
      status: false,
      error: e.message
    });
  }
}
