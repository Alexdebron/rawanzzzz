import axios from "axios";

const BASE = "https://www.webtonative.com/api/v1";

const headers = {
  origin: "https://www.webtonative.com",
  referer: "https://www.webtonative.com/",
  "user-agent":
    "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/127.0.0.0 Mobile Safari/537.36"
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function buildApp(appName, websiteUrl) {

  const build = await axios.post(
    `${BASE}/build-app-request`,
    {
      appName,
      websiteUrl,
      emailId: "whiteshadow@example.com",
      packageId: "WEBTONATIVE_STARTER"
    },
    { headers }
  );

  const requestId = build.data.requestId;

  while (true) {

    const check = await axios.get(
      `${BASE}/check-app-status`,
      {
        params: { requestId },
        headers
      }
    );

    const data = check.data;

    if (
      data.android_status === "DONE"
    ) {

      return {
        requestId,
        apk: `${BASE}/demo/download/${requestId}/ANDROID`,
        ios: `${BASE}/demo/download/${requestId}/IOS`
      };

    }

    await sleep(5000);

  }

}
