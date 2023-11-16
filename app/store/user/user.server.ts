import type { User } from "@prisma/client";
import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

const userStorage = createCookieSessionStorage({
  cookie: {
    name: "__app_session",
    sameSite: "lax",
    path: "/",
    // Expires can also be set (although maxAge overrides it when used in combination).
    // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
    // expires: new Date(Date.now() + 60_000),
    maxAge: 34560000, // 400 days - https://chromestatus.com/feature/4887741241229312
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

async function getUserSession(request: Request) {
  const session = await userStorage.getSession(request.headers.get("Cookie"));

  return {
    getUser: () => session.get("user"),
    setUser: (user: User) => session.set("user", user),
    commit: () => userStorage.commitSession(session),
  };
}

async function getUser(request: Request): Promise<{
  user: User | null;
}> {
  // First, try to get the theme from the session.
  const userSession = await getUserSession(request);
  const user = userSession.getUser();
  if (user) {
    return {
      user,
    };
  }

  return { user: null };
}

export { getUserSession, getUser };
