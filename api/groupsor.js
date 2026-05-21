import { scrapeGroups } from "../lib/groupsor-client.js";

export default async function handler(req, res) {

  try {

    const keyword = req.query.search;
    const limit = Number(req.query.limit || 30);

    if (!keyword) {
      return res.json({
        creator: "WhiteShadow",
        status: false,
        error: "search parameter required"
      });
    }

    const data = await scrapeGroups(keyword, limit);

    return res.json({
      creator: "WhiteShadow",
      status: true,
      total: data.length,
      result: data
    });

  } catch (e) {

    return res.json({
      creator: "WhiteShadow",
      status: false,
      error: e.message
    });

  }

    }
