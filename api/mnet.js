import { autoRegister } from "../lib/mnet-client.js";

export default async function handler(req, res) {

  try {

    const data = await autoRegister();

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
