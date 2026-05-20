import { buildApp } from "../lib/webtonative-client.js";

export default async function handler(req, res) {

  try {

    const appName = req.query.name;
    const website = req.query.url;

    if (!appName || !website) {
      return res.json({
        creator: "WhiteShadow",
        status: false,
        error: "name & url required"
      });
    }

    const data = await buildApp(appName, website);

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
