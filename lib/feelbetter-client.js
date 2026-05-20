import axios from "axios";

const API = "https://feelbetterbot.com/";

export async function askAI(text, systemPrompt) {

  const body = {
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: text
      }
    ]
  };

  const response = await axios.post(API, body, {
    headers: {
      "content-type": "application/json",
      origin: "https://feelbetterbot.com",
      referer: "https://feelbetterbot.com/",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/127.0.0.0 Mobile Safari/537.36"
    }
  });

  return response.data;
}
