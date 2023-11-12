import * as cookie from "cookie";
import type { COLOUR_MODES } from "./theme";

const cookieName = "en_colour_scheme";

export function getColourScheme(request: Request): COLOUR_MODES {
  const cookieHeader = request.headers.get("cookie");
  const parsed = cookieHeader
    ? cookie.parse(cookieHeader)[cookieName]
    : "inherit";

  // A bit unsafe, but should be alright
  if (["light", "dark", "inherit"].includes(parsed))
    return parsed as COLOUR_MODES;

  return "inherit";
}

export function setColourScheme(colourScheme: COLOUR_MODES) {
  if (colourScheme === "inherit") {
    return cookie.serialize(cookieName, "", { path: "/", maxAge: -1 });
  } else {
    return cookie.serialize(cookieName, colourScheme, { path: "/" });
  }
}
