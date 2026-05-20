import axios from "axios";

const API = "https://feelbetterbot.com/";

export async function askAI(text) {

  const body = {
    messages: [
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
      referer: "https://feelbetterbot.com/"
    }
  });

  return response.data;
}
