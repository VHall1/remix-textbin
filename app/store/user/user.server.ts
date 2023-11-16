import type { User } from "@prisma/client";
import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

const userStorage = createCookieSessionStorage({
  cookie: {
    name: "__app_session",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

async function getUserSession(request: Request) {
  const session = await userStorage.getSession(request.headers.get("Cookie"));

  return {
    getUser: (): User | null => session.get("user"),
    setUser: (user: User | null) => session.set("user", user),
    commit: () => userStorage.commitSession(session),
  };
}

async function getUser(request: Request): Promise<User | null> {
  const userSession = await getUserSession(request);
  const user = userSession.getUser();
  if (user) return user;
  return null;
}

export { getUserSession, getUser };
