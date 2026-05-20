import axios from "axios";
import crypto from "crypto";

function randomPassword(length = 12) {

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let pass = "";

  for (let i = 0; i < length; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  return pass;
}

function uuid() {
  return crypto.randomUUID();
}

export async function autoRegister() {

  const visitorId = uuid();

  const temp = await axios.get(
    "https://temp-mail.app/api/mail/address",
    {
      headers: {
        "visitor-id": visitorId
      }
    }
  );

  const email = temp.data.address;

  const password = randomPassword();

  return {
    email,
    password,
    visitorId
  };

}
