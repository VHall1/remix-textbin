import { decrypt, encrypt } from "./encryption.server";

type MagicLinkPayload = {
  email: string;
  createdAt: string;
};

// 5 minutes (in ms)
const linkExpirationTime = 1000 * 60 * 5;
const magicLinkSearchParam = "k";

function generateMagicLink(email: string) {
  const payload: MagicLinkPayload = {
    email,
    createdAt: new Date().toISOString(),
  };
  const stringToEncrypt = JSON.stringify(payload);
  const encryptedString = encrypt(stringToEncrypt);

  // TODO: Add env variable for this
  const url = new URL("https://test.example.com");

  url.pathname = "magic";
  url.searchParams.set(magicLinkSearchParam, encryptedString);

  // TODO: Remove this after setting up emailing
  console.log("✨ Magic Link Outlet", encryptedString);
  return url.toString();
}

function getMagicLinkCode(link: string) {
  try {
    const url = new URL(link);
    return url.searchParams.get(magicLinkSearchParam) ?? "";
  } catch {
    return "";
  }
}

async function validateMagicLink(link: string) {
  const linkCode = getMagicLinkCode(link);
  let email, createdAtString;

  try {
    const decryptedString = decrypt(linkCode);
    const payload = JSON.parse(decryptedString) as MagicLinkPayload;
    email = payload.email;
    createdAtString = payload.createdAt;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Sign in link invalid. Please request a new one.");
  }

  if (typeof email !== "string") {
    console.error(`Email is not a string. Maybe wasn't set in the session?`);
    throw new Error("Sign in link invalid. Please request a new one.");
  }

  if (typeof createdAtString !== "string") {
    console.error("Link expiration is not a string.");
    throw new Error("Sign in link invalid. Please request a new one.");
  }

  const linkCreationDate = new Date(createdAtString);
  const expirationTime = linkCreationDate.getTime() + linkExpirationTime;
  if (Date.now() > expirationTime) {
    throw new Error("Magic link expired. Please request a new one.");
  }

  return email;
}

export { generateMagicLink, getMagicLinkCode, validateMagicLink };
