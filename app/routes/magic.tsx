import type { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUserSession } from "~/store/user/user.server";
import { validateMagicLink } from "~/util/magic-link.server";
import { prisma } from "~/util/prisma.server";

export const loader: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  let email;

  try {
    email = await validateMagicLink(request.url);
  } catch (error) {
    console.error(error);
    // TODO: Handle error
  }

  if (typeof email !== "string") {
    // TODO: Handle error
    return null;
  }

  // TODO: Handle error
  const user = await prisma.user.findUniqueOrThrow({ where: { email: email } });
  const userSession = await getUserSession(request);
  userSession.setUser(user);
  return json(undefined, {
    headers: { "Set-Cookie": await userSession.commit() },
  });
};
