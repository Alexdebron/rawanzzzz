import axios from "axios";

const BASE = "https://www.webtonative.com/api/v1";

export async function buildApp(appName, websiteUrl) {

  const res = await axios.post(
    `${BASE}/build-app-request`,
    {
      appName,
      websiteUrl,
      emailId: "whiteshadow@example.com",
      packageId: "WEBTONATIVE_STARTER"
    }
  );

  return res.data;
}
